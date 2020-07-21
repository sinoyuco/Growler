import React, { Component, useState, useReducer } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import {login} from '../actions/session_actions';



export const Login = () => {

    const initialLogin = {email: '', password: ''};
    const [user, setUser] = useState(initialLogin);
    
    const dispatch = useDispatch();

    
    const _onPressButton = () => {
        dispatch(login(this.state)).then(() => alert('logged in'));
    }

        return(
            <View>
                <Text>This is the login screen.</Text>
                <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={user => setUser('email')}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={user => setUser('password')}
                />
                <Button
                    onPress={_onPressButton()}
                    title="Login"
                    color="#841584"
                />
            </View>
        );
}



const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    }
});


