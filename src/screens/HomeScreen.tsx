import { useCallback, useEffect } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Card from '../components/card'
import WeatherIcon from '../components/weather-icon'
import { RootStackScreenProps } from '../navigation/types'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  City,
  fetchCityForecast,
  fetchForecast,
  selectCities,
  selectIsLoading,
  setCurrentCity,
} from '../store/weatherSlice'

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  const insets = useSafeAreaInsets()
  const cities = useAppSelector(selectCities)
  const isLoading = useAppSelector(selectIsLoading)
  const dispatch = useAppDispatch()

  const refresh = useCallback(() => dispatch(fetchForecast()), [])

  useEffect(() => {
    refresh()
  }, [])

  function navigateToCity(city: City) {
    return () => {
      dispatch(setCurrentCity(city))
      dispatch(fetchCityForecast(city))
      navigation.navigate('City', city)
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={cities}
        keyExtractor={city => city.id}
        style={{ padding: 16 }}
        ListHeaderComponent={Header}
        ItemSeparatorComponent={Divider}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} />}
        renderItem={({ item: city }) => (
          <TouchableOpacity onPress={navigateToCity(city)}>
            <Card>
              <View style={styles.row}>
                <WeatherIcon icon={city.icon} size={60} />
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{city.name}</Text>
                  <Text style={styles.desc}>{city.weatherDescription}</Text>
                </View>
                <Text style={styles.degree}>{city.degree}°</Text>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const Divider = () => <View style={styles.divider} />

const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.header}>Weather Forecast</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  divider: {
    height: 16,
  },
  headerContainer: {
    justifyContent: 'center',
    marginBottom: 30,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  titleContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#202b3b',
  },
  desc: {
    fontSize: 14,
    color: '#585b60',
  },
  degree: {
    fontSize: 40,
    fontWeight: '100',
    color: '#202b3b',
  },
})
