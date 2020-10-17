import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  Button,
} from "react-native";

import AnimalList from "../components/AnimalList";
import * as animalsActions from "../store/actions/animals";
import Colors from "../constants/Colors";

const AnimalsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const availableAnimals = useSelector((state) => state.animals.animals);

  const dispatch = useDispatch();

  const loadAnimals = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(animalsActions.fetchAnimals());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadAnimals);

    return () => {
      willFocusSub.remove();
    };
  }, [loadAnimals]);

  useEffect(() => {
    loadAnimals();
  }, [dispatch, loadAnimals]);

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

  return (
    <AnimalList listData={availableAnimals} navigation={props.navigation} />
  );
};

AnimalsOverviewScreen.navigationOptions = (navigationData) => {
  //const catId = navigationData.navigation.getParam("categoryId");

  //const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  return {
    headerTitle: "Przegląd Zwierząt",
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
