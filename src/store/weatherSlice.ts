import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from './api'
import type { RootState } from './store'

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

interface CitiesState {
  cities: City[]
  isLoading: boolean
}

const initialState: CitiesState = {
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

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
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
  },
})

export const selectCities = (state: RootState) => state.weather.cities
export const selectIsLoading = (state: RootState) => state.weather.isLoading

export default weatherSlice
