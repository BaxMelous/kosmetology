/**
 * PriorityQueue — центральный планировщик загрузки контента.
 *
 * Принцип работы:
 * 1. Задачи выполняются СТРОГО по одной (не грузим всё одновременно)
 * 2. Текущая страница ВСЕГДА имеет приоритет над чужими
 * 3. При смене страницы — задачи новой страницы получают boost
 * 4. Viewport-visible элементы получают приоритет над невидимыми
 */

export type PriorityLevel = 0 | 1 | 2 | 3 | 4;

export type LoadTask = {
  id: string;
  /** 0 = самый важный, 4 = фоновый */
  priority: PriorityLevel;
  /** К какой странице относится задача */
  page: string;
  /** Функция, которую нужно выполнить */
  execute: () => Promise<void>;
  /** Описание для отладки */
  label?: string;
};

type Listener = () => void;

class PriorityQueue {
  private queue: LoadTask[] = [];
  private running = false;
  private currentPage = "";
  private completed = new Set<string>();
  private listeners = new Set<Listener>();

  /** Установить текущую страницу (вызывается при навигации) */
  setCurrentPage(page: string) {
    if (this.currentPage === page) return;

    this.currentPage = page;

    // Очищаем выполненные задачи — контент должен перерендериться
    this.completed.clear();
    // Удаляем задачи для старой страницы из очереди
    this.queue = this.queue.filter((t) => t.page === page);

    this.sort();
    this.notify();
    this.processNext();
  }

  /** Добавить задачу в очередь */
  enqueue(task: LoadTask) {
    // Пропускаем уже выполненные
    if (this.completed.has(task.id)) return;
    // Пропускаем дубликаты
    if (this.queue.some((t) => t.id === task.id)) return;

    this.queue.push(task);
    this.sort();
    this.notify();
    this.processNext();
  }

  /** Повысить приоритет задачи (viewport boost) */
  boost(id: string) {
    const task = this.queue.find((t) => t.id === id);
    if (task && task.priority > 0) {
      task.priority = (task.priority - 1) as PriorityLevel;
      this.sort();
      this.processNext();
    }
  }

  /** Отписаться от изменений */
  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => { this.listeners.delete(fn); };
  }

  /** Сбросить всё (при полной навигации) */
  reset() {
    this.queue = [];
    this.completed = new Set();
    this.running = false;
    this.notify();
  }

  get pendingCount() {
    return this.queue.length;
  }

  get isIdle() {
    return this.queue.length === 0 && !this.running;
  }

  // ── приватные ──

  private sort() {
    this.queue.sort((a, b) => {
      const aCurrent = a.page === this.currentPage ? 0 : 1;
      const bCurrent = b.page === this.currentPage ? 0 : 1;
      if (aCurrent !== bCurrent) return aCurrent - bCurrent;
      return a.priority - b.priority;
    });
  }

  private async processNext() {
    if (this.running || this.queue.length === 0) return;
    this.running = true;

    const task = this.queue.shift()!;
    try {
      await task.execute();
      this.completed.add(task.id);
    } catch {
      // Ошибка — не блокируем очередь
    } finally {
      this.running = false;
      this.notify();
      this.processNext();
    }
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }
}

/** Глобальный синглтон */
export const priorityQueue = new PriorityQueue();
