import React, { Component, useState, useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/dev";
import { AppLoading } from 'expo';
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { logout } from '../actions/session_actions';
import {fetchGrowls, fetchUserGrowls} from '../actions/growl_actions';
import CreateGrowl from './create_growl';
import GrowlItem from './growl_item'


export default Feed = ({navigation}) => {

  let [fontsLoaded] = useFonts({
        Lobster_400Regular
    });

    const growls = useSelector((state) => Object.values(state.growls.all));
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();


    const _handleLogout = () => {
        // logout;
        dispatch(logout());
        //navigate - logout does not return a promise so cannot do .then()
        navigation.navigate('Landing')
      
    }

    useEffect(() => {
        dispatch(fetchGrowls());
    }, []);

    
    const background_image = { uri: 'https://hiptrip-aa-seed.s3.amazonaws.com/Growler/landingback.png' }
    const handle = user ? user.handle : null;
    const showGrowls = growls.length ? growls.map(ele => <GrowlItem growl={ele} key={ele.id}/>) : <Text>Your growls feed is empty :(</Text>;

    if(!fontsLoaded){
      return <AppLoading/>
    }else{
    return (
      <ImageBackground source={background_image} style={{ width: '100%', height: '100%' }}>
        <View style={styles.screen}>

          <View style={styles.header}>
            <Text style={styles.handle} onPress={() => navigation.navigate('Profile')}>@{handle}</Text>

            <TouchableOpacity style={styles.logout_button} onPress={() => _handleLogout()}>
              <Text style={styles.logout_button_text}>Logout</Text>
            </TouchableOpacity>
          </View>


          <CreateGrowl/>


          <ScrollView style={styles.growlcontainer}>
              {showGrowls}
          </ScrollView>


          
        </View>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  growlcontainer:{
    width: '100%',
    height: '60%',
  },
  header:{
    flex: 1,
    flexDirection: 'row',
    height: '20%',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 20,
    alignItems: 'center'
  },
  screen:{
    height: '100%',
    width: '100%',
  },
  handle:{
    fontFamily: "Lobster_400Regular",
    color: '#FFFFFF',
    fontSize: 36,
    textDecorationLine: 'underline'
  },
  logout_button:{
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#663a82',
    height: '50%'

  },
  logout_button_text:{
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center'
  }
});



