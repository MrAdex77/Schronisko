import React from "react";
import { Platform, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createSwitchNavigator } from "react-navigation";
import { Ionicons, FontAwesome5, Feather } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import CategoriesScreen from "../screens/CategoriesScreen";
import AnimalsOverviewScreen from "../screens/AnimalsOverviewScreen";
import AppointmentServiceScreen from "../screens/AppointmentScreen";
import DonationScreen from "../screens/DonationScreen";
import LoginScreen from "../screens/LoginScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import NewsScreen from "../screens/NewsScreen";
import ContactScreen from "../screens/ContactScreen";
import SignUpOnWalkScreen from "../screens/SignUpOnWalkScreen";
import AdminCategoriesScreen from "../screens/AdminCategoriesScreen";

import Colors from "../constants/Colors";
import AnimalDetailScreen from "../screens/AnimalDetailScreen";
import AdminProductsScreen from "../screens/admin/AdminProductsScreen";
import EditAnimalScreen from "../screens/admin/EditAnimalScreen";
import AddNewsScreen from "../screens/admin/AddNewsScreen";
import SurveyScreen from "../screens/SurveyScreen";
import SurveyOverviewScreen from "../screens/admin/SurveyOverviewScreen";
import StartupScreen from "../screens/StartupScreen";
import SurveyDetailScreen from "../screens/admin/SurveyDetailScreen";
import PedometerScreen from "../screens/PedometerScreen";
import LogoutScreen from "../screens/LogoutScreen";
import CustomDrawer from "../components/CustomDrawer";


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
// const FavNavigator = createStackNavigator(
//   {
//     Favorites: {
//       screen: FavoritesScreen,
//       navigationOptions: { headerTitle: "Ulubione" },
//     },
//   },
//   {
//     defaultNavigationOptions: defaultStackNavOptions,
//   }
// );

const tabScreenConfig = {
  AnimalsOverview: {
    screen: AnimalsOverviewScreen,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <FontAwesome5 name='dog' size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Zwierzęta</Text>
        ) : (
          "Zwierzęta"
        ),
    },
  },
  Favorites: {
    screen: FavoritesScreen,
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

const AnimalNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: { headerTitle: "Menu" },
    },
    AnimalsOverview: {
      screen: AnimalFavTabNavigator,
      navigationOptions: { headerTitle: "Zwierzęta" },
    },
    Appointment: AppointmentServiceScreen,
    Donation: DonationScreen,
     Login: LoginScreen,
    Statistics: StatisticsScreen,
    News: {
      screen: NewsScreen,
      navigationOptions: { headerTitle: "Aktualności" },
    },
    Contact: {
      screen: ContactScreen,
      navigationOptions: { headerTitle: "Kontakt" },
    },
    SignUpOnWalk: {
      screen: SignUpOnWalkScreen,
      navigationOptions: { headerTitle: "Umów się na spacer" },
    },
    AnimalDetail: { screen: AnimalDetailScreen },
    Survey: SurveyScreen,
    // StartUp: StartupScreen,
    Krokomierz: PedometerScreen,
    
  
  },
  {
    // initialRouteName: "StartUp",
    initialRouteName: "Categories",
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    
    AdminCategories: {
      screen: AdminCategoriesScreen,
      navigationOptions: { headerTitle: "Admin menu" },
    },
    AddNews: {
      screen: AddNewsScreen,
      navigationOptions: { headerTitle: "Dodaj aktualność" },
    },

    AdminProducts: {
      screen: AdminProductsScreen,
      navigationOptions: { headerTitle: "Twoje zwierzęta" },
    },
    SurveyOverview: {
      screen: SurveyOverviewScreen,
      navigationOptions: { headerTitle: "Przegląd ankiet" },
    },
    EditAnimal: EditAnimalScreen,
    SurveyDetail: SurveyDetailScreen,
  },

  {
    initialRouteName: "AdminCategories",
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const MainNavigator = createDrawerNavigator(
  {
    Menu: {
      screen: AnimalNavigator,
      navigationOptions: {
        drawerLabel: "Menu",
        drawerIcon: () => <Ionicons name='md-menu' size={23} color='black' />,
      },
    },
    Admin: {
      screen: AdminNavigator,
      navigationOptions: {
        drawerLabel: "Admin",
        drawerIcon: () => <FontAwesome5 name='user' size={23} color='black' />,
      },
    },
    Logout: {
      screen: LogoutScreen,
      navigationOptions: {
        drawerLabel: "Wyloguj",
        drawerIcon: () => <Feather name='log-out' size={23} color='black' />,
      },
    },
  },
  {
    contentComponent: CustomDrawer,
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold",
      },
    },
  }
);




const Routes = createSwitchNavigator({
  startUp: StartupScreen,
  all: MainNavigator,
}, {
  initialRouteName: 'startUp',
});



// export default createAppContainer(MainNavigator);
export default createAppContainer(Routes);