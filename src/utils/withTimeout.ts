// ЗАДАНИЕ 5: withTimeout
//
// Если promise не завершился за ms миллисекунд — реджектим с Error("Timeout").
// Идея: Promise.race([promise, таймерный промис, который реджектится]).
//
// Бонус: очищайте таймер (clearTimeout), когда promise завершился первым.

export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  // TODO
  return promise;
}
