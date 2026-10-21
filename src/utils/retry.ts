import { sleep } from "./sleep";

// ЗАДАНИЕ 6: retry
//
// Вызывает fn() до `attempts` раз. Если попытка упала — ждёт delayMs (sleep)
// и пробует снова. Если все попытки провалились — бросает последнюю ошибку.
//
// Реализуйте сначала циклом с async/await... нет, сначала — через .then/.catch
// и рекурсию (так лучше понять цепочки), потом перепишите через async/await.
//
// Бонус: экспоненциальная задержка (delayMs * 2 ** attemptNumber).

export function retry<T>(
  fn: () => Promise<T>,
  attempts: number,
  delayMs: number
): Promise<T> {
  // TODO
  void sleep;
  void attempts;
  void delayMs;
  return fn();
}
