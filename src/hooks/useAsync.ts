import { useState, useEffect, useCallback, useRef } from "react";
import type { AsyncStatus } from "../types";

export function useAsync<T>(asyncFn: (signal?: AbortSignal) => Promise<T>) {
  const [status, setStatus] = useState<AsyncStatus>("idle");
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const asyncFnRef = useRef(asyncFn);
  asyncFnRef.current = asyncFn;

  // Главная функция выполнения запроса
  const execute = useCallback(async () => {
    setStatus("loading");
    setError(null);
    const controller = new AbortController();

    try {
      const result = await asyncFnRef.current(controller.signal);
      setData(result);
      setStatus("success");
      return result; // Возвращаем результат для Promise.allSettled
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err.message || "Произошла ошибка");
        setStatus("error");
      }
      throw err; // Пробрасываем ошибку, чтобы Promise.allSettled зафиксировал "rejected"
    }
  }, []);

  // Автоматический запуск при монтировании или ручном reload()
  useEffect(() => {
    execute();
  }, [tick, execute]);

  const reload = useCallback(() => {
    setTick((t) => t + 1);
  }, []);

  return { status, data, error, reload, execute };
}