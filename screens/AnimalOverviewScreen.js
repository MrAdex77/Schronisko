import React from "react";
import { useSelector } from "react-redux";
import { CATEGORIES } from "../data/categories-data";

import AnimalList from "../components/AnimalList";
const AnimalOverviewScreen = (props) => {
  const catId = props.navigation.getParam("categoryId");

  const availableAnimals = useSelector((state) => state.animals.animals);

  const displayedAnimals = availableAnimals;
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
