import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Google from "expo-google-app-auth";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useKeepAwake } from "expo-keep-awake";
import Colors from "../constants/Colors";
import {
  SwitchActions,
  NavigationActions,
  StackActions,
} from "react-navigation";

//import * as Facebook from "expo-facebook";
//import axios from "axios";

import * as SecureStore from "expo-secure-store";
import * as AuthActions from "../store/actions/auth";

const LoginScreen = (props) => {
  const dispatch = useDispatch();

  const signInWithGoogleAsync = async () => {
    //useKeepAwake();

    await dispatch(AuthActions.signInWithGoogleAsync());

    //console.log(userEmail);
  };

  const signInWithFacebookAsync = async () => {
    await dispatch(AuthActions.signInWithFacebookAsync());
    Alert.alert("Witaj!", "Pomyślnie zalogowano", [
      {
        text: "Ok",
        style: "default",
        onPress: () => {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: "Categories",
              }),
            ],
          });
          props.navigation.dispatch(resetAction);
        },
      },
    ]);
  };

  return (
    <ImageBackground source={require("../img/dog.png")} style={styles.image}>
      <Text style={styles.text1}>Witaj !</Text>
      <FontAwesome5 name='users' size={150} color='white' />
      <View style={styles.space1} />
      <FontAwesome.Button
        name='facebook'
        backgroundColor='#3b5998'
        onPress={() => {
          signInWithFacebookAsync();
        }}>
        Zaloguj z Facebook
      </FontAwesome.Button>

      <View style={styles.space} />

      <FontAwesome.Button
        name='google'
        backgroundColor='#dd4b39'
        onPress={() => {
          signInWithGoogleAsync();
        }}>
        Zaloguj z Google
      </FontAwesome.Button>

      <View style={styles.space} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  space1: {
    width: 20,
    height: 40,
  },
  space: {
    width: 20,
    height: 20,
  },
  text1: {
    color: "#FFFFFF",
    fontSize: 60,
  },
  txt1: {
    alignSelf: "center",
    fontFamily: "open-sans",
    fontSize: 28,
    color: "#808080",
    padding: 5,
    margin: 5,
  },
});

export default LoginScreen;
