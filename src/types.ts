// Типы ответов API. Задание 1: проверьте реальные ответы API и поправьте типы.

export interface WeatherData {
  temperature: number; // °C
  windspeed: number; // км/ч
}

export interface CurrencyData {
  base: string;
  rates: Record<string, number>;
}

export interface QuoteData {
  id: number;
  quote: string;
  author: string;
}

export type AsyncStatus = "idle" | "loading" | "success" | "error";

export interface AsyncState<T> {
  status: AsyncStatus;
  data: T | null;
  error: Error | null;
}
