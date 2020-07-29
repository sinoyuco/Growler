import React, { Component, useState, useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
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


    const email = user ? user.handle : null;
    const showGrowls = growls.length ? growls.map(ele => <GrowlItem growl={ele} key={ele.id}/>) : <Text>Your growls feed is empty :(</Text>;
    debugger;
    return (
      <View>
        <Text> Hi {email}!</Text>
          <View>
            {showGrowls}
          </View>
        <CreateGrowl/>
        <Button title="Logout" onPress={() => _handleLogout()}></Button>
      </View>
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



