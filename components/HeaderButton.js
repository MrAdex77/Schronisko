import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primaryColor}
    />
  );
};
export const FontAwesomeHeaderButton = (props) => (
  // the `props` here come from <Item ... />
  // you may access them and pass something else to `HeaderButton` if you like
  <HeaderButton
    IconComponent={FontAwesome5}
    iconSize={23}
    color={Platform.OS === "android" ? "white" : Colors.primaryColor}
    {...props}
  />
);
export default CustomHeaderButton;
