import React, { Component, useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/dev";
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput, ImageBackground } from 'react-native';
import { signup } from '../actions/session_actions';
import { AppLoading } from 'expo';
// import DatePicker from 'react-native-date-picker'
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const background_image = { uri: 'https://hiptrip-aa-seed.s3.amazonaws.com/Growler/landingback.png' }

const SignUp = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        Lobster_400Regular
    });

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [handle, setHandle] = useState('');
    const [birthday, setBirthday] = useState(new Date());
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const dispatch = useDispatch();

    //DatePicker stuff

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setBirthday(date);
        hideDatePicker();
    };

    // Other

    const handleSignup = () => {
        const user = {name: name, handle: handle, birthday: birthday, email: email, password: password, password2: password2}
        debugger;
        dispatch(signup(user)).then(() => navigation.navigate('Feed'));
        //.then(navigation.navigate('Feed'));
    }

    let birthday_button_text = birthday === new Date() ? 'Enter Birthday' : birthday

    const styles = StyleSheet.create({
        input: {
            height: 50,
            borderColor: 'gray',
            borderWidth: 1,
            width: '80%',
            marginTop: 10,
            marginRight: 'auto',
            marginBottom: 10,
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
        datebutton: {
            
        }
    });

    if (!fontsLoaded) {
        return <AppLoading />
    } else {
    return (
        <ImageBackground source={background_image} style={{ width: '100%', height: '100%' }}>
            <View styles>
                <Text style={styles.mainheader}> Register </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor= '#FFFFFF'
                    onChangeText={(name) => setName(name)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Handle"
                    placeholderTextColor='#FFFFFF'
                    onChangeText={(handle) => setHandle(handle)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor='#FFFFFF'
                    onChangeText={(email) => setEmail(email)}
                />
                {/* <DateTimePicker
                    title="Birthdate"
                    value={this.state.birthdate}
                    onChange={this.onDateChange}
                    display="calendar"
                /> */}
                <Button style={styles.datebutton} title={birthday_button_text} onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor='#FFFFFF'
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Re-enter Password"
                    placeholderTextColor='#FFFFFF'
                    secureTextEntry={true}
                    onChangeText={(password2) => setPassword2(password2)}
                />
                <Button
                    onPress={() => handleSignup()}
                    title="Register"
                    color="#841584"
                />

                <Button title="Already a member? Log In" onPress={() => navigation.navigate('Login')}></Button>
            </View>
        </ImageBackground>
    );
    }
    

}

export default SignUp;