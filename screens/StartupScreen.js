import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import * as SecureStore from "expo-secure-store";
import Colors from "../constants/Colors";
import { NavigationActions, StackActions } from "react-navigation";

const StartupScreen = (props) => {
  useEffect(() => {
    const tryLogin = async () => {
      const token = JSON.parse(await SecureStore.getItemAsync("token"));
      const tokenfb = await SecureStore.getItemAsync("Facebooktoken");
      //console.log("token:" + token);
      if (!token && !tokenfb) {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: "Categories",
            }),
          ],
        });
        props.navigation.dispatch(resetAction);
        return;
      }
      if (!tokenfb) {
        //console.log("token2: " + token2);
        dispatch(authActions.googleLogIn(token));
      } else {
        dispatch(authActions.facebookLogIn(tokenfb));
      }
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "Categories",
          }),
        ],
      });
      props.navigation.dispatch(resetAction);
    };
    tryLogin();
  }, [dispatch]);

  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
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

export default StartupScreen;
