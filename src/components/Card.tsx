import type { ReactNode } from "react";
import type { AsyncStatus } from "../types";

interface CardProps {
  title: string;
  status: AsyncStatus;
  error: Error | null;
  onRetry: () => void;
  children: ReactNode;
}

// Общая оболочка карточки: показывает загрузку / ошибку / содержимое.
export function Card({ title, status, error, onRetry, children }: CardProps) {
  return (
    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 16,
        minWidth: 240,
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {status === "idle" && <p>Ожидание…</p>}
      {status === "loading" && <p>Загрузка…</p>}
      {status === "error" && (
        <div>
          <p style={{ color: "crimson" }}>Ошибка: {error?.message}</p>
          <button onClick={onRetry}>Повторить</button>
        </div>
      )}
      {status === "success" && children}
    </section>
  );
}
