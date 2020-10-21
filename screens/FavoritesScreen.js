import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";
import HeaderButton from "../components/HeaderButton";
import AnimalItem from "../components/AnimalItem";

const FavoritesScreen = (props) => {
  const favAnimals = useSelector((state) => state.animals.favoriteAnimals);

  if (favAnimals.length === 0 || !favAnimals) {
    return (
      <View style={styles.content}>
        <DefaultText>Nie znaleziono ulubionych, dodaj jakies!</DefaultText>
      </View>
    );
  }
  const renderAnimalItem = (itemData) => {
    const isFavorite = favAnimals.some(
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
        }}
      />
    );
  };
  return (
    <View style={styles.list}>
      <FlatList
        //onRefresh={loadAnimals}
        //refreshing={isRefreshing}
        keyExtractor={(item, index) => item.id}
        data={favAnimals}
        renderItem={renderAnimalItem}
        style={{ width: "100%" }}
      />
    </View>
  );
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
