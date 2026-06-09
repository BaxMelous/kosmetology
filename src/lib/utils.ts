import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Форматирует строку в формат телефона +7(XXX)XXX-XX-XX.
 * - При пустом вводе возвращает пустую строку
 * - При фокусе на пустом поле — автоподстановка +7
 * - Обрезает до 11 цифр (1 код страны + 10 номера)
 * - Буквы и спецсимволы игнорируются
 */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");

  // Пусто — разрешаем стереть всё
  if (digits.length === 0) return "";

  // Всегда начинаем с 7 (российский код)
  let d = digits;
  if (d.startsWith("8") && d.length <= 11) {
    d = "7" + d.slice(1);
  } else if (!d.startsWith("7")) {
    d = "7" + d;
  }

  // Максимум 11 цифр
  d = d.slice(0, 11);

  // Форматирование: +7(XXX)XXX-XX-XX
  let result = "+7";
  if (d.length > 1) result += "(" + d.slice(1, 4);
  if (d.length >= 4) result += ")" + d.slice(4, 7);
  if (d.length >= 7) result += "-" + d.slice(7, 9);
  if (d.length >= 9) result += "-" + d.slice(9, 11);

  return result;
}

/** Проверяет, что номер телефона заполнен полностью (11 цифр) */
export function isPhoneComplete(value: string): boolean {
  return value.replace(/\D/g, "").length >= 11;
}
