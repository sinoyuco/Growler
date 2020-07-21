import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import {login} from './actions/session_actions';

class Login extends Component {

    constructor(props){
        this.state={email: '', password: ''}
    }

    _onPressButton() {
        this.props.login(this.state);
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
                        onChangeText={(str) => this.setState({ email: str })}
                />
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1
                    }}
                    defaultValue="Password"
                    onChangeText={(str) => this.setState({ password: str })}
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

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (state) => ({
    login
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

