import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import AnimalList from "../components/AnimalList";

const FavoritesScreen = (props) => {
  const favAnimals = useSelector((state) => state.animals.favoriteAnimals);
  return <AnimalList listData={favAnimals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = {
  headerTitle: "Ulubione",
};

export default FavoritesScreen;
