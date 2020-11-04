import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StartupScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Podstrona statystyk!</Text>
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
