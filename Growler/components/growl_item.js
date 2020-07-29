import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {bindActionCreators} from 'redux';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
// import { login, logout } from '../actions/session_actions';
import { connect } from 'react-redux';
import { fetchGrowls, postGrowl, fetchUserGrowls} from "../actions/growl_actions";
