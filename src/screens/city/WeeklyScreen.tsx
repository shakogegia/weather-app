import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { CityTabScreenProps } from '../../navigation/types'

export default function WeeklyScreen(props: CityTabScreenProps<'Weekly'>) {
  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
})
