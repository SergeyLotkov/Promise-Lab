import { getWeather } from "../api/weather";
import { useAsync } from "../hooks/useAsync";
import { Card } from "./Card";

interface WeatherCardProps { 
  status: "idle" | "loading" | "success" | "error"; 
  data: { temperature: number; windspeed: number, city: string } | null;
  error: string | null;
  onReload: () => void;
}

export function WeatherCard({ status, data, error, onReload }: WeatherCardProps) {
  return (
    <Card title="Погода" status={status} error={error} onReload={onReload}>
      {data && (
        <p> 
            City: Danang, Temperature: {data.temperature}°C, Wind speed: {data.windspeed} км/ч
        </p>
      )}    
    </Card>
  );
}