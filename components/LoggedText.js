import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LoggedText = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={styles.txt1}>Wymagane zalogowanie</Text>
      <Text style={styles.txt1}>Proszę się zalogować</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  txt1: {
    alignSelf: "center",
    fontFamily: "open-sans",
    fontSize: 28,
    color: "#808080",
    //padding:5,
  },
});

export default LoggedText;
