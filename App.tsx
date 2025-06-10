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
import { I18nextProvider } from "react-i18next";
import { useColorScheme } from "react-native";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  MD2DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  ThemeBase,
} from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Loading from "./src/nav/Loading";
import { navigationRef } from "./src/nav/NavigationRef";
import RootNavigation from "./src/nav/RootNavigation";
import { persistor, store } from "./src/store/configure";
import i18n from "./src/i18n/config";

//Add MD3LightTheme AND MD3DarkTheme i

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

// export const ThemeContext = createContext({
//   isDark: false,
//   theme: LightTheme,
// });

const CombinedDefaultTheme: ThemeBase & Theme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};
const CombinedDarkTheme: ThemeBase & Theme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

const App: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme == "dark";
  const theme = isDarkTheme ? MD3DarkTheme : MD3LightTheme;

  // Paper theme (MD3)
  const paperTheme = isDarkTheme ? MD3DarkTheme : MD3LightTheme;

  // Navigation theme adaptado
  const navigationTheme = isDarkTheme ? DarkTheme : LightTheme;

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <PaperProvider theme={paperTheme}>
              <NavigationContainer theme={navigationTheme} ref={navigationRef}>
                <RootNavigation />
                <Loading />
              </NavigationContainer>
            </PaperProvider>
          </SafeAreaProvider>
        </PersistGate>
      </I18nextProvider>
    </Provider>
  );
};

export default App;
