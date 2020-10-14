import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import AnimalItem from "./AnimalItem";

const AnimalList = (props) => {
  const renderAnimalItem = (itemData) => {
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
            },
          });
        }}
      />
    );
  };
  return (
    <View style={styles.list}>
      <FlatList
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
