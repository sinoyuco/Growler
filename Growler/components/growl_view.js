import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, StyleSheet, View, Text, TextInput, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { fetchGrowls, postGrowl, fetchUserGrowls } from "../actions/growl_actions";
import { fetchGrowlLikes, postLike, deleteLike } from '../actions/like_actions';
import Reply from './reply.js';
import CreateReply from './create_reply.js'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPaw, faComment } from '@fortawesome/free-solid-svg-icons'
// import {} from '../actions/';


const GrowlView = (props) => {

    const dispatch = useDispatch();
    const likes = useSelector((state) => Object.values(state.likes));
    const user = useSelector((state) => state.session.user);
    const replies = useSelector((state) => state.replies);
    const growl = props.route.params.growl;

    useEffect(() => {
        dispatch(fetchGrowlLikes(growl._id));
        // dispatch(fetchReplies(growl._id));
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
            const like = { growl_id: growl._id };
            dispatch(postLike(like));
        }
    }
    debugger;

    const like_count = likes ? likes.length : 0;
    debugger;
    const paw_color = likes && likes.some((el) => el.user === user.id) ? '#ff2626' : 'black';

    const mapped_replies = replies && replies.length ? replies.map((r) => <Reply reply = {r} key={r._id}/>) : null;

    const styles = StyleSheet.create({
        div: {
            borderWidth: 1,
            borderColor: '#ebebeb',
            width: '100%',
            height: '30%',
            minHeight: 30,
            flex: 0.2,
            flexDirection: 'row',
            padding: 10,
        },
        handle: {
            fontSize: 26,
            marginLeft: 10,
            fontWeight: '700',
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
            fontSize: 24,
            marginLeft: 10
        },
        date: {
            fontSize: 14,
            color: '#D3D3D3',
        },
        left_div: {
            width: '15%',
            alignItems: 'center',
            // justifyContent: 'center',
        },
        right_div: {
            width: '85%',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        right_div_1: {
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20
            // backgroundColor: 'blue'
        },
        footer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        },
        icontext: {
            marginLeft: 5,
            fontWeight: 'bold',
            fontSize: 22
        },
        iconview: {
            paddingTop: 10,
            paddingBottom: 5,
            flex: 1,
            flexDirection: 'row'
        },
        replies_div:{
            width: '100%',
            // height: '70%',
        }
    });

    const background_image = { uri: 'https://hiptrip-aa-seed.s3.amazonaws.com/Growler/landingback.png' }
    let silhouette;
    if (growl.profileImg && growl.profileImg !== "") {
        silhouette = { uri: `http://192.168.1.44:5000/${growl.profileImg.split('/')[3]}/${growl.profileImg.split('/')[4]}` }
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
        <ImageBackground source={background_image} style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'column' }}>
            <View blurRadius={1} style={styles.div}>
                <View style={styles.left_div}>
                    <Image style={styles.profile} source={silhouette} />
                </View>

                <View style={styles.right_div}>
                    <View style={styles.right_div_1}>
                        <Text style={styles.handle}>@{growl.handle}</Text>
                        <Text style={styles.date}>{DateFormat(growl.date)}</Text>
                    </View>

                    <Text style={styles.text}>{growl.text}</Text>

                    <View style={styles.footer}>

                        <View style={styles.iconview}>
                            <TouchableOpacity onPress={() => handleLike()}>
                                <FontAwesomeIcon size={24} style={{marginLeft: 50, color: paw_color }} icon={faPaw} />
                            </TouchableOpacity>
                            <Text style={styles.icontext}>{like_count}</Text>
                        </View>

                        <View style={styles.iconview}>
                            <FontAwesomeIcon size={24} icon={faComment} />
                            <Text style={styles.icontext}>0</Text>
                        </View>

                    </View>
                </View>

            </View>
            <View style={styles.replies_div}>
                {mapped_replies}
                <CreateReply parent={growl.id}/>
            </View>
        </ImageBackground>
    )
}



export default GrowlView;