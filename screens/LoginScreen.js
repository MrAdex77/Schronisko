import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as Google from "expo-google-app-auth";

async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      behavior: "web",
      iosClientId: IOS_CLIENT_ID,
      //androidClientId: AND_CLIENT_ID,
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
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
      <Button
        style={{ width: 392, height: 248 }}
        size={20}
        onPress={() => {
          signInWithGoogle();
        }}
        title="Sign in"
      />
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
