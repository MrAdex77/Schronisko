import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SignUpOnWalkScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Zapisz sie na spacer Screen!</Text>
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

export default SignUpOnWalkScreen;
