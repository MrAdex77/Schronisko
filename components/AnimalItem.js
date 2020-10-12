import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const AnimalItem = (props) => {
  return (
    <View style={styles.animalItem}>
      <TouchableOpacity onPress={props.onSelectAnimal}>
        <View>
          <View style={{ ...styles.animalRow, ...styles.animalHeader }}>
            <ImageBackground
              source={{ uri: props.image }}
              style={styles.bgImage}>
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.animalRow, ...styles.animalDetail }}>
            <View>
              <Text numberOfLines={5}>{props.description}</Text>
            </View>
          </View>
          <View style={{ ...styles.animalRow, ...styles.buttons }}>
            <View style={styles.like}>
              <FontAwesome name='heart-o' size={40} color='white' />
            </View>
            <View style={styles.details}>
              <FontAwesome name='info-circle' size={40} color='white' />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  animalRow: {
    flexDirection: "row",
  },
  animalItem: {
    height: 600,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  like: {
    alignItems: "center",
    backgroundColor: "pink",
    width: "50%",
  },
  details: {
    alignItems: "center",
    backgroundColor: "green",
    width: "50%",
  },
  animalHeader: {
    height: "63%",
  },
  animalDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "30%",
    backgroundColor: "white",
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    height: "7%",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});

export default AnimalItem;
