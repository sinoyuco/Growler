import React, { Component, useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/dev";
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
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

    const errors = useSelector(state => state.errors.session);

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
        dispatch(signup(user)).then((res) => {
            if(res.type === 'RECEIVE_CURRENT_USER'){
                navigation.navigate('Feed');
            }
        });
    }
    
    let birthday_button_text = birthday.getFullYear() === new Date().getFullYear() && birthday.getMonth() === new Date().getMonth() && birthday.getDate() === new Date().getDate() ? 'Enter Birthday' : birthday.toLocaleDateString();
    



    const name_error = errors.name ? <Text style={styles.error_text}>{errors.name}</Text> : null;
    const handle_error = errors.handle ? <Text style={styles.error_text}>{errors.handle}</Text> : null;
    const email_error = errors.email ? <Text style={styles.error_text}>{errors.email}</Text> : null;
    const password_error = errors.password ? <Text style={styles.error_text}>{errors.password}</Text> : null;
    const password2_error = errors.password2 ? <Text style={styles.error_text}>{errors.password2}</Text> : null;

    if (!fontsLoaded) {
        return <AppLoading />
    } else {
    return (
        <ImageBackground source={background_image} style={{ width: '100%', height: '100%' }}>
            <View style={styles.main}>
                <Text style={styles.mainheader}> Register </Text>

                    <View style={styles.input_parent}>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor= '#FFFFFF'
                        onChangeText={(name) => setName(name)}
                    />
                        {name_error}
                    </View>

                    <View style={styles.input_parent}>
                    <TextInput
                        style={styles.input}
                        placeholder="Handle"
                        placeholderTextColor='#FFFFFF'
                        onChangeText={(handle) => setHandle(handle)}
                    />
                        {handle_error}
                    </View>

                    <View style={styles.input_parent}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor='#FFFFFF'
                        onChangeText={(email) => setEmail(email)}
                    />

                        {email_error}
                    </View>
                {/* <DateTimePicker
                    title="Birthdate"
                    value={this.state.birthdate}
                    onChange={this.onDateChange}
                    display="calendar"
                /> */}

                <TouchableOpacity style={styles.datebutton} onPress={showDatePicker}>
                    <Text style={styles.datebutton_text}>{birthday_button_text}</Text>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

                    <View style={styles.input_parent}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor='#FFFFFF'
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                    />

                        {password_error}
                    </View>

                    <View style={styles.input_parent}>
                    <TextInput
                        style={styles.input}
                        placeholder="Re-enter Password"
                        placeholderTextColor='#FFFFFF'
                        secureTextEntry={true}
                        onChangeText={(password2) => setPassword2(password2)}
                    />

                        {password2_error}
                    </View>

                <TouchableOpacity style={styles.register_button} onPress={() => handleSignup()}>
                    <Text style={styles.register_button_text}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.already_a_member} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.register_button_text}>Already a member? Log In</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
    }
    

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
        datebutton: {
            marginBottom: 20,
            borderColor: '#FFFFFF',
            borderWidth: 1,
            padding: 10,
            borderRadius: 10
        },
        datebutton_text: {
            color: "#FFFFFF",
            fontSize: 20
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
        register_button:{
            padding: 20,
            width: '50%',
            borderRadius: 10,
            backgroundColor: '#663a82',
        },
        register_button_text:{
            fontSize: 20,
            color: '#FFFFFF',
            textAlign: 'center'
        },
        already_a_member:{
            padding: 20,
            width: '80%',
            borderRadius: 10,
            backgroundColor: '#663a82',
            marginTop: 20
        }
    });

export default SignUp;