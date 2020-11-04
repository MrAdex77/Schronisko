import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import * as Google from "expo-google-app-auth";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import Colors from "../constants/Colors";

import * as Facebook from "expo-facebook";
import axios from "axios";

import * as SecureStore from "expo-secure-store";
import * as AuthActions from "../store/actions/auth";

async function signInWithGoogleAsync() {
  // try {
  //   //id "999814744000-7q3re9n2b6rcq2gi1o2p81drn6je7rcu.apps.googleusercontent.com";
  //   const result = await Google.logInAsync({
  //     behavior: "web",
  //     //iosClientId: IOS_CLIENT_ID,
  //     androidClientId:
  //       "299847310816-epv8kb1rf2oc205ri1aqg20dv1ff8tq6.apps.googleusercontent.com",
  //     scopes: ["profile", "email"],
  //   });
  //   // web  299847310816-vc55jckp0jqbioah4fv37vcv4pn9oiuh.apps.googleusercontent.com
  //   // android 299847310816-epv8kb1rf2oc205ri1aqg20dv1ff8tq6.apps.googleusercontent.com
  //   if (result.type === "success") {
  //     const response = await fetch(`http://mateuszdobosz.site/auth/google`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         token: result.idToken,
  //       }),
  //     });
  //     if (!response.ok) {
  //       console.log("blad");
  //       console.log(response.status);
  //       throw new Error("Something went wrong!");
  //     }
  //     Alert.alert("Zalogowano", result.user.email + "\n" + result.user.name);
  //     const resData = await response.json();
  //     console.log(resData);
  //     await SecureStore.setItemAsync("token", JSON.stringify(resData.token));
  //     //return result.accessToken;
  //   } else {
  //     return { cancelled: true };
  //   }
  // } catch (e) {
  //   return { error: true };
  // }
}
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

        .then(function (response) {
          console.log(JSON.stringify(response.data));
          console.log(response);
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

  const signInWithGoogle = () => {
    signInWithGoogleAsync();
  };
  const signInWithFacebook = () => {
    signInWithFacebookAsync();
  };
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);

  return (
    <ImageBackground source={require("../img/dog.png")} style={styles.image}>
      <Text style={styles.text1}>Witaj !</Text>
      <FontAwesome5 name="users" size={150} color="white" />
      <View style={styles.space1} />
      <FontAwesome.Button
        name="facebook"
        backgroundColor="#3b5998"
        onPress={() => {
          signInWithFacebook();
        }}
      >
        Zaloguj z Facebook
      </FontAwesome.Button>

      <View style={styles.space} />

      <FontAwesome.Button
        name="google"
        backgroundColor="#dd4b39"
        onPress={() => {
          dispatch(AuthActions.signInWithGoogleAsync());
        }}
      >
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
