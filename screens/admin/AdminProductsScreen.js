import React from "react";
import { FlatList, Button, Platform, View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AntDesign } from "@expo/vector-icons";

import HeaderButton from "../../components/HeaderButton";
import AnimalList from "../../components/AnimalList";
import Colors from "../../constants/Colors";
import * as animalsActions from "../../store/actions/animals";

const AdminProductsScreen = (props) => {
  const animals = useSelector((state) => state.animals.animals);
  const dispatch = useDispatch();

  return (
    <AnimalList
      listData={animals}
      keyExtractor={(item) => item.id}
      navigation={props.navigation}
      onSelect={() => {}}>
      <View style={styles.button1}>
        {/* <Button color={Colors.primaryColor} title='Edit' onPress={() => {}} /> */}
        <AntDesign name='edit' size={35} color='white' />
      </View>
      <View style={styles.button2}>
        {/* <Button color={Colors.primaryColor} title='Delete' onPress={() => {}} /> */}
        <AntDesign name='delete' size={35} color='white' />
      </View>
    </AnimalList>
  );
};

AdminProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Twoje zwierzęta",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  button1: {
    position: "absolute",
    top: 10,
    left: "4%",
    width: 41,
    height: 41,
    zIndex: 1,
    backgroundColor: Colors.primaryColor,
    borderRadius: 20,
    alignItems: "center",
  },
  button2: {
    position: "absolute",
    top: 10,
    left: "80%",
    right: "4%",
    zIndex: 1,
    width: 41,
    height: 41,
    backgroundColor: Colors.primaryColor,
    borderRadius: 20,
    alignItems: "center",
  },
});
export default AdminProductsScreen;
