import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector, UseSelector } from "react-redux";
import AnimalItem from "./AnimalItem";

const AnimalList = (props) => {
  const FavAnimals = useSelector((state) => state.animals.favoriteAnimals);
  const renderAnimalItem = (itemData) => {
    const isFavorite = FavAnimals.some(
      (animal) => animal.id === itemData.item.id
    );
    return (
      <AnimalItem
        title={itemData.item.title}
        age={itemData.item.age}
        description={itemData.item.description}
        image={itemData.item.imageUrl}
        onSelectAnimal={() => {
          props.navigation.navigate({
            routeName: "AnimalDetail",
            params: {
              animalId: itemData.item.id,
              animalTitle: itemData.item.title,
              isFav: isFavorite,
            },
          });
        }}>
        {props.children}
      </AnimalItem>
    );
  };
  return (
    <View style={styles.list}>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={props.listData}
        renderItem={renderAnimalItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AnimalList;
