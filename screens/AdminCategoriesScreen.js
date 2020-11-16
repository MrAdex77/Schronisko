import React, {useEffect} from "react";
import {
  ImageBackground,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";


import Colors from "../constants/Colors"
import { ADMINCATEGORIES } from "../data/categories-data";
import CategoryGridTile from "../components/CategoryGridTile";
import HeaderButton from "../components/HeaderButton";
import { useDispatch,useSelector } from "react-redux";
import {SwitchActions, NavigationActions, StackActions } from "react-navigation";


const AdminCategoriesScreen = (props) => {

   const isAdmin = useSelector((state) => state.auth.user.isAdmin);
   const isLogged = useSelector((state) => state.auth.isLogged);
   //console.log("check admin Admin categories "+isAdmin);
  if(isAdmin === false || isLogged === false){
    return(
      <View style={{flex:1,justifyContent:'center'}}>
        <Text style={styles.txt1}>Admin required</Text>
      </View>
    );
  };

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
    <ImageBackground source={require("../img/dog.png")} style={styles.image}>
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  txt1: {
    alignSelf: "center",
    fontFamily: "open-sans",
    fontSize: 28,
    color: "#808080",
    //padding:5,
  },
});

export default AdminCategoriesScreen;
