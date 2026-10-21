// Пример-образец: promise-обёртка над setTimeout.
// Этот файл уже готов — смотрите, как создаётся Promise вручную.

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
