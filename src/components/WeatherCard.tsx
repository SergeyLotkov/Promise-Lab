  import { Card } from "./Card";

interface WeatherCardProps { 
  status: "idle" | "loading" | "success" | "error"; 
  data: { temperature: number; windSpeed: number} | null;
  error: Error | null;
  onReload: () => void;
}

export function WeatherCard({ status, data, error, onReload }: WeatherCardProps) {
  return (
    <Card title="Погода" status={status} error={error} onReload={onReload}>
      {data && (
        <p> 
            Temperature: {data.temperature}°C, Wind speed: {data.windSpeed} км/ч
        </p>
      )}    
    </Card>
  );
}   