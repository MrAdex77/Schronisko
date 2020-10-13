import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Animals from "../data/dummy-data";

const AnimalDetailScreen = (props) => {
  const animalId = props.navigation.getParam("animalId");

  const selectedAnimal = Animals.find((x) => x.id === animalId);
  return (
    <View style={styles.screen}>
      <Text>{selectedAnimal.title}</Text>
    </View>
  );
};

AnimalDetailScreen.navigationOptions = (navigationData) => {
  const animalId = navigationData.navigation.getParam("animalId");
  const selectedAnimal = Animals.find((x) => x.id === animalId);
  return {
    headerTitle: selectedAnimal.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AnimalDetailScreen;
