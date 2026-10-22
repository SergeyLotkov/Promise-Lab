// ЗАДАНИЕ 8: limitConcurrency
//

// Принимает массив "задач" (функций, возвращающих Promise) и лимит.
// Запускает не более `limit` задач одновременно. Возвращает Promise
// с результатами В ТОМ ЖЕ ПОРЯДКЕ, что и tasks.
//
// Важно: tasks — это функции, а не готовые промисы! Промис начинает
// выполняться в момент создания, поэтому передавать нужно () => fetch(...).
//
// Подсказка: заведите "воркеры" (limit штук), каждый берёт следующую задачу
// по общему счётчику, пока задачи не кончатся. Результаты Promise.all(воркеры).

export async function limitConcurrency<T>(
  tasks: Array<() => Promise<T>>,
  limit: number
): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let next = 0;
  
  async function worker(): Promise<void> {
    while (next < tasks.length) {
      const i = next++;
      results[i] = await tasks[i]();
    }
  }
  const workers = Array.from({ length: limit }, () => worker());

  await Promise.all(workers);
  return results;
}