import React, { Component, useState, useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import { logout } from '../actions/session_actions';
import {fetchGrowls} from '../actions/growl_actions';
import Growl from './growl';

export default feed = props => {
    const growls = useSelector((state) => Object.values(state.growls.all));
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const _handleLogout = () => {
        // debugger;
        dispatch(logout());
        props.navigation.navigate('Landing');
    }

    useEffect(() => {
        dispatch(fetchGrowls());
    })

    const email = user ? user.email : null;
    const showGrowls = growls.length ? growls : 'Your growls feed is empty :(';

    return (
      <View>
        <Text> Hi {email}!</Text>
        <Text>
          {showGrowls}
        </Text>
        <Growl/>
        <Button title="Logout" onPress={_handleLogout}></Button>
      </View>
    );
}




