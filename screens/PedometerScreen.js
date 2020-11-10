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

const PedometerScreen = () => {
  const shelterCoords = { latitude: 50.811294, longitude: 19.120867 };
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();
  const [showPedometer, setShowPedometer] = useState(false);

  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
  const [currentStepCount, setCurrentStepCount] = useState(0);

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
    Pedometer.watchStepCount((result) => setCurrentStepCount(result.steps));
  };

  useEffect(() => {
    pedometerHandler();
  }, []);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
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
        timeout: 5000,
      });
      //console.log(location);
      setPickedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      const distance = getDistance(shelterCoords, pickedLocation);
      console.log(distance);
      if (distance <= 5000) {
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
        <ActivityIndicator size="large" color="red" />
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
        <Button
          title="zliczaj kroki"
          onPress={() => {
            watchSteps();
          }}
        />
        <Text>Zrobine kroki: {currentStepCount}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Pedometer Screen</Text>
      <Button title="lokalizacja" onPress={getLocationHandler} />
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
