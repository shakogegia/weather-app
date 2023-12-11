import { createSlice } from '@reduxjs/toolkit'

interface CitiesState {}

const initialState: CitiesState = {}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
})

export default weatherSlice
