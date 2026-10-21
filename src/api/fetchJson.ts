export async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json() as Promise<T>;
}


// ЗАДАНИЕ 2: fetchJson<T>
// fetch() НЕ реджектится на 404/500 — только на сетевую ошибку.
// Напишите обёртку, которая:
//   1. вызывает fetch(url, { signal })
//   2. если !res.ok — бросает Error с кодом статуса
//   3. возвращает res.json() с типом T
//
// Подсказка: функция должна быть async или возвращать цепочку .then().

