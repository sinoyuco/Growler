import React, { Component, useState, useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import { logout } from '../actions/session_actions';
import {fetchGrowls, fetchUserGrowls} from '../actions/growl_actions';
import CreateGrowl from './create_growl';
import Growl from './growl'

<<<<<<< HEAD

export default Feed = ({navigation}) => {
    const growls = useSelector((state) => Object.values(state.growls.all));
=======
export default feed = props => {
    // const growls = useSelector((state) => Object.values(state.growls.all));
>>>>>>> ed2c21fff2f7fdbd7eb359393caf1133e54758ab
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();


    const _handleLogout = () => {
        // logout;
        dispatch(logout());
        //navigate - logout does not return a promise so cannot do .then()
        navigation.navigate('Landing')
      
    }

<<<<<<< HEAD
    useEffect(() => {
        debugger;
        dispatch(fetchGrowls());
    });

=======
    // useEffect(() => {
    //     dispatch(fetchGrowls());
    // })

    const email = user ? user.email : null;
    // const showGrowls = growls.length ? growls : 'Your growls feed is empty :(';
>>>>>>> ed2c21fff2f7fdbd7eb359393caf1133e54758ab

    const email = user ? user.email : null;
    const showGrowls = growls.length ? growls.map(ele => <GrowlItem growl={ele} key={ele.id}/>) : 'Your growls feed is empty :(';
    debugger;
    return (
      <View>
        <Text> Hi {email}!</Text>
<<<<<<< HEAD
          <View>
            {showGrowls}
          </View>
        <CreateGrowl/>
        <Button title="Logout" onPress={() => _handleLogout()}></Button>
=======
        <Text>
          {/* {showGrowls} */}
        </Text>
        <Growl/>
        <Button title="Logout" onPress={_handleLogout}></Button>
>>>>>>> ed2c21fff2f7fdbd7eb359393caf1133e54758ab
      </View>
    );
}




