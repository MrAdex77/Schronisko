

import {SET_WALKS,DELETE_WALK} from "../actions/walk";

const initialState = {
    walks : []
};

const walkReducer = (state = initialState,action) => {
     switch (action.type){
       case SET_WALKS:
           return{
               walks: action.data
           };
      case DELETE_WALK:
         return {
           ...state,
           walks: state.walks.filter((walk)=> walk.item._id !== action.id)   ,
          };
      default:
          return state;
     }
};

export default walkReducer;