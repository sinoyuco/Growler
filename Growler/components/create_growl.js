import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
// import { login, logout } from '../actions/session_actions';
import { connect } from 'react-redux';
import { fetchGrowls, postGrowl, fetchUserGrowls} from "../actions/growl_actions";


<<<<<<< HEAD:Growler/components/create_growl.js
export default CreateGrowl = props => {
    const user = useSelector(state => state.session.user);
    const newTweet = useSelector(state => state.growls.new);
=======
export default growl = props => {
    const user = useSelector(state => state.session.user)
    const newGrowl = useSelector(state => state.growls.new);
>>>>>>> ed2c21fff2f7fdbd7eb359393caf1133e54758ab:Growler/components/growl.js
    const dispatch = useDispatch();
    const [text, setText] = useState("");

<<<<<<< HEAD:Growler/components/create_growl.js
    const _handleSubmit = () => {
      debugger;
        if (user) {
          dispatch(postGrowl({text: text}))
                .then(dispatch(fetchGrowls()))
        }
    }
=======
>>>>>>> ed2c21fff2f7fdbd7eb359393caf1133e54758ab:Growler/components/growl.js

    const _handleSubmit = () => {
      debugger
      if (user) {
        dispatch(postGrowl({text: text.text, user: user.id}))

      }
      }
                // .then(dispatch(fetchGrowls()))
                // .then(console.log('growled'))
        
    
 

  
    return (
      <View>
        <Text>Make a growl!</Text>
        <TextInput
          style={styles.textarea}
          placeholder="What's on your mind?"
          onChangeText={(text) => setText(text)}
        />
        <Button title="Growl it :)" onPress={() => _handleSubmit()}></Button>
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




