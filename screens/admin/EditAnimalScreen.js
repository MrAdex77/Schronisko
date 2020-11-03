import React, { useState, useEffect, useCallback, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  InputAccessoryView,
} from "react-native";
import HeaderButton from "../../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../../constants/Colors";
import * as animalsActions from "../../store/actions/animals";
import ImagePicker from "../../components/ImagePicker";
import Input from "../../components/Input";

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

const EditAnimalScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState();
  const animalId = props.navigation.getParam("animalId");
  const editedAnimal = useSelector((state) =>
    state.animals.animals.find((ani) => ani.id === animalId)
  );
  const [newValue, setnewValue] = useState("");

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedAnimal ? editedAnimal.title : "",
      category: editedAnimal ? editedAnimal.category : "",
      age: editedAnimal ? editedAnimal.age : "",
      imageUrl: editedAnimal ? editedAnimal.imageUrl : "",
      description: editedAnimal ? editedAnimal.description : "",
    },
    inputValidities: {
      title: editedAnimal ? true : false,
      category: editedAnimal ? true : false,
      age: editedAnimal ? true : false,
      imageUrl: editedAnimal ? true : false,
      description: editedAnimal ? true : false,
    },
    formIsValid: editedAnimal ? true : false,
  });

  const inputChangeHandler = useCallback(
    (inputId, inputValue, inputValidity) => {
      console.log("ID: " + inputId + "val: " + inputValue);
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputId,
      });
    },
    [dispatchFormState]
  );

  const addNewImageHandler = (newImage) => {
    inputChangeHandler("imageUrl", newImage, true);
    setnewValue(newImage);
    console.log("NEW IMAGE:" + newImage);
  };

  useEffect(() => {
    if (Error) {
      Alert.alert("Wystąpił błąd!", Error, [{ text: "Okay" }]);
    }
  }, [Error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Złe dane!", "Wypełnij jeszcze raz poprawnie!");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedAnimal) {
        await dispatch(
          animalsActions.UpdateAnimal(
            animalId,
            formState.inputValues.title,
            formState.inputValues.category,
            formState.inputValues.age,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          animalsActions.createAnimal(
            formState.inputValues.title,
            formState.inputValues.category,
            formState.inputValues.age,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, animalId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Imie"
            errorText="Wprowadź poprawne imię!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedAnimal ? editedAnimal.title : ""}
            initiallyValid={!!editedAnimal}
            required
          />
          <Input
            id="category"
            label="Kategoria"
            errorText="Wprowadź poprawną kategorię: Pies,kot"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedAnimal ? editedAnimal.category : ""}
            initiallyValid={!!editedAnimal}
            required
          />
          <Input
            id="age"
            label="Wiek"
            errorText="Wprowadź poprawny wiek!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedAnimal ? editedAnimal.age : ""}
            initiallyValid={!!editedAnimal}
            required
            min={1}
          />
          <Input
            id="imageUrl"
            label="Link do zdjecia"
            errorText="Wprowadź poprawny link!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            img={newValue}
            initialValue={editedAnimal ? editedAnimal.imageUrl : ""}
            initiallyValid={!!editedAnimal}
            required
          />

          <ImagePicker onAddImage={addNewImageHandler} />
          <Input
            id="description"
            label="Opis"
            errorText="Wprowadź poprawny opis!"
            keyboardType="default"
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedAnimal ? editedAnimal.description : ""}
            initiallyValid={!!editedAnimal}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditAnimalScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("animalId")
      ? "Edycja"
      : "Dodaj zwierzę",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
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

export default EditAnimalScreen;
