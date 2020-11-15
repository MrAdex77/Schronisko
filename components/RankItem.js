import React from "react";
import { StyleSheet,Image,View} from "react-native";

import Colors from "../constants/Colors";







const RankItem= (props) => {
  console.log("rankitem "+props.rank);
  return (
    <View>
      <Image style={styles.tinyLogo}  source={require('../img/r'+props.rank+'.png')}      />
    </View>
  );
};

const styles = StyleSheet.create({
  
    tinyLogo: {
      marginTop:20,
      width: 120,
      height: 120,
    },
  });

export default RankItem;
