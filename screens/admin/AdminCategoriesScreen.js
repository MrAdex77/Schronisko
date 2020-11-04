import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView,
  ImageBackground,
} from "react-native";
import Input from "../../components/Input";

const AdminCategoriesScreen = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return <ScrollView></ScrollView>;
};

const styles = StyleSheet.create({
  category: {
    margin: 10,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AdminCategoriesScreen;
