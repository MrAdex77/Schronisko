import User from "../../models/user";
import { USER } from "../../data/dummy-data";
import { LOGIN, DONATE } from "../actions/auth";
const initialState = {
  user: USER,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        user: action.user,
      };
    case DONATE:
      const user = state.user;
      user.balance = action.amount;
      return {
        user: user,
      };
    default:
      return state;
  }
};
export default userReducer;
