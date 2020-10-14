import { State } from "react-native-gesture-handler";
import Animals from "../../data/dummy-data";
import { TOGGLE_FAVORITE } from "../actions/animals";

const initialState = {
  animals: Animals,
  favoriteAnimals: [],
};

const animalReducer = (state = initialState, action) => {
  switch (action.type) {
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
