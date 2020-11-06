import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../store/actions/auth";

const DonationScreen = (props) => {
  const [amount, setAmount] = useState(10);
  const [amountisValid, setAmountisValid] = useState(false);
  const [touched, setTouched] = useState(false);

  const dispatch = useDispatch();

  const textChangeHandler = (text) => {
    setTouched(true);
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
      dispatch(userActions.UpdateDonation(amount));
      Alert.alert(
        "Udało się!",
        "Pieniądze bezpiecznie powędrowały do naszych zwierząt"
      );
      //send
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.formControl}>
        <Text style={styles.label}>Wpisz ilość!</Text>
        <TextInput
          style={styles.input}
          value={amount.toString()}
          placeholder='ile'
          keyboardType='numeric'
          onChangeText={(text) => textChangeHandler(text)}
        />
        <View style={styles.buttonContainer}>
          <Button title='Podaruj' onPress={submitHandler} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  formControl: {
    width: "100%",
    padding: 10,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  label: {
    marginVertical: 8,
  },
});

export default DonationScreen;
