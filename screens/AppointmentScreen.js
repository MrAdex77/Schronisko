import React,{useState,useEffect,useCallback} from "react";
import { View, Text, StyleSheet,Button,ActivityIndicator,FlatList,TouchableOpacity,Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useDispatch,useSelector } from "react-redux";
import Colors from "../constants/Colors";
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';
import * as walkActions from "../store/actions/walk";
import WalkItem from "../components/WalkItem";
import { NavigationActions, StackActions } from "react-navigation";

const AppointmentScreen = (props) => {

  

  const[error,SetError]=useState(false);
  const[isLoading,setIsLoading]=useState(false);
  const data=useSelector((state) => state.walks.walks);
  
  const dispatch = useDispatch();
  
  const loadWalks = useCallback(async () => {
    SetError(null);
    setIsLoading(true);
    try {
      await dispatch(walkActions.GetWalksAsync());
    } catch (err) {
      SetError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, SetError]);
  
  const renderWalkItem= (itemData) =>{

    return(
      <WalkItem
        date={itemData.item.startTime}
        endDate={itemData.item.endTime}
        id={itemData.item._id}
      />
    );
   };

   useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadWalks);

    return () => {
      willFocusSub.remove();
    };
  }, [loadWalks]);

   useEffect(() => {
    loadWalks();
  }, [dispatch, loadWalks]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Wystąpił błąd! </Text>
        <Button
          title='Spróbuj ponownie'
          onPress={loadWalks}
          color={Colors.primaryColor}
        />
      </View>
    );
  }
  
  
  return (
    <View style={styles.screen}>
       <FlatList
        keyExtractor={(item, index) => item._id}
        data={data}
        extraData={data}
        renderItem={renderWalkItem}
        style={{ width: "100%" }}
      /> 
    </View>
    
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
  },
  button2: {
    position:'absolute',
    //flex:1,
    //justifyContent:'flex-end',
    zIndex:30,
    padding:5,
    backgroundColor:"black",
    
  },
});

export default AppointmentScreen;
