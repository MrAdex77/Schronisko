import { State } from "react-native-gesture-handler";
import Animals from "../../data/dummy-data";
import Animal from "../../models/animal";
import {
  CREATE_ANIMAL,
  DELETE_ANIMAL,
  SET_ANIMALS,
  SET_CATEGORY,
  SET_FILTERS,
  TOGGLE_FAVORITE,
  UPDATE_ANIMAL,
} from "../actions/animals";

const initialState = {
  animals: Animals,
  filteredAnimals: Animals,
  favoriteAnimals: [],
};

const animalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ANIMALS:
      return {
        animals: action.animals,
        filteredAnimals: action.animals,
        favoriteAnimals: [...state.favoriteAnimals],
      };

    case CREATE_ANIMAL:
      const newAnimal = new Animal(
        new Date().toString(),
        "u1",
        action.animalData.category,
        action.animalData.age,
        action.animalData.title,
        action.animalData.imageUrl,
        action.animalData.description
      );
      return {
        ...state,
        animals: state.animals.concat(newAnimal),
      };
    case UPDATE_ANIMAL:
      const animalIndex = state.animals.findIndex(
        (ani) => ani.id === action.pid
      );
      const updatedAnimal = new Animal(
        action.pid,
        "u1",
        action.animalData.category,
        action.animalData.age,
        action.animalData.name,
        action.animalData.imageUrl,
        action.animalData.description
      );
      const updatedAvailableAnimals = [...state.animals];
      updatedAvailableAnimals[animalIndex] = updatedAnimal;
      return {
        ...state,
        animals: updatedAvailableAnimals,
      };

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
    case SET_CATEGORY:
      console.log(action.category);
      const filteredAnimals = state.animals.filter(
        (animal) => animal.category === action.category
      );
      //const oldAnimals = [...state.animals];
      //oldAnimals.filter((animal) => animal.category === action.category);
      return {
        ...state,
        filteredAnimals: filteredAnimals,
      };
    // case SET_FILTERS:
    //   const appliedFilters = action.filters;
    //   const filteredMeals = state.meals.filter((ani) => {
    //     if (filters.glutenFree && !ani.isGlutenFree) {
    //       return false;
    //     }
    //   });
    case DELETE_ANIMAL:
      return {
        ...state,
        animals: state.animals.filter((animal) => animal.id !== action.pid),
      };
    default:
      return state;
  }
};
export default animalReducer;
