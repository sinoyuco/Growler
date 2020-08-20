import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { fetchGrowlLikes, postLike, deleteLike } from '../actions/like_actions';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPaw, faComment } from '@fortawesome/free-solid-svg-icons'

// import {} from '../actions/';


const Reply = (props) => {
    debugger;
    const dispatch = useDispatch();
    const likes = useSelector((state) => Object.values(state.likes));
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(fetchGrowlLikes(props.growl._id));
    }, []);

    const handleLike = () => {
        let already_liked = false;
        let already_liked_growl;
        likes.forEach((ele) => {
            debugger;
            if (ele.user === user.id) {
                already_liked = true;
                already_liked_growl = ele._id;
            }
        });

        if (already_liked) {
            dispatch(deleteLike(already_liked_growl));
        } else {
            const like = { growl_id: props.growl._id };
            dispatch(postLike(like));
        }
    }

    const like_count = likes ? likes.length : 0;
    debugger;
    const paw_color = likes && likes.some((el) => el.user === user.id) ? '#ff2626' : 'black';


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
        handle: {
            fontSize: 20,
            marginLeft: 10,
            fontWeight: '700'
        },
        profile: {
            width: 40,
            height: 40,
            borderRadius: 100,
            borderColor: 'gray',
            borderWidth: 2,
            margin: 5
        },
        text: {
            color: '#FFFFFF',
            fontSize: 18,
            marginLeft: 10
        },
        date: {
            fontSize: 14,
            color: '#D3D3D3'
        },
        left_div: {
            width: '15%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        right_div: {
            width: '85%'
        },
        right_div_1: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        footer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        },
        icontext: {
            marginLeft: 5,
            fontWeight: 'bold'
        },
        iconview: {
            paddingTop: 10,
            paddingBottom: 5,
            flex: 1,
            flexDirection: 'row'
        }
    });

    let silhouette;
    if (props.growl.profileImg && props.growl.profileImg !== "") {
        silhouette = { uri: `http://192.168.1.44:5000/${props.growl.profileImg.split('/')[3]}/${props.growl.profileImg.split('/')[4]}` }
    } else {
        silhouette = { uri: 'https://hiptrip-aa-seed.s3.amazonaws.com/Growler/silhouette.jpg' }
    }


    const DateFormat = (dateString) => {
        let splitted = dateString.split('-');
        let month = splitted[1];
        let year = splitted[0].slice(2);
        let day = splitted[2].slice(0, 2);
        let time = splitted[2].slice(3, 8);
        return `${month}/${day}/${year}, ${time}`;
    }
    debugger;
    return (
        <TouchableOpacity onPress={() => navigateToTweet(props.growl)}>
            <View blurRadius={1} style={styles.div}>
                <View style={styles.left_div}>
                    <Image style={styles.profile} source={silhouette} />
                </View>

                <View style={styles.right_div}>
                    <View style={styles.right_div_1}>
                        <Text style={styles.handle}>@{props.growl.handle}</Text>
                        <Text style={styles.date}>{DateFormat(props.growl.date)}</Text>
                    </View>

                    <Text style={styles.text}>{props.growl.text}</Text>

                    <View style={styles.footer}>

                        <View style={styles.iconview}>
                            <TouchableOpacity onPress={() => handleLike()}>
                                <FontAwesomeIcon style={{ marginLeft: 50, color: paw_color }} icon={faPaw} />
                            </TouchableOpacity>
                            <Text style={styles.icontext}>{like_count}</Text>
                        </View>

                        <View style={styles.iconview}>
                            <FontAwesomeIcon icon={faComment} />
                            <Text style={styles.icontext}>0</Text>
                        </View>

                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )
}



export default GrowlItem;