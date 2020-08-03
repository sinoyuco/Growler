import React, { Component, useState, useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/dev";
import { AppLoading } from 'expo';
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { logout } from '../actions/session_actions';
import { fetchUserGrowls } from '../actions/growl_actions';
import GrowlItem from './growl_item'

export default Profile = ({navigation}) => {

    let [fontsLoaded] = useFonts({
        Lobster_400Regular
    });


    const growls = useSelector((state) => Object.values(state.growls.user));
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    
    debugger;
    
    useEffect(() => {
        dispatch(fetchUserGrowls(user.id));
    }, []);
    
    const _handleLogout = () => {
        // logout;
        dispatch(logout());
        //navigate - logout does not return a promise so cannot do .then()
        navigation.navigate('Landing');
    }

    const DateFormat = (dateString) => {
        let splitted = dateString.split('-');
        let month = splitted[1];
        let year = splitted[0].slice(2);
        let day = splitted[2].slice(0, 2);
        return `${month}/${day}/${year}`;
    }
    
    const background_image = { uri: 'https://hiptrip-aa-seed.s3.amazonaws.com/Growler/landingback.png' }
    const silhouette = { uri: 'https://hiptrip-aa-seed.s3.amazonaws.com/Growler/silhouette.jpg' }
    const showGrowls = growls.length ? growls.map(ele => <GrowlItem growl={ele} key={ele.id} />) : <Text>You have not growled yet.</Text>;

    const growls_length = growls.length ? <Text style={styles.growl_length}>{growls.length} growls:</Text> : null;

    debugger;

    if (!fontsLoaded || !user) {
        return <AppLoading />
    } else {
        return(
            <ImageBackground source={background_image} style={{ width: '100%', height: '100%' }}>
                <View style={styles.screen}>

                    <View style={{height: '15%'}}>
                        <Text style={styles.mainheader}>Profile</Text>
                    </View>

                    <View style={styles.header}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={styles.header_left}>
                                <Image style={styles.profile_picture} source={silhouette} />
                            </View>

                            <View style={styles.header_mid}>
                                <Text style={styles.profile_info}>Handle: <Text style={{fontWeight: 'bold'}}>@{user.handle}</Text></Text>
                                <Text style={styles.profile_info}>Email: <Text style={{ fontWeight: 'bold' }}>{user.email}</Text></Text>
                                <Text style={styles.profile_info}>Name: <Text style={{ fontWeight: 'bold' }}>{user.name}</Text></Text>
                                <Text style={styles.profile_info}>Birthday: <Text style={{ fontWeight: 'bold' }}>{DateFormat(user.birthday) || null}</Text></Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.logout_button} onPress={() => _handleLogout()}>
                            <Text style={styles.logout_button_text}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                    {growls_length}
                    <ScrollView style={styles.growlcontainer}>
                        {showGrowls}
                    </ScrollView>
                </View>


            </ImageBackground>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    growlcontainer: {
        width: '100%',
        height: '55%'
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        height: '30%',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 20,
        marginBottom: 30,
        alignItems: 'center'
    },
    screen: {
        height: '100%',
        width: '100%',
    },
    logout_button: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#663a82',
        minHeight: '30%'
    },
    logout_button_text: {
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    growl_length:{
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 10,
        marginLeft: 20
    },
    header_left:{
        padding: 10
    },
    header_mid:{
        paddingTop: 15,
        paddingBottom: 15
    },
    profile_picture: {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderColor: 'gray',
        borderWidth: 2,
        margin: 5
    },
    mainheader: {
        color: '#FFFFFF',
        fontFamily: "Lobster_400Regular",
        textAlign: 'center',
        fontSize: 70,
        marginBottom: 30
    },
    profile_info:{
        marginBottom: 3,
        color : '#FFFFFF'
    }
});