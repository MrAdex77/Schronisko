import React from "react";

import AnimalList from "../components/AnimalList";
import Animals from "../data/dummy-data";

const FavoritesScreen = (props) => {
  const favouriteAnimals = Animals.filter((a) => a.id === "a1");
  return (
    <AnimalList listData={favouriteAnimals} navigation={props.navigation} />
  );
};

FavoritesScreen.navigationOptions = {
  headerTitle: "Ulubione",
};

export default FavoritesScreen;
