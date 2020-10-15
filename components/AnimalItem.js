import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DefaultText from "./DefaultText";

const AnimalItem = (props) => {
  return (
    <View style={styles.animalItem}>
      <TouchableOpacity onPress={props.onSelectAnimal}>
        <View style={{ ...styles.animalRow, ...styles.animalHeader }}>
          <View style={styles.imageContainer}>
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
        </View>
        {/* <View style={{ ...styles.animalRow, ...styles.animalDetail }}>
            <View>
              <Text numberOfLines={5}>{props.description}</Text>
            </View>
          </View> */}

        {/* <View style={{ ...styles.animalRow, ...styles.buttons }}>
            <View style={styles.like}>
              <FontAwesome name='heart-o' size={40} color='white' />
            </View>
            <View style={styles.details}>
              <FontAwesome name='info-circle' size={40} color='white' />
            </View>
          </View> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  animalRow: {
    flexDirection: "row",
  },
  animalItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 10,
    borderRadius: 150,
    backgroundColor: "white",
    height: 300,
    margin: 20,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  animalHeader: {
    height: "100%",
  },
  animalDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "30%",
    backgroundColor: "white",
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
