import React, { Component, useState, useReducer } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/dev";
import { AppLoading } from 'expo';
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import {login} from '../actions/session_actions';



const background_image = { uri: 'https://hiptrip-aa-seed.s3.amazonaws.com/Growler/landingback.png' }

const Login = ({ navigation }) => {

    let [fontsLoaded] = useFonts({
        Lobster_400Regular
    });

    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');
    const errors = useSelector(state => state.errors.session);

    const _handleLogin = () => {
        const data = {email: email, password: password}
        dispatch(login(data)).then((res) => {
            if(res.type === 'RECEIVE_CURRENT_USER'){
                navigation.navigate('Feed')
            }
        });
    }


    const styles = StyleSheet.create({
        input: {
            height: 50,
            borderColor: 'gray',
            borderWidth: 1,
            width: '100%',
            marginTop: 10,
            marginRight: 'auto',
            marginBottom: 30,
            marginLeft: 'auto',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#FFFFFF',
            color: '#FFFFFF',
            paddingLeft: 15,
            fontSize: 20
        },
        mainheader: {
            color: '#FFFFFF',
            fontFamily: "Lobster_400Regular",
            textAlign: 'center',
            fontSize: 70,
            marginBottom: 30
        },
        main: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        error_text:{
            position: 'absolute',
            borderWidth: 1,
            borderColor: '#FF6347',
            backgroundColor: '#FF6347',
            color: '#FFFFFF',
            bottom: 23
        },
        input_parent: {
            position: 'relative',
            width: '80%',
        },
        login_button:{
            padding: 20,
            width: '30%',
            borderRadius: 10,
            backgroundColor: '#663a82'
        },
        login_button_text:{
            fontSize: 20,
            color: '#FFFFFF',
            textAlign: 'center'
        },
        not_a_member:{
            padding: 20,
            width: '50%',
            borderRadius: 10,
            backgroundColor: '#663a82',
            marginTop: 20
        }
    });

    // const logout_button = user ? <Button title="Logout" onPress={() => _handleLogout()}></Button> : null;

    const email_error = errors.email ? <Text style={styles.error_text}>{errors.email}</Text> : null;
    const password_error = errors.password ? <Text style={styles.error_text}>{errors.password}</Text> : null;
        
    if (!fontsLoaded) {
        return <AppLoading />
    } else {
    return(
        <ImageBackground source={background_image} style={{ width: '100%', height: '100%' }}>
            <View style={styles.main}>
                <Text style={styles.mainheader}>Login</Text>

                <View style={styles.input_parent}>
                    <TextInput
                            style={styles.input}
                            placeholder="Email"
                        placeholderTextColor='#FFFFFF'
                            onChangeText={(email) => setEmail(email)}
                    />
                        {email_error}
                </View>

                <View style={styles.input_parent}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor='#FFFFFF'
                        secureTextEntry={true}
                        onChangeText={(pass) => setPassword(pass)}
                    />
                        {password_error}
                </View>
                <TouchableOpacity
                    style={styles.login_button}
                    onPress={() => _handleLogin()}
                >
                    <Text style={styles.login_button_text}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.not_a_member} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.login_button_text}>Not a member? Sign up</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    ); 
    }
    
}

export default Login;



