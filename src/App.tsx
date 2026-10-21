import { useCallback } from "react";
import { getWeather } from "./api/weather";
import { getCurrencyFromAny } from "./api/currency";
import { getRandomQuote } from "./api/quote";

import { useAsync } from "./hooks/useAsync";
import { WeatherCard } from "./components/WeatherCard";
import { CurrencyCard } from "./components/CurrencyCard";
import { QuoteCard } from "./components/QuoteCard";

export default function App() {
  // 1. Создаем стабильные функции-загрузчики
  const fetchWeather = useCallback(() => getWeather(), []);
  const fetchCurrency = useCallback(() => getCurrencyFromAny(), []);
  const fetchQuote = useCallback(() => getRandomQuote(), []);

  // 2. Запускаем хук useAsync для каждого источника
  const weather = useAsync(fetchWeather);
  const currency = useAsync(fetchCurrency);
  const quote = useAsync(fetchQuote); // <--- Важно: хук для цитаты!

  // 3. Обработчик "Обновить всё" через Promise.allSettled
  const handleRefreshAll = async () => {
    await Promise.allSettled([
      Promise.resolve(weather.reload()),
      Promise.resolve(currency.reload()),
      Promise.resolve(quote.reload()), // <--- Важно: вызываем reload для цитаты!
    ]);
  };

  return (
    <main style={{ fontFamily: "sans-serif", padding: 24 }}>
      <h1>Promise Lab</h1>
      
      {/* Кнопка Обновить всё */}
      <button 
        onClick={handleRefreshAll}
        style={{ 
          marginBottom: 20, 
          padding: "10px 20px", 
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: 4,
          fontWeight: "bold"
        }}
      >
        Обновить всё
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
          onReload={quote.reload} // <--- Передаем пропсы в карточку цитаты
        />
      </div>
    </main>
  );
} 