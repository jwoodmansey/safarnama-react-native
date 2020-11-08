import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createEpicMiddleware } from 'redux-observable';
import experienceReducer from './experience/experienceReducer'
import rootEpic from './rootEpic';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    experience: experienceReducer,
  },
  middleware: getDefaultMiddleware().concat(epicMiddleware)
})

epicMiddleware.run(rootEpic);


export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch