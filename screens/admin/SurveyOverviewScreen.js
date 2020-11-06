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
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import * as SecureStore from "expo-secure-store";

const SurveyOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [list, setList] = useState([]);

  const loadSurveys = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      const token = await SecureStore.getItemAsync("token");
      const token2 = JSON.parse(token);
      //http://mateuszdobosz.site/panel/survey/overview
      //http://mateuszdobosz.site/animals/overview
      const response = await fetch(
        "http://mateuszdobosz.site/panel/survey/overview",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token2,
          }),
        }
      );
      if (!response.ok) {
        console.log(response.status);
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      console.log(resData);
      const loadedSurveys = [];
      for (const key in resData) {
        loadedSurveys.push({
          id: resData[key]._id,
          name: resData[key].name,
          survey: resData[key].survey.map((x) => x.answers),
        });
      }
      setList(loadedSurveys);
      return loadedSurveys;
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }

    setIsRefreshing(false);
  }, [setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadSurveys);

    return () => {
      willFocusSub.remove();
    };
  }, [loadSurveys]);

  useEffect(() => {
    setIsLoading(true);
    loadSurveys().then(() => {
      setIsLoading(false);
    });
  }, [loadSurveys]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Wystąpił błąd! </Text>
        <Button
          title="Spróbuj ponownie"
          onPress={loadSurveys}
          color={Colors.primaryColor}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  const renderSurveyItem = (itemData) => {
    // const isFavorite = FavAnimals.some(
    //   (animal) => animal.id === itemData.item.id
    // );
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate({
            routeName: "SurveyDetail",
            params: {
              userId: itemData.item.id,
              userName: itemData.item.name,
              survey: itemData.item.survey,
            },
          });
        }}
      >
        <View style={styles.animalItem}>
          <Text>{itemData.item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.centered}>
      <FlatList
        //onRefresh={loadSurveys}
        //refreshing={isRefreshing}
        keyExtractor={(item, index) => item.id}
        data={list}
        renderItem={renderSurveyItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

SurveyOverviewScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Ankiety",
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animalItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 10,
    backgroundColor: "white",
    height: 100,
    borderRadius: 50,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default SurveyOverviewScreen;
