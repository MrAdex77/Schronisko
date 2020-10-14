import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Animals from "../data/dummy-data";
import HeaderButton from "../components/HeaderButton";

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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Favorite'
          iconName='ios-star'
          onPress={() => {
            console.log("marked as fav!");
          }}
        />
      </HeaderButtons>
    ),
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
