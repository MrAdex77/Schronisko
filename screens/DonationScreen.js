import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../store/actions/auth";
import CustomButton from "../components/CustomButton";
import LoggedText from "../components/LoggedText";
const DonationScreen = (props) => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  
  if(isLogged === false){
    return(
       <LoggedText/>
    );
  };

  const [amount, setAmount] = useState(30);
  const [amountisValid, setAmountisValid] = useState(true);
  //const [touched, setTouched] = useState(false);

  const dispatch = useDispatch();

  const textChangeHandler = (text) => {
    //setTouched(true);
    if (text.trim().length === 0) {
      setAmountisValid(false);
    } else {
      setAmountisValid(true);
    }
    setAmount(text);
  };

  const submitHandler = async () => {
    if (!amountisValid) {
      Alert.alert("Wrong amount!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    if (amount) {
      try{
      dispatch(userActions.UpdateDonation(amount));
      Alert.alert(
        "Udało się!",
        "Pieniądze bezpiecznie powędrowały do schroniska"
      );}
      catch(e){
         console.log("Cos poszlo nie tak");
      };
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Darowizna </Text>
      </View>
      <View style={styles.formControl}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={amount.toString()}
            placeholder='ile'
            keyboardType='numeric'
            maxLength={7}
            onChangeText={(text) => textChangeHandler(text)}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <CustomButton
            style={styles.buttons}
            onPress={() => {
              setAmount(10);
              setAmountisValid(true);
            }}>
            10 zł
          </CustomButton>
          <CustomButton
            style={styles.buttons}
            onPress={() => {
              setAmount(20);
              setAmountisValid(true);
            }}>
            20 zł
          </CustomButton>
        </View>
        <View style={styles.buttonsContainer}>
          <CustomButton
            style={styles.buttons}
            onPress={() => {
              setAmount(30);
              setAmountisValid(true);
            }}>
            30 zł
          </CustomButton>
          <CustomButton
            style={styles.buttons}
            onPress={() => {
              setAmount(50);
              setAmountisValid(true);
            }}>
            50 zł
          </CustomButton>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton style={styles.button} onPress={submitHandler}>
            Wpłać
          </CustomButton>
        </View>
      </View>
    </View>
  );
};
DonationScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: () => null,
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 1,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  formControl: {
    width: "90%",
    padding: 10,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40,
  },
  button: {
    width: 300,
    alignItems: "center",
  },
  label: {
    marginVertical: 8,
    textAlign: "center",
  },
  header: {
    marginTop: 40,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "open-sans-bold",
  },
  buttons: {
    width: 100,
    alignItems: "center",
    margin: 10,
    backgroundColor: "#C4C4C4",
    color: "#FFFFFF",
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: { marginVertical: 40 },
});

export default DonationScreen;
