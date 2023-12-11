import { City } from './weatherSlice'

export const api = {
  fetchForecast: async (ids: string): Promise<City[]> => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/group?id=${ids}&units=metric&appid=${process.env.EXPO_PUBLIC_API_KEY}`,
    )
    const data = await response.json()

    return data.list.map((item: any) => ({
      id: item.id,
      name: item.name,
      lat: item.coord.lat,
      lon: item.coord.lon,
      degree: Math.round(item.main.temp),
      icon: item.weather[0].icon,
      weather: item.weather[0].main,
      weatherDescription: item.weather[0].description,
    }))
  },
  fetchWeeklyForecast: async (lat: number, lon: number) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&units=metric&appid=${process.env.EXPO_PUBLIC_API_KEY}`,
    )
    const data = await response.json()

    return data.list.map((item: any) => ({
      dt: item.dt,
      degree: Math.round(item.main.temp),
      icon: item.weather[0].icon,
      weather: item.weather[0].main,
      weatherDescription: item.weather[0].description,
    }))
  },
}
