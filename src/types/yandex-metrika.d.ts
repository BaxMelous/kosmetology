export {};

declare global {
  interface Window {
    ym?: (id: number | string, action: string, ...args: unknown[]) => void;
    /** Флаг, что счётчик уже инициализирован (защита от повторной загрузки tag.js) */
    __ymInit?: boolean;
    /** Массив отложенных хитов (накопленных до инициализации) */
    __ymPendingHits?: string[];
  }
}
