import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, ActivityIndicator,Image, Alert } from "react-native";
import {
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import RankItem from "../components/NewsItem";

import Colors from "../constants/Colors";
import axios from "axios";

const StatisticsScreen = (props) => {
  // const balance = useSelector((state) => state.auth.user.balance);
  // console.log(balance);
  const ranks =[
    "ranga1",
    "ranga2",
    "ranga3",
    "ranga4",
    "ranga5",
    "ranga6",
  ];
const rankImgPicker = rank => {
    switch (rank) {
      case ranks[0]:
        return 1;

      case ranks[1]:
        return 2;

      case ranks[2]:
        return 3;

      case ranks[3]:
        return 4;

      case ranks[4]:
        return 5;

      case ranks[5]:
        return 6;

      default: {
        return 1;
      }

    }
  };

  // const rankImgPicker = rank => {
  //   switch (rank) {
  //     case ranks[0]:
  //       return '../img/r1.png';

  //     case ranks[1]:
  //       return '../img/r2.png';

  //     case ranks[2]:
  //       return '../img/r3.png';

  //     case ranks[3]:
  //       return '../img/r4.png';

  //     case ranks[4]:
  //       return '../img/r5.png';

  //     case ranks[5]:
  //       return '../img/r6.png';

  //     default: {
  //       return '../img/r1.png';
  //     }

  //   }
  // };
  


  useEffect(() => {
    GetStatsAsync();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
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
          
          
          
        })
        .catch(function (error) {
          console.log("catch po axiosie pobranie  statsow");
         
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
        {/* <FontAwesome5 name='medal' size={40} color={Colors.primaryColor} /> */}
      </View>
      <View>
          {/* <RankItem rank={data.ranknumber}/> */}
          {!data && (
            <Image
              style={styles.tinyLogo}
              source={require('../img/r1.png')}
            />
          )}
          {data && <RankItem rank={rankImgPicker(data.rank)}/>}
          {/* <Image style={styles.tinyLogo}  source={require('../img/r'+data.ranknumber+'.png')}      /> */}
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
  tinyLogo: {
    marginTop:20,
    width: 120,
    height: 120,
  },
});

export default StatisticsScreen;
