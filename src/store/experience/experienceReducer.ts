import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Alert } from 'react-native'
import { ExperienceSnapshotData } from '../../types/common/experience'
import { PointOfInterestDocument } from '../../types/common/point-of-interest'

type LoadedExperiences = PayloadAction<{ experiences: ExperienceSnapshotData[] }>

type ExperienceState = {
  experiences: ExperienceSnapshotData[],
  selectedPlace: PointOfInterestDocument | undefined
}

const experienceReducer = createSlice({
  name: 'experience',
  initialState: {
    experiences: [] as ExperienceSnapshotData[],
    selectedPlace: undefined,
  } as ExperienceState,
  reducers: {
    loadExperiences: () => { },
    loadedExperiences: (state, action: LoadedExperiences) => {
      state.experiences = action.payload.experiences
      console.log(action.payload.experiences)
      // Alert.alert(JSON.stringify(state.experiences))
    },
    setSelectedPlace: (state, action: PayloadAction<PointOfInterestDocument>) => {
      state.selectedPlace = action.payload
    }
  }
})

export const {
  loadExperiences,
  loadedExperiences,
  setSelectedPlace,
} = experienceReducer.actions

export default experienceReducer.reducer