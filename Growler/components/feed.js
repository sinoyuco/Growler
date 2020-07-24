
import React, { Component, useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import { logout } from '../actions/session_actions';
import { connect } from 'react-redux';

class Feed extends Component{
    constructor(props){
        super(props)
        this._handleLogout = this._handleLogout.bind(this);
    }

    _handleLogout() {
        debugger;
        this.props.logout();
        this.props.navigation.navigate('Landing');
    }

    render(){
        const email = this.props.user ? this.props.user.email : null;
        return(
            <View>
            <Button title="Logout" onPress={this._handleLogout}></Button>
           
            <Text> Hi {email}!</Text>
            </View>
        );
    }
}


const mSTP = (state) => {
    debugger
    return{
    user: state.session.user
}};


const mDTP = (dispatch) => ({
    logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(Feed);

