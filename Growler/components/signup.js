import React, { Component, useState, useReducer } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import { signup } from '../actions/session_actions';
import { connect } from 'react-redux';
import DatePicker from 'react-native-date-picker'


class SignUp extends Component{
    constructor(props){
        super(props)
        this.state={name:'', handle: '', email: '01-01-2020', birthdate:'', password: '', password2:''}
        this._handleUpdate = this._handleUpdate.bind(this);
        this._handleSignup = this._handleSignup.bind(this);
    }

    _handleUpdate(text){
        return e => this.setState({[text]: e.currentTarget.value})
    }

    _handleSignup(){
        debugger;
        //this.props.signup(this.state).then(this.props.navigator.navigate('Feed'))
    }

    render() {
        
        return (
            <View>
                <Text>This is the sign up screen.</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={this._handleUpdate('name')}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Handle"
                    onChangeText={this._handleUpdate('handle')}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={this._handleUpdate('email')}
                />
                <DatePicker
                    title="Birthdate"
                    date={this.state.date}
                    onDateChange={(selected) => this.setState({date: selected})}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={this._handleUpdate('password')}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Re-enter Password"
                    secureTextEntry={true}
                    onChangeText={this._handleUpdate('password2')}
                />
                <Button
                    onPress={this._handleSignup}
                    title="Register"
                    color="#841584"
                />

                <Button title="Already a member? Log In" onPress={() => this.props.navi.navigate('Login')}></Button>
            </View>
        );
    }

}

const mSTP = (state) => ({
     
});

const mDTP = (dispatch) => ({
    signup: user => dispatch(signup(user))
});

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    }
});


export default connect(mSTP, mDTP)(SignUp);