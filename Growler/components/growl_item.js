import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import { fetchGrowls, postGrowl, fetchUserGrowls} from "../actions/growl_actions";
// import {} from '../actions/';


const GrowlItem = (props) => {

    const dispatch = useDispatch();


    return(
        <View>
            <Text>{props.growl.text}</Text>
        </View>
    )
}

export default GrowlItem;