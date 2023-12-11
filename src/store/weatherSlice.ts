import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from './api'
import type { RootState } from './store'
import { weekMoods } from '../utils/constants'
import { getWeatherMood } from '../utils/helpers'

export type City = {
  id: string
  name: string
  lat?: number
  lon?: number
  degree?: number
  icon?: string
  weather?: string
  weatherDescription?: string
}

type Forecast = {
  dt: number
  degree: number
  icon: string
  weather: string
  weatherDescription: string
}

interface WeatherState {
  cities: City[]
  currentCity?: City
  cityData?: {
    isLoading: boolean
    mood?: string
    daily?: Forecast[]
    hourly?: Forecast[]
  } | null
  isLoading: boolean
}

const initialState: WeatherState = {
  cities: [
    { id: '2759794', name: 'Amsterdam' },
    { id: '2988507', name: 'Paris' },
    { id: '4219762', name: 'Rome' },
    { id: '3128760', name: 'Barcelona' },
  ],
  isLoading: false,
}

export const fetchForecast = createAsyncThunk('weather/cities/fetch', (_, thunkApi) => {
  const state = thunkApi.getState() as RootState
  const ids = state.weather.cities.map(city => city.id).join(',')
  return api.fetchForecast(ids)
})

export const fetchCityForecast = createAsyncThunk(
  'weather/city/fetch',
  async (city: City): Promise<WeatherState['cityData']> => {
    const data = await api.fetchCityForecast(city.lat!, city.lon!)

    const daily = data.daily.map((item: any) => ({
      dt: item.dt,
      degree: Math.round(item.temp.day),
      icon: item.weather[0].icon,
      weather: item.weather[0].main,
      weatherDescription: item.weather[0].description,
    }))

    const avarageWeekTemp = daily.reduce((acc: number, item: Forecast) => acc + item.degree, 0) / daily.length

    return {
      isLoading: false,
      mood: getWeatherMood(avarageWeekTemp),
      daily,
      hourly: data.hourly
        .map((item: any) => ({
          dt: item.dt,
          degree: Math.round(item.temp),
          icon: item.weather[0].icon,
          weather: item.weather[0].main,
          weatherDescription: item.weather[0].description,
        }))
        .slice(0, 8),
    }
  },
)

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<City>) => {
      state.currentCity = action.payload
      state.cityData = null
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchForecast.fulfilled, (state, action) => {
      state.cities = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchForecast.pending, state => {
      state.isLoading = true
    })
    builder.addCase(fetchForecast.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(fetchCityForecast.fulfilled, (state, action) => {
      state.cityData = action.payload
    })
    builder.addCase(fetchCityForecast.pending, state => {
      state.cityData = {
        isLoading: true,
      }
    })
    builder.addCase(fetchCityForecast.rejected, state => {
      state.cityData = {
        isLoading: false,
      }
    })
  },
})

// Actions
export const { setCurrentCity } = weatherSlice.actions

// Selectors
export const selectCities = (state: RootState) => state.weather.cities
export const selectIsLoading = (state: RootState) => state.weather.isLoading

export const selectCurrentCity = (state: RootState) => state.weather.currentCity
export const selectCityMood = (state: RootState) => state.weather.cityData?.mood
export const selectDailyForecast = (state: RootState) => state.weather.cityData?.daily
export const selectHourlyForecast = (state: RootState) => state.weather.cityData?.hourly

export default weatherSlice
