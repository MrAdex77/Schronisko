import React, { useEffect, useCallback } from "react";
import {
  ScrollView,
  View,
  ImageBackground,
  Text,
  StyleSheet,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/animals";
import CustomButton from "../components/CustomButton";

const AnimalDetailScreen = (props) => {
  const availableAnimals = useSelector((state) => state.animals.animals);
  const animalId = props.navigation.getParam("animalId");
  const currentAnimalIsFav = useSelector((state) =>
    state.animals.favoriteAnimals.some((animal) => animal.id === animalId)
  );

  const selectedAnimal = availableAnimals.find((x) => x.id === animalId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(animalId));
  }, [dispatch, animalId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentAnimalIsFav });
  }, [currentAnimalIsFav]);
  return (
    <ScrollView>
      <View style={styles.cos}>
        <ImageBackground
          source={{ uri: selectedAnimal.imageUrl }}
          style={styles.image}>
          <CustomButton
            style={styles.button}
            color='red'
            onPress={() => {
              props.navigation.navigate({
                routeName: "Survey",
                params: {
                  animalId: animalId,
                },
              });
            }}>
            <Text>Adoptuj mnie!</Text>
          </CustomButton>
        </ImageBackground>

        <View style={styles.details}>
          <Text style={styles.title}>Imię: {selectedAnimal.title}</Text>
          <Text>Wiek: {selectedAnimal.age} lata</Text>
          <Text style={styles.description}>{selectedAnimal.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

AnimalDetailScreen.navigationOptions = (navigationData) => {
  //const animalId = navigationData.navigation.getParam("animalId");
  const animalTitle = navigationData.navigation.getParam("animalTitle");
  const toggleFavorite = navigationData.navigation.getParam("toggleFav");
  const isFavorite = navigationData.navigation.getParam("isFav");
  //const selectedAnimal = Animals.find((x) => x.id === animalId);
  return {
    headerTitle: animalTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Favorite'
          iconName={isFavorite ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  details: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: 300,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    height: "100%",
    backgroundColor: "white",
  },
  button: {
    marginBottom: 5,
  },
});

export default AnimalDetailScreen;
