import Animal from "../../models/animal";

import * as SecureStore from "expo-secure-store";

export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const SET_FILTERS = "SET_FILTERS";
export const CREATE_ANIMAL = "CREATE_ANIMAL";
export const UPDATE_ANIMAL = "UPDATE_ANIMAL";
export const DELETE_ANIMAL = "DELETE_ANIMAL";
export const SET_ANIMALS = "SET_ANIMALS";
export const SET_CATEGORY = "SET_CATEGORY";

export const fetchAnimals = () => {
  return async (dispatch) => {
    //any async code https://schronisko-7cfd1.firebaseio.com/animals.json
    //http://mateuszdobosz.site/animals/overview
    try {
      const response = await fetch(
        "http://mateuszdobosz.site/animals/overview",
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        console.log(response.status);
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      //console.log(resData);
      //console.log(resData[0].);
      const loadedAnimals = [];

      for (const key in resData) {
        const images = `http://176.107.131.27/images/${resData[key].image}`;
        loadedAnimals.push(
          new Animal(
            resData[key]._id,
            "u1",
            resData[key].category,
            resData[key].age,
            resData[key].name,
            images,
            resData[key].description
          )
        );
      }

      dispatch({ type: SET_ANIMALS, animals: loadedAnimals });
    } catch (err) {
      //send to custon analytics server
      throw err;
    }
  };
};

export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, animalId: id };
};
export const setCategory = (_category) => {
  return { type: SET_CATEGORY, category: _category };
};
export const setFilters = (filterSettings) => {
  return {
    type: SET_FILTERS,
    filters: filterSettings,
  };
};

export const deleteAnimal = (animalId) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");
    //any async code http://176.107.131.27:5000/animals/new
    const response = await fetch(
      `http://mateuszdobosz.site/animals/delete/${animalId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      }
    );

    if (!response.ok) {
      console.log(response.status);
      throw new Error("Something went wrong!");
    }
    dispatch({ type: DELETE_ANIMAL, pid: animalId });
  };
};

export const createAnimal = (title, category, age, description, imageUrl) => {
  return async (dispatch) => {
    //any async code http://mateuszdobosz.site/animals/new
    //https://schronisko-7cfd1.firebaseio.com/animals.json
    //name,category,age,description,token
    try {
      let filename = imageUrl.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();
      formData.append("photo", { uri: imageUrl, name: filename, type });
      formData.append("age", age);
      formData.append("name", title);
      formData.append("category", category);
      formData.append("description", description);
      const token = await SecureStore.getItemAsync("token");
      formData.append("token", token);
      const response = await fetch("http://mateuszdobosz.site/animals/new", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      if (!response.ok) {
        console.log(response.status);
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      console.log(resData);
      const NewImage = `http://176.107.131.27/images/${resData.image}`;
      dispatch({
        type: CREATE_ANIMAL,
        animalData: {
          title,
          category,
          age,
          description,
          NewImage,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};
export const UpdateAnimal = (
  id,
  title,
  category,
  age,
  description,
  imageUrl
) => {
  return async (dispatch) => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch("http://mateuszdobosz.site/animals/edit", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        id: id,
        name: title,
        category: category,
        age: age,
        description: description,
      }),
    });
    if (!response.ok) {
      console.log(response.status);
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: UPDATE_ANIMAL,
      pid: id,
      animalData: {
        title,
        category,
        age,
        description,
        imageUrl,
      },
    });
  };
};
