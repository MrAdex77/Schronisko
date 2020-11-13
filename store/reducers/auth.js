import User from "../../models/user";
import { USER } from "../../data/dummy-data";
import { LOGIN, DONATE, LOGOUT } from "../actions/auth";
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
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
export default userReducer;
