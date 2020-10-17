export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const CREATE_ANIMAL = "CREATE_ANIMAL";
export const UPDATE_ANIMAL = "UPDATE_ANIMAL";

export const fetchAnimals = () => {};

export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, animalId: id };
};

export const createAnimal = (title, age, description, imageUrl) => {
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
        age,
        description,
        imageUrl,
      },
    });
  };
};
export const UpdateAnimal = (id, title, age, description, imageUrl) => {
  return {
    type: UPDATE_ANIMAL,
    pid: id,
    animalData: {
      title,
      age,
      description,
      imageUrl,
    },
  };
};
