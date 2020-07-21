import React, { Component } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';

const LandingScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Welcome to Growler.</Text>
            <Button
                title="Start Growling"
                onPress={() =>
                    navigation.navigate('Login')
                }
            />
        </View>
    );
};

export default LandingScreen;