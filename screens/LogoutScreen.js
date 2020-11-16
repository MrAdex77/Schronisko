import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import * as AuthActions from "../store/actions/auth";
import { NavigationActions, StackActions ,SwitchActions} from "react-navigation";
const LogoutScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const logout = async () => {
      dispatch(AuthActions.logout());
      Alert.alert("Wylogowano!");
      // const resetAction = StackActions.reset({
      //   index: 0,
      //   actions: [
      //     NavigationActions.navigate({
      //       routeName: "Categories",
      //     }),
      //   ],
      // });
      // props.navigation.dispatch(resetAction);
      props.navigation.dispatch(SwitchActions.jumpTo({routeName:"startUp"}))
      return;
    };
    logout();
  }, [dispatch]);

  return <Text>Hello</Text>;
};

const styles = StyleSheet.create({});

export default LogoutScreen;
