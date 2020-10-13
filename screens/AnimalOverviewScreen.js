import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { CATEGORIES } from "../data/categories-data";
import AnimalItem from "../components/AnimalItem";
import Animals from "../data/dummy-data";
import AnimalList from "../components/AnimalList";
const AnimalOverviewScreen = (props) => {
  const catId = props.navigation.getParam("categoryId");

  const displayedAnimals = Animals;
  //const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return (
    <AnimalList listData={displayedAnimals} navigation={props.navigation} />
  );
};

AnimalOverviewScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");

  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};

export default AnimalOverviewScreen;
