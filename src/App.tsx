import { useState, useCallback } from "react";
import { getWeather } from "./api/weather";
import { getCurrencyFromAny } from "./api/currency";
import { getRandomQuote } from "./api/quote";

import { useAsync } from "./hooks/useAsync";
import { WeatherCard } from "./components/WeatherCard";
import { CurrencyCard } from "./components/CurrencyCard";
import { QuoteCard } from "./components/QuoteCard";

export default function App() {
  // 1. Создаем стабильные функции-загрузчики (используем lowercase для переменных)
  const weather = useAsync(useCallback(() => getWeather(), []));
  const currency = useAsync(useCallback(() => getCurrencyFromAny(), []));
  const quote = useAsync(useCallback(() => getRandomQuote(), []));

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshAll = async () => {
    setIsRefreshing(true);

    const results = await Promise.allSettled([
      weather.execute(),
      currency.execute(),
      quote.execute()
    ]);
    
    results.forEach((result, index) => {
      const names = ["Weather", "Currency", "Quote"];
      if (result.status === "fulfilled") {
        console.log(`${names[index]} refreshed successfully:`, result.value);
      } else {
        console.error(`${names[index]} refresh failed:`, result.reason);
      }
    });
    
    setIsRefreshing(false);
  };

  return (
    <main style={{ fontFamily: "sans-serif", padding: 24 }}>
      <h1>Promise Lab</h1>
      
      {/* Кнопка Обновить всё */}
      <button 
        onClick={handleRefreshAll}
        disabled={isRefreshing}
        style={{ 
          marginBottom: 20, 
          padding: "10px 20px", 
          cursor: isRefreshing ? "not-allowed" : "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: 4,
          fontWeight: "bold",
          opacity: isRefreshing ? 0.7 : 1
        }}
      >
        {isRefreshing ? "Обновление..." : "Обновить всё"}
      </button>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <WeatherCard
          status={weather.status}
          data={weather.data}
          error={weather.error}
          onReload={weather.reload}
        />
        
        <CurrencyCard
          status={currency.status}
          data={currency.data}
          error={currency.error}
          onReload={currency.reload}
        />

        <QuoteCard
          status={quote.status}
          data={quote.data}
          error={quote.error}
          onReload={quote.reload}
        />
      </div>
    </main>
  );
}