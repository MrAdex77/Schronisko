import Animal from "../../models/animal";

export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const SET_FILTERS = "SET_FILTERS";
export const CREATE_ANIMAL = "CREATE_ANIMAL";
export const UPDATE_ANIMAL = "UPDATE_ANIMAL";
export const DELETE_ANIMAL = "DELETE_ANIMAL";
export const SET_ANIMALS = "SET_ANIMALS";

export const fetchAnimals = () => {
  return async (dispatch) => {
    //any async code http://176.107.131.27:5000/animals/new
    try {
      const response = await fetch(
        "https://schronisko-7cfd1.firebaseio.com/animals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedAnimals = [];

      for (const key in resData) {
        loadedAnimals.push(
          new Animal(
            key,
            "u1",
            resData[key].category,
            resData[key].age,
            resData[key].title,
            resData[key].imageUrl,
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

export const setFilters = (filterSettings) => {
  return {
    type: SET_FILTERS,
    filters: filterSettings,
  };
};

export const deleteAnimal = (animalId) => {
  return async (dispatch) => {
    //any async code http://176.107.131.27:5000/animals/new
    const response = await fetch(
      `https://schronisko-7cfd1.firebaseio.com/animals/${animalId}.json`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({ type: DELETE_ANIMAL, pid: animalId });
  };
};

export const createAnimal = (title, category, age, description, imageUrl) => {
  return async (dispatch) => {
    //any async code http://176.107.131.27:5000/animals/new
    const response = await fetch(
      "https://schronisko-7cfd1.firebaseio.com/animals.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          category,
          age,
          description,
          imageUrl,
        }),
      }
    );
    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: CREATE_ANIMAL,
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
export const UpdateAnimal = (
  id,
  title,
  category,
  age,
  description,
  imageUrl
) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://schronisko-7cfd1.firebaseio.com/animals/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          category,
          age,
          description,
          imageUrl,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
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
