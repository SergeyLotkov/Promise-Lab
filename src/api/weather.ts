import { fetchJson } from "./fetchJson";

// ЗАДАНИЕ 1: типизированная функция, возвращающая Promise<WeatherData>.
//
interface RawResponse {
  current_weather: {
    temperature: number;
    windspeed: number;
  };
}

export async function getWeather(signal?: AbortSignal): Promise<WeatherData> {
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=16.05&longitude=108.2&current_weather=true';
  const data = await fetchJson<RawResponse>(url, signal);

  return {
      temperature: data.current_weather.temperature,
      windspeed: data.current_weather.windspeed,
  };
}
// Open-Meteo (без ключа):
//   https://api.open-meteo.com/v1/forecast?latitude=16.05&longitude=108.2&current_weather=true
// Ответ содержит current_weather: { temperature, <windspeed> </windspeed>, ... }
//
// TODO: опишите тип сырого ответа, вызовите fetchJson<RawResponse>,
// преобразуйте результат в WeatherData через .then().

