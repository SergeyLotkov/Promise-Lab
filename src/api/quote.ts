import { fetchJson } from "./fetchJson";
import type { QuoteData } from "../types";

// ЗАДАНИЕ 1: случайная цитата.
//   https://dummyjson.com/quotes/random        -> { id, quote, author }
//   https://dummyjson.com/quotes/{id}          -> цитата по номеру (1..1454)

export function getRandomQuote(signal?: AbortSignal): Promise<QuoteData> {
  return fetchJson<QuoteData>("https://dummyjson.com/quotes/random", signal);
}

export function getQuoteById(id: number, signal?: AbortSignal): Promise<QuoteData> {
  return fetchJson<QuoteData>(`https://dummyjson.com/quotes/${id}`, signal);
}