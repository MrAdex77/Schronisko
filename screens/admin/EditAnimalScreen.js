import React, { useState, useEffect, useCallback } from "react";
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
} from "react-native";
import HeaderButton from "../../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../../constants/Colors";
import { createAnimal, UpdateAnimal } from "../../store/actions/animals";
import * as animalsActions from "../../store/actions/animals";

const EditAnimalScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState();

  const animalId = props.navigation.getParam("animalId");
  const editedAnimal = useSelector((state) =>
    state.animals.animals.find((ani) => ani.id === animalId)
  );

  const [title, setTitle] = useState(editedAnimal ? editedAnimal.title : "");
  const [age, setAge] = useState(editedAnimal ? editedAnimal.age : "");
  const [imageUrl, setImageUrl] = useState(
    editedAnimal ? editedAnimal.imageUrl : ""
  );
  const [description, setDescription] = useState(
    editedAnimal ? editedAnimal.description : ""
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (Error) {
      Alert.alert("An error occured!", Error, [{ text: "Okay" }]);
    }
  }, [Error]);
  const submitHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (editedAnimal) {
        await dispatch(
          animalsActions.UpdateAnimal(
            animalId,
            title,
            age,
            description,
            imageUrl
          )
        );
      } else {
        await dispatch(
          animalsActions.createAnimal(title, age, description, imageUrl)
        );
      }
      props.navigation.navigate("AdminAnimals");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, animalId, title, age, description, imageUrl]);

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
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Imię</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Wiek</Text>
          <TextInput
            style={styles.input}
            value={age.toString()}
            onChangeText={(text) => setAge(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Link do zdjecia</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Opis</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
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
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditAnimalScreen;
