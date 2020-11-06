import React, { useState, useEffect, useCallback, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import Input from "../components/Input";
import HeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as SecureStore from "expo-secure-store";
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};
const SurveyScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState();
  const animalId = props.navigation.getParam("animalId");
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      answer5: "",
      answer6: "",
      answer7: "",
      answer8: "",
      answer9: "",
      answer10: "",
    },
    inputValidities: {
      answer1: false,
      answer2: false,
      answer3: false,
      answer4: false,
      answer5: false,
      answer6: false,
      answer7: false,
      answer8: false,
      answer9: false,
      answer10: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputId, inputValue, inputValidity) => {
      console.log(
        "INPUTID: " +
          inputId +
          " INVALUE: " +
          inputValue +
          " VALIDITY: " +
          inputValidity
      );
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputId,
      });
    },
    [dispatchFormState]
  );

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Złe dane!", "Wypełnij jeszcze raz poprawnie!");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const token = await SecureStore.getItemAsync("token");
      const token2 = JSON.parse(token);
      const response = await fetch(
        "http://mateuszdobosz.site/panel/survey/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token2,
            answers: {
              answer1: formState.inputValues.answer1,
              answer2: formState.inputValues.answer2,
              answer3: formState.inputValues.answer3,
              answer4: formState.inputValues.answer4,
              answer5: formState.inputValues.answer5,
              answer6: formState.inputValues.answer6,
              answer7: formState.inputValues.answer7,
              answer8: formState.inputValues.answer8,
              answer9: formState.inputValues.answer9,
              answer10: formState.inputValues.answer10,
            },
          }),
        }
      );
      if (!response.ok) {
        console.log(response.status);
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      console.log(resData);
      Alert.alert("Wysłano!", "Formularz został wysłany na serwer!");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            id='answer1'
            label='Czy wszyscy domownicy zgadzają się na adopcję zwierzęcia?'
            errorText='Wprowadź poprawną odpowiedź!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            required
          />
          <Input
            id='answer2'
            label='Czy jesteście Państwo świadomi, że zwierzę może zachowywać się nieprzewidywalnie w stosunku do dzieci?'
            errorText='Wprowadź poprawną odpowiedź!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            required
          />
          <Input
            id='answer3'
            label='Czy jesteście Państwo świadomi, że zwierzę może wywoływać alergię i choroby odzwierzęce?'
            errorText='Wprowadź poprawną odpowiedź!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            required
          />
          <Input
            id='answer4'
            label='Czy zwierzę będzie mieszkało w domu czy na zewnątrz?'
            errorText='Wprowadź poprawną odpowiedź!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            required
          />
          <Input
            id='answer5'
            label='Czy w razie pojawienia się kłopotów behawioralnych pupila, jest Pan/igotowy/anawiązać współpracę z behawiorystą (ponosić koszty ewentualnego szkolenia/konsultacji)?'
            errorText='Wprowadź poprawną odpowiedź!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            required
          />
          <Input
            id='answer6'
            label='Czym i jak często zamierzacie Państwo żywić zwierzę(sucha karma, puszki, jedzenie gotowane)?'
            errorText='Wprowadź poprawną odpowiedź!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            required
          />
          <Input
            id='answer7'
            label='Co się będzie działo ze zwierzęciem w czasie Państwa wyjazdów, wakacji lub innego rodzaju dłuższej nieobecności (np. pobytu w szpitalu) itd.?'
            errorText='Wprowadź poprawną odpowiedź!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            required
          />
          <Input
            id='answer8'
            label='Czy jest Pan/igotowy/a podpisać umowę adopcyjną, w której ważnym punktem będzie deklaracja, że zwierzę nigdy nie trafi na ulicę, a w razie gdybyś nie mógł/nie mogła go zatrzymać, to w pierwszej kolejności skontaktujesz się z naszym Schroniskiem?'
            errorText='Wprowadź poprawną odpowiedź!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            required
          />
          <Input
            id='answer9'
            label='Czy zobowiązujecie się Państwo do sterylizacji/kastracji?'
            errorText='Wprowadź poprawną odpowiedź!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            required
          />
          <Input
            id='answer10'
            label='Czy wyraża Pan/i zgodę na przeprowadzenie kontroli przez Inspektora Towarzystwa Opieki nad Zwierzętami w Polsce w nowym miejscu pobytu zwierzęcia?'
            errorText='Wprowadź poprawną odpowiedź!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            required
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

SurveyScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: "Ankieta",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Save'
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SurveyScreen;
