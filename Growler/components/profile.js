import React, { Component, useState, useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/dev";
import { AppLoading } from 'expo';
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { logout, updatePhoto } from '../actions/session_actions';
import { fetchUserGrowls } from '../actions/growl_actions';
import GrowlItem from './growl_item'
import * as ImagePicker from 'expo-image-picker';

export default Profile = ({navigation}) => {

    let [fontsLoaded] = useFonts({
        Lobster_400Regular
    });


    const growls = useSelector((state) => Object.values(state.growls.user));
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const [selectedImage, setSelectedImage] = useState(null);
    
    
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

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }
        // setSelectedImage({ localUri: pickerResult.uri });
        // debugger;

        let formData = new FormData();
        formData.append('photo', {uri: pickerResult.uri, filename: `${Math.floor(Math.random()*1000000)}photo`, type: pickerResult.type});

        dispatch(updatePhoto(user.id, formData));
    };
    
    
    const background_image = { uri: 'http://hiptrip-aa-seed.s3.amazonaws.com/Growler/landingback.png' }

    let silhouette;
    debugger;
    if (user && user.profileImg && user.profileImg !== "") {
        silhouette = { uri: `http://192.168.1.44:5000/${user.profileImg.split('/')[3]}/${user.profileImg.split('/')[4]}` }
    } else {
        silhouette = { uri: 'https://hiptrip-aa-seed.s3.amazonaws.com/Growler/silhouette.jpg' }
    }

    const showGrowls = growls.length ? growls.map(ele => <GrowlItem growl={ele} key={ele.id} />) : <Text>You have not growled yet.</Text>;

    const growls_length = growls.length ? <Text style={styles.growl_length}>{growls.length} growls:</Text> : null;


    if (!fontsLoaded || !user) {
        return <AppLoading />
    } else {
        return(
            <ImageBackground source={background_image} style={{ width: '100%', height: '100%' }}>
                <View style={styles.screen}>

                    <View style={{height: '15%', position: 'relative'}}>
                        <Text style={styles.mainheader}>Profile</Text>
                    </View>

                    <View style={styles.header}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={styles.header_left}>
                                    <TouchableOpacity onPress={openImagePickerAsync} style={{position: 'relative'}}>
                                        <Image style={styles.profile_picture} source={silhouette} />
                                    <View style={styles.plus_icon}><Text style={styles.plus_icon_text}>+</Text></View>
                                    </TouchableOpacity>
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
        padding: 30,
        borderRadius: 30,
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
    },
    plus_icon:{
        position: 'absolute',
        backgroundColor: '#7b7b7b',
        height: 20,
        width: 20,
        borderRadius: 10,
        right: 6,
        bottom: 6,
    },
    plus_icon_text:{
        textAlign: 'center',
        color: '#FFFFFF'
    }
});