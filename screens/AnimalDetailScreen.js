import React, { useEffect } from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { useSelector } from "react-redux";

const AnimalDetailScreen = (props) => {
  const availableAnimals = useSelector((state) => state.animals.animals);
  const animalId = props.navigation.getParam("animalId");

  const selectedAnimal = availableAnimals.find((x) => x.id === animalId);
  /*
  useEffect(() => {
    props.navigation.setParams({ animalTitle: selectedAnimal.title });
  }, [selectedAnimal]);
*/
  return (
    <ScrollView>
      <Image source={{ uri: selectedAnimal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>Imię: {selectedAnimal.title}</Text>
        <Text>Wiek: {selectedAnimal.age} lata</Text>
        <Text style={styles.description}>{selectedAnimal.description}</Text>
      </View>
    </ScrollView>
  );
};

AnimalDetailScreen.navigationOptions = (navigationData) => {
  const animalId = navigationData.navigation.getParam("animalId");
  const animalTitle = navigationData.navigation.getParam("animalTitle");
  //const selectedAnimal = Animals.find((x) => x.id === animalId);
  return {
    headerTitle: animalTitle,
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
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  details: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "30%",
    backgroundColor: "white",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
  },
});

export default AnimalDetailScreen;
