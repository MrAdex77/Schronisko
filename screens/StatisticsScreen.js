import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import {
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

import Colors from "../constants/Colors";
import axios from "axios";

const StatisticsScreen = (props) => {
  // const balance = useSelector((state) => state.auth.user.balance);
  // console.log(balance);
  useEffect(() => {
    GetStatsAsync();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");

  const dane = {
    balance: 2000,
    totalSteps: 1000000,
    steps: 3000,
    rank: "MasterofDisaster",
  };
  async function GetStatsAsync() {
    try {
      const token = await SecureStore.getItemAsync("token");
      await axios
        .put("http://176.107.131.27/user/statistics/overview", { token: token })

        .then(function (response) {
          console.log("udany get moje statsy");
          console.log(response.data);

          setIsLoading(false);

          setData(response.data);

          //console.log(response)
        })
        .catch(function (error) {
          console.log("catch po axiosie pobranie  statsow");
          console.log(error);
        });
    } catch (e) {
      return { error: true };
    }
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <Text style={styles.txt2}>Dziękujemy za wsparcie! </Text>
      </View>
      <View>
        <AntDesign name='heart' size={60} color='red' />
      </View>
      <View style={styles.row}>
        <Text style={styles.txt1}>Twoje dotacje:</Text>
        <Text style={styles.txt2}>{data.balance} zł</Text>
        <FontAwesome5
          name='money-bill-wave'
          size={28}
          color={Colors.primaryColor}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.txt1}>Ogólnie:</Text>
        <Text style={styles.txt2}>{data.steps} kroków</Text>
        <FontAwesome5 name='walking' size={28} color={Colors.primaryColor} />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.txt1}>Ranga: </Text>
        <Text style={styles.txt2}>{data.rank} </Text>
        <FontAwesome5 name='medal' size={40} color={Colors.primaryColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //justifyContent: "space-evenly",
    alignItems: "center",
    margin: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 10,
  },
  line: {
    padding: 20,
    borderBottomColor: "#000000",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  line2: {
    padding: 4,
    borderTopColor: "#000000",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  txt1: {
    alignSelf: "center",
    fontFamily: "open-sans",
    fontSize: 28,
    color: "#808080",
    //padding:5,
  },
  txt2: {
    alignSelf: "center",
    fontFamily: "open-sans",
    fontSize: 28,
    fontWeight: "bold",
    color: "#808080",
    padding: 5,
    marginRight: 5,
  },
});

export default StatisticsScreen;
