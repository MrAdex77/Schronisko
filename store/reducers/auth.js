import User from "../../models/user";
import { USER } from "../../data/dummy-data";
import { LOGIN } from "../actions/auth";
const initialState = {
  user: USER,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
export default userReducer;
