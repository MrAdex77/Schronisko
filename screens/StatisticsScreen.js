import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

const StatisticsScreen = (props) => {
  const balance = useSelector((state) => state.auth.user.balance);
  console.log(balance);
  return (
    <View style={styles.screen}>
      <Text>Podstrona statystyk!</Text>
      <Text>Przelane pieniądze na schronisko: {balance}</Text>
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

export default StatisticsScreen;
