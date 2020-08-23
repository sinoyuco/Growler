import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
// import { login, logout } from '../actions/session_actions';
import { connect } from 'react-redux';
import { fetchGrowls, postGrowl, fetchUserGrowls } from "../actions/growl_actions";

export default CreateReply = props => {
    const user = useSelector(state => state.session.user);
    const newTweet = useSelector(state => state.growls.new);
    const dispatch = useDispatch();
    const [text, setText] = useState("");


    const errors = useSelector(state => state.growls.errors);

    const _handleSubmit = () => {
        debugger;
        if (user) {
            dispatch(postGrowl({ text: text, parentGrowl: props.parent }))
        }
    }

    const growl_error = errors && errors.text ? <Text style={styles.error_text}>{errors.text}</Text> : null;

    return (
        <View style={styles.main}>
            <View style={styles.input_container}>
                <TextInput
                    style={styles.textarea}
                    placeholder="Reply to this growl!"
                    placeholderTextColor="#D7D3BA"
                    onChangeText={(text) => setText(text)}
                />
                {growl_error}
            </View>

            <TouchableOpacity style={styles.button_div} onPress={() => _handleSubmit()}>
                <Text style={styles.button_text}>Growl it :)</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    textarea: {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        width: '100%',
        height: 70,
        padding: 10
    },
    main: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 40,
        padding: 10,
        marginBottom: 20,
        marginTop: 25,
    },
    button_div: {
        width: '20%',
        borderRadius: 10,
        backgroundColor: '#663a82',
        padding: 10,
        height: 40,
        alignItems: 'center'
    },
    button_text: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
    error_text: {
        position: 'absolute',
        borderWidth: 1,
        borderColor: '#FF6347',
        backgroundColor: '#FF6347',
        color: '#FFFFFF',
        bottom: -5
    },
    input_container: {
        width: '75%',
        position: 'relative',
    },

});