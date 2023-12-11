import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { City } from '../store/weatherSlice'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined
  City: City
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>

export type CityTabParamList = {
  Hourly: undefined
  Daily: undefined
}

export type CityTabScreenProps<Screen extends keyof CityTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<CityTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>
