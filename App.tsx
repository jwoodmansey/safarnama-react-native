/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import React from "react";
import { useColorScheme } from "react-native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./src/nav/Loading";
import { navigationRef } from "./src/nav/NavigationRef";
import RootNavigation from "./src/nav/RootNavigation";
import { persistor, store } from "./src/store/configure";

const CombinedDefaultTheme: ReactNativePaper.Theme & Theme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};
const CombinedDarkTheme: ReactNativePaper.Theme & Theme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

const App: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider
          theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}
        >
          <NavigationContainer
            theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}
            ref={navigationRef}
          >
            <Loading />
            <RootNavigation />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
