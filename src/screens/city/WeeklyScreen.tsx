import dayjs from 'dayjs'
import * as React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Card from '../../components/card'
import CityOverview from '../../components/city-overview'
import WeatherIcon from '../../components/weather-icon'
import { CityTabScreenProps } from '../../navigation/types'
import { useAppSelector } from '../../store/hooks'
import { selectCurrentCity, selectWeeklyForecast } from '../../store/weatherSlice'

export default function WeeklyScreen(props: CityTabScreenProps<'Weekly'>) {
  const currentCity = useAppSelector(selectCurrentCity)
  const data = useAppSelector(selectWeeklyForecast)
  return (
    <View style={styles.container}>
      <CityOverview city={currentCity!} />

      <Card>
        <FlatList
          data={data}
          keyExtractor={item => item.dt.toString()}
          ItemSeparatorComponent={Divider}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.day}>{`${dayjs.unix(item.dt).format('DD MMM')}`}</Text>
              <View style={styles.weather}>
                <WeatherIcon size={30} icon={item.icon} />
                <Text style={styles.degree}>{item.degree}°</Text>
              </View>
            </View>
          )}
        />
      </Card>
    </View>
  )
}

const Divider = () => <View style={styles.divider} />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  divider: {
    height: 1 / 2,
    backgroundColor: '#e3e3e3',
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  day: {
    fontSize: 18,
    fontWeight: '300',
  },
  weather: {
    flexDirection: 'row',
    gap: 16,
  },
  degree: {
    fontSize: 18,
    fontWeight: '200',
    width: 30,
    textAlign: 'right',
  },
})
