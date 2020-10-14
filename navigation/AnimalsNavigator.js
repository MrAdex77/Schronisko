import React from "react";
import { Platform, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import CategoriesScreen from "../screens/CategoriesScreen";
import AnimalOverviewScreen from "../screens/AnimalOverviewScreen";
import AppointmentServiceScreen from "../screens/AppointmentScreen";
import DonationScreen from "../screens/DonationScreen";
import LoginScreen from "../screens/LoginScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

import Colors from "../constants/Colors";
import Animal from "../models/animal";
import AnimalDetailScreen from "../screens/AnimalDetailScreen";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "white",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const AnimalNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: { headerTitle: "Menu" },
    },
    AnimalOverview: { screen: AnimalOverviewScreen },
    Appointment: AppointmentServiceScreen,
    Donation: DonationScreen,
    Login: LoginScreen,
    Statistics: StatisticsScreen,
    AnimalDetail: AnimalDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    AnimalDetail: AnimalDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const tabScreenConfig = {
  Animals: {
    screen: AnimalNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Zwierzeta</Text>
        ) : (
          "Zwierzeta"
        ),
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Ulubione</Text>
        ) : (
          "Ulubione"
        ),
    },
  },
};

const AnimalFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: "white",
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor,
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans",
          },
          activeTintColor: Colors.accentColor,
        },
      });
const FavoritesNavigator = createStackNavigator(
  {
    favnav: FavoritesScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const MainNavigator = createDrawerNavigator(
  {
    AnimalsFav: {
      screen: AnimalFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Menu",
      },
    },
    Fav: FavoritesNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold",
      },
    },
  }
);
export default createAppContainer(MainNavigator);
