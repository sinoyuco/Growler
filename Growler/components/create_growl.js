import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
// import { login, logout } from '../actions/session_actions';
import { connect } from 'react-redux';
import { fetchGrowls, postGrowl, fetchUserGrowls} from "../actions/growl_actions";



export default CreateGrowl = props => {
    const user = useSelector(state => state.session.user);
    const newTweet = useSelector(state => state.growls.new);
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const _handleSubmit = () => {
      debugger;
        if (user) {
          dispatch(postGrowl({text: text}))
                .then(dispatch(fetchGrowls()))
        }
    }
  
    return (
      <View style={styles.main}>
        <TextInput
          style={styles.textarea}
          placeholder="What's on your mind?"
          onChangeText={(text) => setText(text)}
        />
        <View style={styles.button_div}>
          <Button title="Growl it :)" onPress={() => _handleSubmit()}></Button>
        </View>
      </View>
    );
}


const styles = StyleSheet.create({
  textarea: {
    borderColor: "#FFFFFF",
    borderWidth: 1,
    width: '80%',
  },
  main:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '20%',
  },
  button_div:{
    width: '20%'
  }
});




