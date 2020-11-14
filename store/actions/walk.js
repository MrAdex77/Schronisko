import * as SecureStore from "expo-secure-store";
import axios from "axios";

export const SET_WALKS = "SET_WALKS";
export const DELETE_WALK = "DELETE_WALK";

export const GetWalksAsync = () => {
  return async (dispatch) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      await axios
        .put("http://176.107.131.27/user/help/overview", { token: token })

        .then(function (response) {
          console.log("udany get moje spacery");
          console.log(response.data.help);

          const data = response.data.help;

          dispatch({ type: SET_WALKS, data: data });
        })
        .catch(function (error) {
          console.log("catch po axiosie pobranie  spaceru");
          console.log(error);
        });
    } catch (e) {
      throw e;
    }
  };
};

export const deleteWalk = (id) => {
  return async (dispatch) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      await axios
        .delete("http://176.107.131.27/user/help/delete/" + id, {
          token: token,
        })

        .then(function (response) {
          console.log("Usuwam spacer " + id);
          console.log(response.data);

          dispatch({ type: DELETE_WALK, pid: id });
        })
        .catch(function (error) {
          console.log("catch po axiosie usuniecie spaceru");
          console.log(error);
        });
    } catch (e) {
      throw e;
    }
  };
};
