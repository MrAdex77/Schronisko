import React from "react";
import { View, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import AnimalList from "../components/AnimalList";
import DefaultText from "../components/DefaultText";
import HeaderButton from "../components/HeaderButton";

const FavoritesScreen = (props) => {
  const favAnimals = useSelector((state) => state.animals.favoriteAnimals);

  if (favAnimals.length === 0 || !favAnimals) {
    return (
      <View style={styles.content}>
        <DefaultText>Nie znaleziono ulubionych, dodaj jakies!</DefaultText>
      </View>
    );
  }

  return <AnimalList listData={favAnimals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = {
  headerTitle: "Ulubione",
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoritesScreen;
