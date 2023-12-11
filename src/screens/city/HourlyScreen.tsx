import dayjs from 'dayjs'
import * as React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Card from '../../components/card'
import CityOverview from '../../components/city-overview'
import { CityTabScreenProps } from '../../navigation/types'
import { useAppSelector } from '../../store/hooks'
import { selectCurrentCity, selectHourlyForecast } from '../../store/weatherSlice'
import WeatherIcon from '../../components/weather-icon'

export default function HourlyScreen(props: CityTabScreenProps<'Hourly'>) {
  const currentCity = useAppSelector(selectCurrentCity)
  const data = useAppSelector(selectHourlyForecast)

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <CityOverview city={currentCity!} />

        <Card>
          <ScrollView
            horizontal
            pagingEnabled={false}
            style={styles.hourlyScrollView}
            contentContainerStyle={styles.hourlyScrollViewContent}
          >
            {data.map(item => (
              <View style={styles.hourForecastContainer} key={item.dt}>
                <Text>{`${dayjs.unix(item.dt).format('HH:mm')}`}</Text>
                <WeatherIcon size={40} icon={item.icon} />
                <Text>{item.degree}°</Text>
              </View>
            ))}
          </ScrollView>
        </Card>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  scrollViewContent: {
    gap: 24,
  },
  hourlyScrollView: {
    padding: 8,
  },
  hourlyScrollViewContent: {
    gap: 16,
    paddingHorizontal: 8,
  },
  hourForecastContainer: {
    alignItems: 'center',
  },
})
