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
      const token = await SecureStore.getItemAsync("Googletoken");

      //console.log("token:" + token);
      if (!token) {
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
      const token2 = JSON.parse(token);
      dispatch(authActions.googleLogIn(token2));

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
