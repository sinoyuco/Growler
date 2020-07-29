import React, { Component, useState, useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import { logout } from '../actions/session_actions';
import {fetchGrowls, fetchUserGrowls} from '../actions/growl_actions';
import CreateGrowl from './create_growl';
import Growl from './growl'


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
    });


    const email = user ? user.email : null;
    const showGrowls = growls.length ? growls.map(ele => <GrowlItem growl={ele} key={ele.id}/>) : 'Your growls feed is empty :(';
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




