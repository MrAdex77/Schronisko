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
import CustomButton from "../components/CustomButton";
import LoggedText from "../components/LoggedText";

const PedometerScreen = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);

  if (isLogged === false) {
    return <LoggedText />;
  }

  const shelterCoords = { latitude: 50.811294, longitude: 19.120867 };
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState(null);
  const [showPedometer, setShowPedometer] = useState(false);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [error, setError] = useState(null);
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
      await dispatch(userActions.UpdateSteps(currentStepCount));
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    pedometerHandler();
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert("Błąd!", error);
      setError(null);
    }
  }, [error]);

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
      let location = await Location.getCurrentPositionAsync({
        timeout: 10000,
      });
      //console.log(location);
      console.log(location.coords.latitude);
      let fetchedLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setPickedLocation(fetchedLocation);
      const distance = getDistance(shelterCoords, fetchedLocation);
      console.log(distance);
      if (distance <= 50000) {
        setShowPedometer(true);
      } else {
        setShowPedometer(false);
        Alert.alert(
          "Zła lokalizacja!",
          "Niestety nie jestes na terenie schroniska, uruchom jak juz będziesz!",
          [{ text: "Okay" }]
        );
      }
    } catch (err) {
      console.log(err.message);
      Alert.alert(
        "Nie udalo sie pobrac lokalizacji",
        "Prosze sprobowac ponownie pozniej",
        [{ text: "Ok" }]
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
          Czy Twój telefon obsługuje krokomierz?
          {isPedometerAvailable ? " tak" : " nie"}
        </Text>
        {!trackSteps && (
          <CustomButton
            style={styles.button}
            onPress={() => {
              watchSteps();
            }}>
            Zliczaj kroki
          </CustomButton>
        )}
        {trackSteps && (
          <CustomButton
            style={styles.button}
            onPress={() => {
              sendSteps();
            }}>
            Zatrzymaj liczenie
          </CustomButton>
        )}
        <Text>Zrobine kroki: {currentStepCount}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Aby zacząć rozpocznij skanowanie lokalizacji</Text>
      <CustomButton style={styles.button} onPress={getLocationHandler}>
        Lokalizacja
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginVertical: 20,
  },
});

export default PedometerScreen;
