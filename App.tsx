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
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import React from "react";
import { I18nextProvider } from "react-i18next";
import { useColorScheme } from "react-native";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import i18n from "./src/i18n/config";
import Loading from "./src/nav/Loading";
import { navigationRef } from "./src/nav/NavigationRef";
import RootNavigation from "./src/nav/RootNavigation";
import { persistor, store } from "./src/store/configure";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const App: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme == "dark";
  const paperTheme = isDarkTheme ? MD3DarkTheme : MD3LightTheme;
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
