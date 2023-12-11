import { weatherMoods } from './constants'

export function getWeatherMood(currentTemperature: number) {
  for (const mood of weatherMoods) {
    if (currentTemperature >= mood.minTemp && currentTemperature <= mood.maxTemp) {
      return mood.title
    }
  }
  // If no match is found, return a default value or handle accordingly
  return 'Unknown Mood'
}
