import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as Google from "expo-google-app-auth";
import { FontAwesome } from "@expo/vector-icons";

async function signInWithGoogleAsync() {
  try {
    //id: 999814744000-k4m11cn6q7diiur0ltk78ccoe9bgg18a.apps.googleusercontent.com
    const result = await Google.logInAsync({
      behavior: "web",
      //iosClientId: IOS_CLIENT_ID,
      androidClientId:
        "999814744000-k4m11cn6q7diiur0ltk78ccoe9bgg18a.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });

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
        name="google"
        backgroundColor="#3b5998"
        onPress={() => {
          signInWithGoogle();
        }}
      >
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
