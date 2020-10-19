import React from "react";
import { FlatList, Button, Platform, View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AntDesign } from "@expo/vector-icons";

import HeaderButton from "../../components/HeaderButton";
import Colors from "../../constants/Colors";
import AnimalItem from "../../components/AnimalItem";
import * as animalsActions from "../../store/actions/animals";
import { TouchableOpacity } from "react-native-gesture-handler";

const AdminProductsScreen = (props) => {
  const animals = useSelector((state) => state.animals.animals);
  const FavAnimals = useSelector((state) => state.animals.favoriteAnimals);
  const dispatch = useDispatch();

  const editAnimalHandler = (id) => {
    props.navigation.navigate("EditAnimal", { animalId: id });
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
        onSelectAnimal={() => {
          editAnimalHandler(itemData.item.id);
        }}
      >
        <View style={styles.button1}>
          {/* <Button color={Colors.primaryColor} title='Edit' onPress={() => {}} /> */}
          <TouchableOpacity
            onPress={() => {
              editAnimalHandler(itemData.item.id);
            }}
          >
            <AntDesign name="edit" size={35} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.button2}>
          {/* <Button color={Colors.primaryColor} title='Delete' onPress={() => {}} /> */}
          <TouchableOpacity
            onPress={() => {
              dispatch(animalsActions.deleteAnimal(itemData.item.id));
            }}
          >
            <AntDesign name="delete" size={35} color="white" />
          </TouchableOpacity>
        </View>
      </AnimalItem>
    );
  };
  return (
    <View style={styles.list}>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={animals}
        renderItem={renderAnimalItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

AdminProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Twoje zwierzęta",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditAnimal");
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
});
export default AdminProductsScreen;
