import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from './api'
import type { RootState } from './store'
import dayjs from 'dayjs'

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
  weatherData?: {
    isLoading: boolean
    weekly?: Forecast[]
  } | null
  isLoading: boolean
}

const initialState: WeatherState = {
  cities: [
    { id: '2759794', name: 'Amsterdam' },
    { id: '2988507', name: 'Paris' },
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
  async (city: City): Promise<WeatherState['weatherData']> => {
    const data = await api.fetchWeeklyForecast(city.lat!, city.lon!)

    return {
      isLoading: false,
      weekly: data.filter(
        (item: any, index: number) =>
          index ===
          data.findIndex(
            (t: any) => dayjs.unix(t.dt).format('DD-MM-YYYY') === dayjs.unix(item.dt).format('DD-MM-YYYY'),
          ),
      ),
    }
  },
)

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<City>) => {
      state.currentCity = action.payload
      state.weatherData = null
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchForecast.fulfilled, (state, action) => {
      state.cities = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchForecast.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchForecast.rejected, (state, action) => {
      state.isLoading = false
    })

    builder.addCase(fetchCityForecast.fulfilled, (state, action) => {
      state.weatherData = action.payload
    })
    builder.addCase(fetchCityForecast.pending, (state, action) => {
      state.weatherData = {
        isLoading: true,
      }
    })
    builder.addCase(fetchCityForecast.rejected, (state, action) => {
      state.weatherData = {
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
export const selectWeeklyForecast = (state: RootState) => state.weather.weatherData?.weekly ?? []

export default weatherSlice
