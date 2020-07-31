import React, { Component, useState, useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput, ScrollView, ImageBackground } from 'react-native';
import { logout } from '../actions/session_actions';
import {fetchGrowls, fetchUserGrowls} from '../actions/growl_actions';
import CreateGrowl from './create_growl';
import GrowlItem from './growl_item'


export default Feed = ({navigation}) => {
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
        debugger;
        dispatch(fetchGrowls());
    },[]);


    const background_image = { uri: 'https://hiptrip-aa-seed.s3.amazonaws.com/Growler/landingback.png' }
    const handle = user ? user.handle : null;
    const showGrowls = growls.length ? growls.map(ele => <GrowlItem growl={ele} key={ele.id}/>) : <Text>Your growls feed is empty :(</Text>;

    debugger;
    return (
      <ImageBackground source={background_image} style={{ width: '100%', height: '100%' }}>
        <View style={styles.screen}>

          <View style={styles.header}>
            <Text onPress={() => navigation.navigate('Profile')}>@{handle}</Text>
            <Button title="Logout" onPress={() => _handleLogout()}></Button>
          </View>


          <CreateGrowl/>


          <ScrollView style={styles.growlcontainer}>
              {showGrowls}
          </ScrollView>


          
        </View>
      </ImageBackground>
    );
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
  },
  screen:{
    height: '100%',
    width: '100%',
  }
});



