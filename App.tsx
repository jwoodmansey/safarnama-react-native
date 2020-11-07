/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import RootNavigation from './src/nav/RootNavigation';

import { NavigationContainer } from '@react-navigation/native';

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <>
      <NavigationContainer>
        <RootNavigation></RootNavigation>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
});

export default App;
