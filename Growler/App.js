import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './landing';

const Stack = createStackNavigator();

export default function App() {
  return (
<<<<<<< HEAD
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
=======
    <View style={styles.container}>
      <Text>Growler Rocks!</Text>
      <StatusBar style="auto" />
    </View>
>>>>>>> e10eaafecdbe85a0f7b4874cb8f236f20c1525af
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
