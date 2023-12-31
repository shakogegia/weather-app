import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { City } from '../store/weatherSlice'
import WeatherIcon from './weather-icon'

export default function CityOverview({ city, mood }: { city: City; mood?: string }) {
  return (
    <View style={styles.container}>
      {mood && <Text style={styles.mood}>Week Mood: {mood}</Text>}

      <View style={styles.row}>
        {city.icon && <WeatherIcon icon={city.icon} size={120} />}
        <View>
          <Text style={styles.degree}>{city.degree}°</Text>
          <Text style={styles.weatherDescription}>{city.weatherDescription}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  degree: {
    fontSize: 48,
    fontWeight: '200',
  },
  weatherDescription: {
    fontSize: 14,
    fontWeight: '300',
  },
  mood: {
    fontSize: 18,
    fontWeight: '300',
  },
})
