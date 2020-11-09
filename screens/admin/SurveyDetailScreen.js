import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableHighlight,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import * as SecureStore from "expo-secure-store";
import { cos } from "react-native-reanimated";

const SurveyDetailScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const userId = props.navigation.getParam("userId");
  const userName = props.navigation.getParam("userName");

  const answers = props.navigation.getParam("answers");
  const survey = props.navigation.getParam("survey");
  const loadedSurveys = [];

  for (const key in answers) {
    //console.log("survey1: " + survey[key].answer1);
    loadedSurveys.push({
      id: null,
      answer1: answers[key].answer1,
      answer2: answers[key].answer2,
      answer3: answers[key].answer3,
      answer4: answers[key].answer4,
      answer5: answers[key].answer5,
      answer6: answers[key].answer6,
      answer7: answers[key].answer7,
      answer8: answers[key].answer8,
      answer9: answers[key].answer9,
      answer10: answers[key].answer10,
    });
  }
  for (const key in survey) {
    loadedSurveys[key].id = survey[key];
    //console.log("sdasd: " + survey[key]);
  }

  console.log("userid: " + userId + " userName: " + userName);

  if (loadedSurveys.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.header}> Nie znaleziono ankiet!</Text>
      </View>
    );
  }

  const confirmSurvey = async (id) => {
    //404 wywala
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(
      "http://mateuszdobosz.site/panel/survey/accept",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          token,
        }),
      }
    );
    if (!response.ok) {
      console.log(response.status);
      throw new Error("Something went wrong!");
    }
  };

  const renderSurveyItem = (itemData) => {
    return (
      <View style={styles.centered}>
        <View style={styles.form}>
          <Text style={styles.header}>Ankieta</Text>
          <Text> id: {itemData.item.id}</Text>
          <Text style={styles.question}>Imię i nazwisko: {userName}</Text>
          <Text style={styles.question}>
            Czy wszyscy domownicy zgadzają się na adopcję zwierzęcia?
          </Text>
          <Text style={styles.answer}>{itemData.item.answer1}</Text>
          <Text style={styles.question}>
            Czy jesteście Państwo świadomi, że zwierzę może zachowywać się
            nieprzewidywalnie w stosunku do dzieci?
          </Text>
          <Text style={styles.answer}>{itemData.item.answer2}</Text>
          <Text style={styles.question}>
            Czy jesteście Państwo świadomi, że zwierzę może wywoływać alergię i
            choroby odzwierzęce?
          </Text>
          <Text style={styles.answer}>{itemData.item.answer3}</Text>
          <Text style={styles.question}>
            Czy zwierzę będzie mieszkało w domu czy na zewnątrz?
          </Text>
          <Text style={styles.answer}>{itemData.item.answer4}</Text>
          <Text style={styles.question}>
            Czy w razie pojawienia się kłopotów behawioralnych pupila, jest
            Pan/igotowy/anawiązać współpracę z behawiorystą (ponosić koszty
            ewentualnego szkolenia/konsultacji)?
          </Text>
          <Text style={styles.answer}>{itemData.item.answer5}</Text>
          <Text style={styles.question}>
            Czym i jak często zamierzacie Państwo żywić zwierzę(sucha karma,
            puszki, jedzenie gotowane)?
          </Text>
          <Text style={styles.answer}>{itemData.item.answer6}</Text>
          <Text style={styles.question}>
            Co się będzie działo ze zwierzęciem w czasie Państwa wyjazdów,
            wakacji lub innego rodzaju dłuższej nieobecności (np. pobytu w
            szpitalu) itd.?
          </Text>
          <Text style={styles.answer}>{itemData.item.answer7}</Text>
          <Text style={styles.question}>
            Czy jest Pan/igotowy/a podpisać umowę adopcyjną, w której ważnym
            punktem będzie deklaracja, że zwierzę nigdy nie trafi na ulicę, a w
            razie gdybyś nie mógł/nie mogła go zatrzymać, to w pierwszej
            kolejności skontaktujesz się z naszym Schroniskiem?
          </Text>
          <Text style={styles.answer}>{itemData.item.answer8}</Text>
          <Text style={styles.question}>
            Czy zobowiązujecie się Państwo do sterylizacji/kastracji?
          </Text>
          <Text style={styles.answer}>{itemData.item.answer9}</Text>
          <Text style={styles.question}>
            Czy wyraża Pan/i zgodę na przeprowadzenie kontroli przez Inspektora
            Towarzystwa Opieki nad Zwierzętami w Polsce w nowym miejscu pobytu
            zwierzęcia?
          </Text>
          <Text style={styles.answer}>{itemData.item.answer10}</Text>
          <CustomButton
            style={styles.button}
            onPress={() => {
              confirmSurvey(itemData.item.id);
            }}>
            Zatwierdź
          </CustomButton>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.centered}>
      <FlatList
        //onRefresh={loadSurveys}
        //refreshing={isRefreshing}
        keyExtractor={(item, index) => item.id}
        data={loadedSurveys}
        renderItem={renderSurveyItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

SurveyDetailScreen.navigationOptions = (navigationData) => {
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
  form: {
    margin: 20,
    padding: 5,
    borderColor: "green",
    borderWidth: 2,
    borderRadius: 20,
  },
  question: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  answer: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  header: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
    marginVertical: 2,
  },
  button: {
    marginVertical: 18,
    alignItems: "center",
  },
});

export default SurveyDetailScreen;
