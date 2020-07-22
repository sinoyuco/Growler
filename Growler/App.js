import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/landing';
import {Login} from './components/login';
import { Provider } from 'react-redux';
import configureStore from './store/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={configureStore()}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={LandingScreen}/>
          <Stack.Screen name="Login" component={Login} />
          {/* <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
          </View> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
