import { State } from "react-native-gesture-handler";
import Animals from "../../data/dummy-data";
import Animal from "../../models/animal";
import {
  CREATE_ANIMAL,
  TOGGLE_FAVORITE,
  UPDATE_ANIMAL,
} from "../actions/animals";

const initialState = {
  animals: Animals,
  favoriteAnimals: [],
};

const animalReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ANIMAL:
      const newAnimal = new Animal(
        new Date().toString(),
        "u1",
        action.animalData.title,
        action.animalData.age,
        action.animalData.imageUrl,
        action.animalData.description
      );
      return {
        ...state,
        animals: state.animals.concat(newAnimal),
      };
    case UPDATE_ANIMAL:
      const updatedAnimal = new Animal(
        action.pid,
        state.animals[animalIndex].ownerID,
        action.productData.age,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description
      );
    //to be contiuned
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteAnimals.findIndex(
        (animal) => animal.id === action.animalId
      );
      if (existingIndex >= 0) {
        const updatedFavAnimals = [...state.favoriteAnimals];
        updatedFavAnimals.splice(existingIndex, 1);
        return { ...state, favoriteAnimals: updatedFavAnimals };
      } else {
        const animal = state.animals.find((ani) => ani.id === action.animalId);
        return {
          ...state,
          favoriteAnimals: state.favoriteAnimals.concat(animal),
        };
      }
    default:
      return state;
  }
};
export default animalReducer;
