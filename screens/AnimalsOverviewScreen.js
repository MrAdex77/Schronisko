import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  FlatList,
  Button,
  Platform,
} from "react-native";
import AnimalItem from "../components/AnimalItem";
import * as animalsActions from "../store/actions/animals";
import Colors from "../constants/Colors";
import HeaderButton, {
  FontAwesomeHeaderButton,
} from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const AnimalsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const availableAnimals = useSelector(
    (state) => state.animals.filteredAnimals
  );
  const FavAnimals = useSelector((state) => state.animals.favoriteAnimals);

  const dispatch = useDispatch();

  const loadAnimals = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(animalsActions.fetchAnimals());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadAnimals);

    return () => {
      willFocusSub.remove();
    };
  }, [loadAnimals]);

  useEffect(() => {
    setIsLoading(true);
    loadAnimals().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadAnimals]);

  const changeCategory = useCallback(
    (category) => {
      dispatch(animalsActions.setCategory(category));
    },
    [dispatch, changeCategory]
  );
  useEffect(() => {
    props.navigation.setParams({ category: changeCategory });
  }, [changeCategory]);
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Wystąpił błąd! </Text>
        <Button
          title='Spróbuj ponownie'
          onPress={loadAnimals}
          color={Colors.primaryColor}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primaryColor} />
      </View>
    );
  }

  if (!isLoading && availableAnimals.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Nie znaleziono zwierząt! </Text>
      </View>
    );
  }
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
        }}
      />
    );
  };
  return (
    <View style={styles.list}>
      <FlatList
        onRefresh={loadAnimals}
        refreshing={isRefreshing}
        keyExtractor={(item, index) => item.id}
        data={availableAnimals}
        renderItem={renderAnimalItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

AnimalsOverviewScreen.navigationOptions = (navigationData) => {
  //const catId = navigationData.navigation.getParam("categoryId");
  //const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  const changeCategory = navigationData.navigation.getParam("category");
  return {
    headerTitle: "Zwierzęta",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={FontAwesomeHeaderButton}>
        <Item
          title='dogs'
          iconName={Platform.OS === "android" ? "dog" : "ios-checkmark"}
          onPress={() => {
            changeCategory("Pies");
          }}
        />
        <Item
          title='cats'
          iconName={Platform.OS === "android" ? "cat" : "ios-checkmark"}
          onPress={() => {
            changeCategory("Kot");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AnimalsOverviewScreen;
