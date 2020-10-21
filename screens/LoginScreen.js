import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as Google from "expo-google-app-auth";
import { FontAwesome } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import Colors from "../constants/Colors";

async function signInWithGoogleAsync() {
  try {
    //id "999814744000-7q3re9n2b6rcq2gi1o2p81drn6je7rcu.apps.googleusercontent.com";
    const result = await Google.logInAsync({
      behavior: "web",
      //iosClientId: IOS_CLIENT_ID,
      androidClientId:
        "999814744000-7q3re9n2b6rcq2gi1o2p81drn6je7rcu.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });
    // const googleWebAppId =
    //   "299847310816-vc55jckp0jqbioah4fv37vcv4pn9oiuh.apps.googleusercontent.com";
    // const redirectUrl = "http://176.107.131.27:5000/auth/google";
    // const result = await AuthSession.startAsync({
    //   authUrl:
    //     `https://accounts.google.com/o/oauth2/v2/auth?` +
    //     `&client_id=${googleWebAppId}` +
    //     `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
    //     `&response_type=code` +
    //     `&access_type=offline` +
    //     `&scope=profile`,
    // });

    if (result.type === "success") {
      Alert.alert("Zalogowano", result.user.email + "\n" + result.user.name);
      return result.accessToken;
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
