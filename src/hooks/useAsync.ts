import { useCallback, useEffect, useRef, useState } from "react";
import type { AsyncState } from "../types";

// ЗАДАНИЕ 3: useAsync<T>
export function useAsync<T>(fn: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({
    status: "idle",
    data: null,
    error: null,
  });
  const [tick, setTick] = useState(0);

  const reload = useCallback(() => setTick((t) => t + 1), []);

  // Сохраняем свежую функцию в ref, чтобы не пересоздавать эффект
  const fnRef = useRef(fn);
  useEffect(() => {
    fnRef.current = fn;
  });

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, status: "loading", error: null }));

    async function run() {
      try {
        // Вызываем функцию из рефа!
        const data = await fnRef.current();
        if (!cancelled) {
          setState({ status: "success", data, error: null });
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          setState({ 
            status: "error", 
            data: null, 
            error: err instanceof Error ? err : new Error(String(err))
          });
        }
      }   
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [tick]); // Зависимость только от tick!

  return { ...state, reload };
}