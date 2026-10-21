import { Card } from "./Card";
import type { QuoteData } from "../types";

interface QuoteCardProps {
  status: "idle" | "loading" | "success" | "error";
  data: QuoteData | null;
  error: string | null;
  onReload: () => void;
}

export function QuoteCard({ status, data, error, onReload }: QuoteCardProps) {
  return (
    <Card title="Цитата" status={status} error={error} onRetry={onReload}>
      {data && (
        <blockquote style={{ margin: 0 }}>
          <p>«{data.quote}»</p>
          <footer>— {data.author}</footer>
        </blockquote>
      )}
    </Card>
  );
}