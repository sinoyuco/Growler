import React, { Component } from 'react';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';

export default class Login extends Component {

    _onPressButton() {
        alert('You tapped the button!')
        //Login
    }

    render(){
        return(
            <View>
                <Text>This is the login screen.</Text>
                <TextInput
                        style={{
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1
                        }}
                        defaultValue="Email"
                />
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1
                    }}
                    defaultValue="Password"
                />
                <Button
                    onPress={this._onPressButton}
                    title="Login"
                    color="#841584"
                />
            </View>
        );
    }
}



export default Login;