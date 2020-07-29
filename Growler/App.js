import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/landing';
// import {Login} from './components/login';
import Login from './components/login';
import Feed from './components/feed';
import SignUp from './components/signup';
// import Growls from './components/growl';
import { Provider } from 'react-redux';
import configureStore from './store/store';

import * as APIUtil from './util/session_api_util'
import {saveData, getData, remove} from './actions/async_storage';
import jwt_decode from 'jwt-decode';
import { logout } from './actions/session_actions';
import {AsyncStorage} from 'react-native';

const Stack = createStackNavigator();


export default function App() {


  let store = configureStore();
  
  getData('jwtToken').then((res)=>{
      if(res){
        debugger;
        APIUtil.setAuthToken(res);

        // Decode the token to obtain the user's information
        const decodedUser = jwt_decode(res);

        // Create a preconfigured state we can immediately add to our store
        const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

        store = configureStore(preloadedState);

        const currentTime = Date.now() / 1000;

        // If the user's token has expired
        if (decodedUser.exp < currentTime) {
          // Logout the user and redirect to the login page
          store.dispatch(logout());
          // navigation.navigate('Landing');
        }

      }
    });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={Login} />
          {/* <Stack.Screen name="Growls" component={Growls} /> */}
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Feed" component={Feed} />
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
