import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  ActivityIndicator,
  Switch,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { getDistance } from "geolib";
import { Pedometer } from "expo-sensors";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../store/actions/auth";

const PedometerScreen = () => {
  const shelterCoords = { latitude: 50.811294, longitude: 19.120867 };
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();
  const [showPedometer, setShowPedometer] = useState(false);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const [trackSteps, setTrackSteps] = useState(false);

  const dispatch = useDispatch();

  const pedometerHandler = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    if (isAvailable) {
      setIsPedometerAvailable(true);
    } else {
      setIsPedometerAvailable(false);
    }
    //console.log(isAvailable);
  };

  const watchSteps = async () => {
    setTrackSteps(true);
    this.subscription = Pedometer.watchStepCount((result) =>
      setCurrentStepCount(result.steps)
    );
  };
  const sendSteps = async () => {
    try {
      setTrackSteps(false);
      this.subscription.remove();
      dispatch(userActions.UpdateSteps(currentStepCount));
      Alert.alert(
        "Udało się!",
        "Kroki zostały wysłane na serwer do statystyk!"
      );
    } catch (err) {
      Alert.alert("Błąd!", "Nie udało się wysłać kroków na serwer!");
    }
  };
  useEffect(() => {
    pedometerHandler();
  }, []);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status != "granted") {
      Alert.alert(
        "Brak pozwolenia!",
        "Musisz pozwolic aplikacji na dostep do lokalizacji!"
      ),
        [{ text: "Okay" }];
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 10000,
      });
      //console.log(location);
      setPickedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      const distance = getDistance(shelterCoords, pickedLocation);
      console.log(distance);
      if (distance <= 50000) {
        setShowPedometer(true);
      } else {
        setShowPedometer(false);
        Alert.alert(
          "Zła lokalizacja!",
          "Niestety nie jestes na terenie schroniska, odpal jak juz będziesz!",
          [{ text: "Okay" }]
        );
      }
    } catch (err) {
      console.log(err.message);
      Alert.alert(
        "Nie udalo sie pobrac lokalizacji!",
        "Prosze sprobowac ponownie pozniej!",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  if (!isPedometerAvailable) {
    return (
      <View style={styles.screen}>
        <Text>Niestety Twoje urządzenie nie obsługuje krokomierza! </Text>
      </View>
    );
  }

  if (isFetching) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size='large' color={Colors.primaryColor} />
      </View>
    );
  }

  if (showPedometer) {
    return (
      <View style={styles.screen}>
        <Text>
          Pedometer Screen, czy obsluguje?
          {isPedometerAvailable ? "tak" : "nie"}
        </Text>
        {!trackSteps && (
          <Button
            title='zliczaj kroki'
            onPress={() => {
              watchSteps();
            }}
          />
        )}
        {trackSteps && (
          <Button
            title='Zatrzymaj liczenie'
            onPress={() => {
              sendSteps();
            }}
          />
        )}
        <Text>Zrobine kroki: {currentStepCount}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Pedometer Screen</Text>
      <Button title='lokalizacja' onPress={getLocationHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PedometerScreen;
