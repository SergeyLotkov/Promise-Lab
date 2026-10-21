  import { Card } from "./Card";
  import type { WeatherData } from "../types";

interface WeatherCardProps { 
  status: "idle" | "loading" | "success" | "error"; 
  data: WeatherData | null;
  error: Error | null;
  onReload: () => void;
}

export function WeatherCard({ status, data, error, onReload }: WeatherCardProps) {
  return (
    <Card title="Погода" status={status} error={error} onReload={onReload}>
      {data && (
        <p> 
            Temperature: {data.temperature}°C, Wind speed: {data.windspeed} км/ч
        </p>
      )}    
    </Card>
  );
}   