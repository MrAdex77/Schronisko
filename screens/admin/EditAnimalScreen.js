import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import HeaderButton from "../../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { createAnimal, UpdateAnimal } from "../../store/actions/animals";
import * as animalsActions from "../../store/actions/animals";

const EditAnimalScreen = (props) => {
  const animalId = props.navigation.getParam("animalId");
  const editedAnimal = useSelector((state) =>
    state.animals.animals.find((ani) => ani.id === animalId)
  );

  const [title, setTitle] = useState(editedAnimal ? editedAnimal.title : "");
  const [age, setAge] = useState(
    editedAnimal ? editedAnimal.age.toString() : ""
  );
  const [imageUrl, setImageUrl] = useState(
    editedAnimal ? editedAnimal.imageUrl : ""
  );
  const [description, setDescription] = useState(
    editedAnimal ? editedAnimal.description : ""
  );

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    if (editedAnimal) {
      dispatch(
        animalsActions.UpdateAnimal(animalId, title, age, description, imageUrl)
      );
    } else {
      dispatch(animalsActions.createAnimal(title, age, description, imageUrl));
    }
  }, [dispatch, animalId, title, age, description, imageUrl]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

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
            value={age}
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
});

export default EditAnimalScreen;
