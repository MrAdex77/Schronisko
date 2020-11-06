import React from "react";
import { ImageBackground,View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { ADMINCATEGORIES } from "../data/categories-data";
import CategoryGridTile from "../components/CategoryGridTile";
import HeaderButton from "../components/HeaderButton";
//import { Item } from "react-native-paper/lib/typescript/src/components/List/List";

const AdminCategoriesScreen = (props) => {
  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: itemData.item.id,
            params: { categoryId: itemData.item.id },
          });
        }}
      />
    );
  };
  return (
    <ImageBackground source={require('../img/dog.png')} style={styles.image}>
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={ADMINCATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
    </ImageBackground>
  );
};

AdminCategoriesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Menu",
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
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image:{
    flex: 1,
    resizeMode: 'cover',
    justifyContent: "center",
    
  }
});

export default AdminCategoriesScreen;
