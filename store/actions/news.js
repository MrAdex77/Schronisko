import * as SecureStore from "expo-secure-store";
import axios from "axios";


export const SET_NEWS = "SET_NEWS";
export const DELETE_NEWS = "DELETE_NEWS";

export const GetNewsAsync =  () => {
return async (dispatch) => {
    try{
    await axios.get('http://176.107.131.27/panel/news/overview')
    
      .then( function(response) {
       
       const data =response.data.news;
       dispatch({ type: SET_NEWS, data: data });
       
       
       
      }) .catch( function (error) {
        
        console.log("catch po axiosie pobranie  newsa");
        console.log(error);
        
      })

    }catch ( e ) {
  
        return {error: true};
      }

}
};


export const deleteNews = (id) => {
    return async (dispatch) => {
      try {
        const token = await SecureStore.getItemAsync("token");
        await axios
          .delete("http://176.107.131.27/panel/news/delete/" + id, {
            token: token,
          })
  
          .then(function (response) {
            console.log("Usuwam newsa " + id);
            console.log(response.data);
  
            dispatch({ type: DELETE_NEWS, pid: id });
          })
          .catch(function (error) {
            console.log("catch po axiosie usuniecie newsa");
            console.log("news id "+id)
            console.log(error);
          });
      } catch (e) {
        throw e;
      }
    };
  };