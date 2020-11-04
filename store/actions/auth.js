import * as SecureStore from "expo-secure-store";
import * as Google from "expo-google-app-auth";

export const LOGIN = "LOGIN";

export const signInWithGoogleAsync = () => {
  return async (dispatch) => {
    try {
      const result = await Google.logInAsync({
        behavior: "web",
        androidClientId:
          "299847310816-epv8kb1rf2oc205ri1aqg20dv1ff8tq6.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const response = await fetch(`http://mateuszdobosz.site/auth/google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: result.idToken,
          }),
        });
        if (!response.ok) {
          console.log("blad");
          console.log(response.status);
          throw new Error("Something went wrong!");
        }
        //Alert.alert("Zalogowano", result.user.email + "\n" + result.user.name);
        const resData = await response.json();
        console.log(resData);
        await SecureStore.setItemAsync("token", JSON.stringify(resData.token));
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }

    dispatch({ type: LOGIN });
  };
};
