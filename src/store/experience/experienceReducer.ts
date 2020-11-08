import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Alert } from 'react-native'

type LoadedExperiences = PayloadAction<{ experiences: any[] }>

const experienceReducer = createSlice({
  name: 'experience',
  initialState: {
    experiences: [] as any
  },
  reducers: {
    loadExperiences: () => { },
    loadedExperiences: (state, action: LoadedExperiences) => {
      state.experiences = action.payload.experiences
      Alert.alert(JSON.stringify(state.experiences))
    }
  }
})

export const {
  loadExperiences,
  loadedExperiences
} = experienceReducer.actions

export default experienceReducer.reducer