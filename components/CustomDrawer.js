import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../constants/Colors";

const CustomDrawer = (props) => {
  const UserBalance = useSelector((state) => state.auth.user.balance);
  //const UserId = useSelector((state) => state.users.user.id);
  const UserName = useSelector((state) => state.auth.user.name);
  const Picture = useSelector((state) => state.auth.user.picture);
  const name = UserName.substr(0, UserName.indexOf(" "));
  //console.log("name: " + name);
  //console.log(Picture);
  //console.log("username: " + UserName + " userBalance: " + UserBalance);

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.Header}>
          {!Picture && (
            <Image
              style={styles.image}
              source={require("../assets/user.png")}
            />
          )}
          {Picture && <Image style={styles.image} source={{ uri: Picture }} />}
          <View style={styles.textCotainer}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.points}>{UserBalance} punktów</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: Colors.primaryColor,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
  },
  Header: {
    flexDirection: "row",
    padding: 20,
    width: "100%",
  },
  textCotainer: {
    flexShrink: 1,
    paddingLeft: 10,
    paddingVertical: 20,
    flexDirection: "column",
    width: 150,
  },
  title: {
    fontSize: 24,
  },
});

export default CustomDrawer;
