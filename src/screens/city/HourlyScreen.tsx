import * as React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Card from '../../components/card'
import CityOverview from '../../components/city-overview'
import { CityTabScreenProps } from '../../navigation/types'
import { useAppSelector } from '../../store/hooks'
import { selectCurrentCity } from '../../store/weatherSlice'

export default function HourlyScreen(props: CityTabScreenProps<'Hourly'>) {
  const currentCity = useAppSelector(selectCurrentCity)

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <CityOverview city={currentCity!} />

        <Card>
          <Text>Hourly</Text>
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
})
