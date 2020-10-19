import React, { useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Button,
  Platform,
  View,
  StyleSheet,
  Alert,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AntDesign } from "@expo/vector-icons";

import HeaderButton from "../../components/HeaderButton";
import Colors from "../../constants/Colors";
import AnimalItem from "../../components/AnimalItem";
import * as animalsActions from "../../store/actions/animals";
import { TouchableOpacity } from "react-native-gesture-handler";

const AdminProductsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const availableAnimals = useSelector((state) => state.animals.animals);
  const FavAnimals = useSelector((state) => state.animals.favoriteAnimals);

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

  const editAnimalHandler = (id) => {
    props.navigation.navigate("EditAnimal", { animalId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert("are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(animalsActions.deleteAnimal(id));
        },
      },
    ]);
  };

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
        onSelectAnimal={() => {}}>
        <View style={styles.button1}>
          {/* <Button color={Colors.primaryColor} title='Edit' onPress={() => {}} /> */}
          <TouchableOpacity
            onPress={() => {
              editAnimalHandler(itemData.item.id);
            }}>
            <AntDesign name='edit' size={35} color='white' />
          </TouchableOpacity>
        </View>
        <View style={styles.button2}>
          {/* <Button color={Colors.primaryColor} title='Delete' onPress={() => {}} /> */}
          <TouchableOpacity
            onPress={deleteHandler.bind(this, itemData.item.id)}>
            <AntDesign name='delete' size={35} color='white' />
          </TouchableOpacity>
        </View>
      </AnimalItem>
    );
  };
  return (
    <View style={styles.list}>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={availableAnimals}
        renderItem={renderAnimalItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

AdminProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Twoje zwierzęta",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button1: {
    position: "absolute",
    top: 10,
    left: "4%",
    width: 41,
    height: 41,
    zIndex: 1,
    backgroundColor: Colors.primaryColor,
    borderRadius: 20,
    alignItems: "center",
  },
  button2: {
    position: "absolute",
    top: 10,
    left: "80%",
    right: "4%",
    zIndex: 1,
    width: 41,
    height: 41,
    backgroundColor: Colors.primaryColor,
    borderRadius: 20,
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AdminProductsScreen;
