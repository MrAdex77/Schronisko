import { State } from "react-native-gesture-handler";
import Animals from "../../data/dummy-data";

const initialState = {
  avaiableAnimals: Animals,
  userAnimals: Animals.filter((ani) => ani.ownerID === "u1"),
};

export default (state = initialState, action) => {
  return state;
};
