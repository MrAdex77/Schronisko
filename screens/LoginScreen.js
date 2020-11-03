import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as Google from "expo-google-app-auth";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import * as SecureStore from "expo-secure-store";

async function signInWithGoogleAsync() {
  try {
    //id "999814744000-7q3re9n2b6rcq2gi1o2p81drn6je7rcu.apps.googleusercontent.com";
    const result = await Google.logInAsync({
      behavior: "web",
      //iosClientId: IOS_CLIENT_ID,
      androidClientId:
        "299847310816-epv8kb1rf2oc205ri1aqg20dv1ff8tq6.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });

    // web  299847310816-vc55jckp0jqbioah4fv37vcv4pn9oiuh.apps.googleusercontent.com
    // android 299847310816-epv8kb1rf2oc205ri1aqg20dv1ff8tq6.apps.googleusercontent.com

    if (result.type === "success") {
      const response = await fetch(`http://mateuszdobosz.site/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: result.idToken,
        }),
      });

      if (!response.ok) {
        console.log("blad");
        console.log(response.status);
        throw new Error("Something went wrong!");
      }
      Alert.alert("Zalogowano", result.user.email + "\n" + result.user.name);
      const resData = await response.json();
      console.log(resData);
      await SecureStore.setItemAsync("token", JSON.stringify(resData.token));
      //return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}
const LoginScreen = (props) => {
  const signInWithGoogle = () => {
    signInWithGoogleAsync();
  };
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);

  return (
    <View style={styles.screen}>
      <FontAwesome.Button
        name='google'
        backgroundColor={Colors.primaryColor}
        onPress={() => {
          signInWithGoogle();
        }}>
        Login with Google
      </FontAwesome.Button>
      {/* <Button
        style={{ width: 392, height: 248 }}
        size={20}
        onPress={() => {
          signInWithGoogle();
        }}
        title="Sign in"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
