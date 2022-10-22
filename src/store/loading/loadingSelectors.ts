import { RootState } from "../rootReducer";

// eslint-disable-next-line import/prefer-default-export
export const selectIsLoading = (store: RootState): boolean =>
  store.loading.isLoading;
