import {SET_NEWS,DELETE_NEWS} from "../actions/news";

const initialState = {
    news : []
};

const walkReducer = (state = initialState,action) => {
     switch (action.type){
       case SET_NEWS:
           return{
               news: action.data
           };
      case DELETE_NEWS:
         return {
           ...state,
           news: state.news.filter(newss => newss._id !== action.pid)   ,
          };
      default:
          return state;
     }
};

export default walkReducer;