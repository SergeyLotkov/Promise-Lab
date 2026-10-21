import { Card } from "./Card";
import type { CurrencyData } from "../types";

interface CurrencyCardProps {
  status: "idle" | "loading" | "success" | "error";
  data: CurrencyData | null;
  error: string | null;
  onReload: () => void;
}

export function CurrencyCard({ status, data, error, onReload }: CurrencyCardProps) {
  return (
    <Card title="Курс валют" status={status} error={error} onRetry={onReload}>
      {data && (
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {["EUR", "VND", "RUB", "THB"].map((code) => (
            <li key={code}>
              1 {data.base} = {data.rates[code] ?? "—"} {code}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}