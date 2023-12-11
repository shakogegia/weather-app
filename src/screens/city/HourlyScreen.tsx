import dayjs from 'dayjs'
import * as React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import Card from '../../components/card'
import CityOverview from '../../components/city-overview'
import WeatherIcon from '../../components/weather-icon'
import { CityTabScreenProps } from '../../navigation/types'
import { useAppSelector } from '../../store/hooks'
import { selectCityMood, selectCurrentCity, selectHourlyForecast } from '../../store/weatherSlice'
import { LineChart } from 'react-native-chart-kit'
import { chartConfig } from '../../utils/constants'

export default function HourlyScreen(props: CityTabScreenProps<'Hourly'>) {
  const currentCity = useAppSelector(selectCurrentCity)
  const mood = useAppSelector(selectCityMood)
  const data = useAppSelector(selectHourlyForecast)

  const chartData = React.useMemo(
    () => ({
      labels: data ? data.map(item => `${dayjs.unix(item.dt).format('hA')}`) : [],
      datasets: [
        {
          data: data ? data.map(item => item.degree) : [],
        },
      ],
    }),
    [data],
  )

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <CityOverview city={currentCity!} mood={mood} />

        <Card>
          <ScrollView
            horizontal
            pagingEnabled={false}
            style={styles.hourlyScrollView}
            contentContainerStyle={styles.hourlyScrollViewContent}
          >
            {data &&
              data.map(item => (
                <View style={styles.hourForecastContainer} key={item.dt}>
                  <Text>{`${dayjs.unix(item.dt).format('HH:mm')}`}</Text>
                  <WeatherIcon size={40} icon={item.icon} />
                  <Text>{item.degree}°</Text>
                </View>
              ))}
          </ScrollView>
        </Card>

        <View>
          {data && (
            <LineChart
              data={chartData}
              width={Dimensions.get('window').width - 32}
              withDots
              height={240}
              fromZero
              yAxisSuffix="°"
              yAxisInterval={1}
              chartConfig={chartConfig}
              bezier
              style={styles.chartStyles}
            />
          )}
        </View>
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
  chartStyles: {
    borderRadius: 16,
    paddingRight: 45,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 3,
  },
})
