import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import AnimalList from "../components/AnimalList";
import HeaderButton from "../components/HeaderButton";

const FavoritesScreen = (props) => {
  const favAnimals = useSelector((state) => state.animals.favoriteAnimals);
  return <AnimalList listData={favAnimals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = {
  headerTitle: "Ulubione",
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

export default FavoritesScreen;
