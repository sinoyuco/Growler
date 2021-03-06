import React, { Component } from 'react';
import { Button, StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/dev";
import { AppLoading } from 'expo';

const background_image = { uri: 'https://hiptrip-aa-seed.s3.amazonaws.com/Growler/landingback.png'}
const tiger_image = { uri: 'https://hiptrip-aa-seed.s3.amazonaws.com/Growler/tiger.png' }

const LandingScreen = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        Lobster_400Regular
    });

    if(!fontsLoaded){
        return <AppLoading/>
    }else{
    return (
        <ImageBackground source={background_image} style={{ width: '100%', height: '100%' }}>
        <View styles={styles.main}>
            <Text style={styles.welcome}>Welcome to</Text>
            <Text style={styles.mainheader}>Growler</Text>

            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 50, marginBottom: 50}}>
                <Image source={tiger_image} style={styles.tiger}/>
            </View>
            
            <View style={{width: '100%', alignContent: 'center', alignItems:'center'}}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('Login')
                    }
                    style={styles.start_growling}
                >
                    <Text style={styles.start_growling_text}>Start Growling</Text>
                </TouchableOpacity>
            </View>
            {/* <Text><div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div></Text> */}
        </View>
        </ImageBackground>
    );
  };
}


const styles = StyleSheet.create({
   welcome:{
        color: '#FFFFFF',
        fontFamily: "Lobster_400Regular",
        textAlign: 'center',
        marginTop: 150,
        fontSize: 30
   },
   mainheader:{
       color: '#FFFFFF',
       fontFamily: "Lobster_400Regular",
       textAlign: 'center',
       fontSize: 70
   },
   tiger:{
        width: 250,
        height: 250,
        alignContent: 'center'
   },
    main:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    start_growling:{
        padding: 10,
        width: '30%',
        borderRadius: 10,
        backgroundColor: '#663a82',
    },
    start_growling_text:{
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center'
    }
});


export default LandingScreen;