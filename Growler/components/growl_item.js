import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, StyleSheet, View, Text, TextInput, Image } from 'react-native';
import { fetchGrowls, postGrowl, fetchUserGrowls} from "../actions/growl_actions";
// import {} from '../actions/';


const GrowlItem = (props) => {

    const dispatch = useDispatch();



    const styles = StyleSheet.create({
        div: {
            borderWidth: 1,
            borderColor: '#ebebeb',
            width: '100%',
            minHeight: 30,
            flex: 1,
            flexDirection: 'row',
            padding: 10
        },
        handle:{
            fontSize: 20,
            marginLeft: 10,
            fontWeight: '700'
        },
        profile:{
            width: 40,
            height: 40,
            borderRadius: 100,
            borderColor: 'gray',
            borderWidth: 2,
            margin: 5
        },
        text:{
            color: '#FFFFFF',
            fontSize: 18,
            marginLeft: 10
        },
        date:{
            fontSize: 14,
            color: '#D3D3D3'
        },
        left_div:{
            width: '15%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        right_div:{
            width: '85%'
        },
        right_div_1:{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
        }
    });

    let silhouette;
    debugger;
    if(props.growl.profileImg && props.growl.profileImg!==""){
        silhouette = {uri: `http://192.168.1.44:5000/${props.growl.profileImg.split('/')[3]}/${props.growl.profileImg.split('/')[4]}`}
    }else{
        silhouette = {uri: 'https://hiptrip-aa-seed.s3.amazonaws.com/Growler/silhouette.jpg'}
    }


    const DateFormat = (dateString) => {
        let splitted = dateString.split('-');
        let month = splitted[1];
        let year = splitted[0].slice(2);
        let day = splitted[2].slice(0,2);
        let time = splitted[2].slice(3,8);
        return `${month}/${day}/${year}, ${time}`;
    }

    return(
        <View blurRadius={1} style={styles.div}>
            <View style={styles.left_div}>
                <Image style={styles.profile} source={silhouette}/>
            </View>

            <View style={styles.right_div}>
                <View style={styles.right_div_1}>
                    <Text style={styles.handle}>@{props.growl.handle}</Text>
                    <Text style={styles.date}>{DateFormat(props.growl.date)}</Text>
                </View>
                
                <Text style={styles.text}>{props.growl.text}</Text>
            </View>
        </View>
    )
}



export default GrowlItem;