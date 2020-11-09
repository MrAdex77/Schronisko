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
import * as Facebook from "expo-facebook";
import axios from "axios";

import * as SecureStore from "expo-secure-store";
import * as AuthActions from "../store/actions/auth";

async function signInWithFacebookAsync() {
  try {
    await Facebook.initializeAsync({
      appId: "652089999027908",
    });
    const {
      type,
      token,
      expirationDate,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      behavior: "web",
      permissions: ["public_profile"],
    });
    if (type === "success") {
      axios
        .post("http://176.107.131.27:5000/auth/facebook", {
          token: token,
        })

        .then(async function (response) {
          console.log(JSON.stringify(response.data.token));
          await SecureStore.setItemAsync("tokenfb", response.data.token);
          //console.log(response.data)
          // console.log(JSON.stringify(response))
        })
        .catch(function (error) {
          console.log("catch po axiosie");
          console.log(error);
        });

      //const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      // console.log('zalogowano', `Witaj ${(await response.json()).name}!`);
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}

const LoginScreen = (props) => {
  const dispatch = useDispatch();

  const signInWithFacebook = () => {
    signInWithFacebookAsync();
  };

  const userEmail = useSelector((state) => state.auth.user);

  const signInWithGoogleAsync = async () => {
    //useKeepAwake();
    await dispatch(AuthActions.signInWithGoogleAsync());
    console.log(userEmail);
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
          signInWithFacebook();
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
});

export default LoginScreen;
