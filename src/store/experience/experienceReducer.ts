import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Alert } from 'react-native'
import { ExperienceSnapshotData } from '../../types/common/experience'

type LoadedExperiences = PayloadAction<{ experiences: ExperienceSnapshotData[] }>

const experienceReducer = createSlice({
  name: 'experience',
  initialState: {
    experiences: [] as ExperienceSnapshotData[]
  },
  reducers: {
    loadExperiences: () => { },
    loadedExperiences: (state, action: LoadedExperiences) => {
      state.experiences = action.payload.experiences
      console.log(action.payload.experiences)
      Alert.alert(JSON.stringify(state.experiences))
    }
  }
})

export const {
  loadExperiences,
  loadedExperiences
} = experienceReducer.actions

export default experienceReducer.reducer