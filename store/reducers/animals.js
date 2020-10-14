import { State } from "react-native-gesture-handler";
import Animals from "../../data/dummy-data";

const initialState = {
  animals: Animals,
  favoriteAnimals: [],
};

const animalReducer = (state = initialState, action) => {
  return state;
};
export default animalReducer;
