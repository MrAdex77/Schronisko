import * as SecureStore from "expo-secure-store";
import * as Google from "expo-google-app-auth";

import * as Facebook from "expo-facebook";
import axios from "axios";


import User from "../../models/user";

export const LOGIN = "LOGIN";
export const DONATE = "DONATE";

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
        const email = result.user.email;
        const name = result.user.name;
        const balance = response.balance;
        const newUser = new User(email, name, balance);
        const resData = await response.json();
        console.log(resData);
        await SecureStore.setItemAsync(
          "Googletoken",
          JSON.stringify(result.idToken)
        );
        await SecureStore.setItemAsync("token", JSON.stringify(resData.token));
        dispatch({
          type: LOGIN,
          user: newUser,
        });
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
};

export const googleLogIn = (token) => {
  return async (dispatch) => {
    try {
      //console.log("TOKEN: " + token);
      const response = await fetch(`http://mateuszdobosz.site/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });
      if (!response.ok) {
        console.log("blad");
        console.log(response.status);
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      console.log("Zalogowano: " + resData.name + " " + resData.balance);
      const name = resData.name;
      const balance = resData.balance;
      const newUser = new User("trololo@wp.pl", name, balance);
      await SecureStore.setItemAsync("token", JSON.stringify(resData.token));

      dispatch({
        type: LOGIN,
        user: newUser,
      });
    } catch (e) {
      return { error: true };
    }
  };
};

export const UpdateDonation = (amount) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(await SecureStore.getItemAsync("token"));
      const response = await fetch(
        `http://mateuszdobosz.site/user/donation/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            amount: amount,
          }),
        }
      );
      if (!response.ok) {
        console.log("blad");
        console.log(response.status);
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      //console.log(resData);
      const newAmount = resData.balance;
      dispatch({
        type: UpdateDonation,
        amount: newAmount,
      });
    } catch (e) {
      return { error: true };
    }
  };
};


export const signInWithFacebookAsync = () => {
  return async (dispatch) => {
    try {
      await Facebook.initializeAsync({
        appId: "652089999027908",
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        behavior: "web",
        permissions: ["public_profile"],
      });
      if (type === 'success') {
        console.log(type);
           await axios.post('http://176.107.131.27:5000/auth/facebook', {
          token: token
        })

          .then(async function (response) {

            console.log(JSON.stringify(response.data.token));
            //await SecureStore.setItemAsync("tokenfb", response.data.token);
            console.log(response.data)
            
            //const email = response.data.email;
            const name = response.data.name;
            //const balance = response.data.balance;
            const newUser = new User("abcmm@abcmm.pl", name, 1000);

            await SecureStore.setItemAsync("FacebookToken",  token);

            await SecureStore.setItemAsync("token", response.data.token);

            dispatch({
              type: LOGIN,
              user: newUser,
            });

          })
          .catch(function (error) {

            console.log("catch po axiosie");
            console.log(error);
          })
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }


  };
};


export const facebookLogIn = (token) => {
  return async (dispatch) => {
    try {
      await await axios.post('http://176.107.131.27:5000/auth/facebook', {
        
        token: token
      })

        .then(async function (response) {
          console.log("fbLogin success")
          console.log(response)
          console.log(response.data)
            
           // const email = response.data.email;
            const name = response.data.name;
           // const balance = response.data.balance;
            const newUser = new User("abcmm@abcmm.pl", name, 1000);

            await SecureStore.setItemAsync("token", response.data.token);

            dispatch({
              type: LOGIN,
              user: newUser,
            });
          

        }).catch(function (error) {

          console.log("catch po axiosie  loginFB");
          console.log(error);

        })

    } catch (e) {

      return { error: true };
    }


  };
};