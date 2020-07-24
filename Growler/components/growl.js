import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
// import { login, logout } from '../actions/session_actions';
import { connect } from 'react-redux';
import { fetchGrowls, postGrowl } from "../actions/growl_actions";


export default growl = props => {
    const user = useSelector(state => state.session.user);
    const newTweet = useSelector(state => state.growls.new);
    const dispatch = useDispatch();
    const [text, setText] = useState({text: ""});

    const _updateText = text => {
        setText({text: text})
    }

    const _handleSubmit = () => {
        dispatch(postGrowl(text))
    }

    return (
      <View>
        <Text>Make a growl!</Text>
        <TextInput
          style={styles.textarea}
          placeholder="What's on your mind?"
          onChangeText={_updateText}
        />
        <Button title="Growl it :)" onPress={_handleSubmit}></Button>
      </View>
    );
}


const styles = StyleSheet.create({
  textarea: {
    height: 140,
    borderColor: "gray",
    borderWidth: 1,
  },
});




