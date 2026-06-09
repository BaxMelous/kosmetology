"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { priorityQueue, type PriorityLevel } from "@/lib/priority-loader";

type PriorityContextValue = {
  /** Зарегистрировать задачу. Возвращает true когда следует грузить. */
  schedule: (id: string, priority: PriorityLevel, execute: () => Promise<void>, label?: string) => void;
  /** True если очередь пуста (вся страница загружена) */
  isIdle: boolean;
  /** Количество оставшихся задач */
  pending: number;
};

const PriorityContext = createContext<PriorityContextValue>({
  schedule: () => {},
  isIdle: true,
  pending: 0,
});

export function usePriority() {
  return useContext(PriorityContext);
}

export function PriorityLoaderProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isIdle, setIsIdle] = useState(true);
  const [pending, setPending] = useState(0);
  const pageRef = useRef(pathname);

  // Сообщаем очереди о смене страницы
  useEffect(() => {
    if (pageRef.current !== pathname) {
      pageRef.current = pathname;
      priorityQueue.setCurrentPage(pathname);
      updateState();
    }
  }, [pathname]);

  // Подписываемся на изменения очереди
  useEffect(() => {
    const unsub = priorityQueue.subscribe(updateState);
    updateState();
    return unsub;
  }, []);

  function updateState() {
    setIsIdle(priorityQueue.isIdle);
    setPending(priorityQueue.pendingCount);
  }

  const schedule = useCallback(
    (id: string, priority: PriorityLevel, execute: () => Promise<void>, label?: string) => {
      priorityQueue.enqueue({
        id,
        priority,
        page: pageRef.current,
        execute,
        label,
      });
      updateState();
    },
    []
  );

  return (
    <PriorityContext.Provider value={{ schedule, isIdle, pending }}>
      {children}
    </PriorityContext.Provider>
  );
}
