import { fetchJson } from "./fetchJson";
import type { CurrencyData } from "../types";




// ЗАДАНИЕ 1: курсы валют.
//
// Источник A: https://open.er-api.com/v6/latest/USD
//   ответ: { base_code: "USD", rates: { ... } }
//
// ЗАДАНИЕ 7 (Promise.any): сделайте getCurrencyFromAny(),
// которая запрашивает ДВА источника одновременно и берёт самый быстрый.
// Источник B: https://api.frankfurter.app/latest?from=USD
//   ответ: { base: "USD", rates: { ... } }
// Оба ответа нужно привести к одному типу CurrencyData.

export async function getCurrencyA(signal?: AbortSignal): Promise<CurrencyData> {
  const data = await fetchJson<{ base_code: string; rates: Record<string, number> }>(
    "https://open.er-api.com/v6/latest/USD",
    signal
  );
      return {
      base: data.base_code,
      rates: data.rates,
    }
}

export async function getCurrencyB(signal?: AbortSignal): Promise<CurrencyData> {
  const data = await fetchJson<{ base: string; rates: Record<string, number> }>(
    "https://api.frankfurter.app/latest?from=USD",
    signal
  );
  return {
      base: data.base,
      rates: data.rates,
    }
}

export async function getCurrencyFromAny(signal?: AbortSignal): Promise<CurrencyData> {
  return Promise.any([getCurrencyA(signal), getCurrencyB(signal)]);
}
