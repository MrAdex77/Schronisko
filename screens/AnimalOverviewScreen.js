import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { CATEGORIES } from "../data/categories-data";
import AnimalItem from "../components/AnimalItem";
import Animals from "../data/dummy-data";
const AnimalOverviewScreen = (props) => {
  const renderAnimalItem = (itemData) => {
    return (
      <AnimalItem
        title={itemData.item.title}
        age={itemData.item.age}
        description={itemData.item.description}
        image={itemData.item.imageUrl}
        onSelectMeal={() => {}}
      />
    );
  };
  const catId = props.navigation.getParam("categoryId");

  const displayedAnimals = Animals;
  //const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return (
    <View style={styles.screen}>
      <FlatList data={displayedAnimals} renderItem={renderAnimalItem} />
    </View>
  );
};

AnimalOverviewScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");

  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AnimalOverviewScreen;
