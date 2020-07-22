import React, { Component, useState, useReducer } from 'react';
import {useSelector, useDispatch} from 'react-redux';
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import {login} from '../actions/session_actions';
import { connect } from 'react-redux';



// export const Login = () => {

//     const initialLogin = {email: '', password: ''};
//     const [user, setUser] = useState(initialLogin);
    
//     const dispatch = useDispatch();

    
//     const _onPressButton = () => {
//         dispatch(login(this.state)).then(() => alert('logged in'));
//     }

//         return(
//             <View>
//                 <Text>This is the login screen.</Text>
//                 <TextInput
//                         style={styles.input}
//                         placeholder="Email"
//                         onChangeText={user => setUser('email')}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Password"
//                     onChangeText={user => setUser('password')}
//                 />
//                 <Button
//                     onPress={_onPressButton()}
//                     title="Login"
//                     color="#841584"
//                 />
//             </View>
//         );
// }

class Login extends Component{
    constructor(props){
        super(props);
        this.state={email: '', password: ''}
        this._onPressButton = this._onPressButton.bind(this);
        this._updateEmail = this._updateEmail.bind(this);
        this._updatePassword = this._updatePassword.bind(this);
    }

    _onPressButton(){
        debugger;
        this.props.login(this.state);
    }

    _updateEmail(text){
        this.setState({ email: text })
    }

    _updatePassword(text){
        this.setState({password: text})
    }

    render(){
        return (
            <View>
                <Text>This is the login screen.</Text>
                <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={this._updateEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={this._updatePassword}
                />
                <Button
                    onPress={this._onPressButton}
                    title="Login"
                    color="#841584"
                />
            </View>
        );
    }

}

// export default Login;

const mSTP = (state) =>({

});

const mapDispatchToProps = (dispatch) => {
    debugger;
    return{
    login: user => dispatch(login(user))
    }
}

export default connect(mSTP, mapDispatchToProps)(Login);


const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    }
});


