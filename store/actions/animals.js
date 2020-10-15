export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const CREATE_ANIMAL = "CREATE_ANIMAL";
export const UPDATE_ANIMAL = "UPDATE_ANIMAL";

export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, animalId: id };
};

export const createAnimal = (title, age, description, imageUrl) => {
  return {
    type: CREATE_ANIMAL,
    animalData: {
      title,
      age,
      description,
      imageUrl,
    },
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
