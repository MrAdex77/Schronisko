import React from "react";
import {ScrollView,SafeAreaView,View, Text, StyleSheet,TouchableOpacity,Alert } from "react-native";

import { AntDesign } from '@expo/vector-icons'; 
import Colors from "../constants/Colors";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import * as walkActions from "../store/actions/walk";
import { NavigationActions, StackActions } from "react-navigation";

const WalkItem = (props) => {
const date= new Date (props.date);
const endDate = new Date(props.endDate);

const dispatch = useDispatch();

const deleteHandler = (id) => {
    Alert.alert("Usunąć wolontariat?" ,"Czy chcesz usunac ten wolontariat?", [
      { text: "Nie", style: "default" },
      {
        text: "Tak",
        style: "destructive",
        onPress: () => {
          dispatch(walkActions.deleteWalk(id));
        }, 
      },
    ]);
  };



const extractDate = ()=>((date.getDate()<10?"0"+date.getDate():date.getDate())+"-"+(date.getMonth()<10?"0"+date.getMonth():date.getMonth())+"-"+date.getFullYear());
const extractTime = ()=>(date.getHours()+":"+(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()));
const extractEndTime = ()=>(endDate.getHours()+":"+(endDate.getMinutes()<10?"0"+endDate.getMinutes():endDate.getMinutes()));
const extractEndDate = ()=>((endDate.getDate()<10?"0"+endDate.getDate():endDate.getDate())+"-"+(endDate.getMonth()<10?"0"+endDate.getMonth():endDate.getMonth())+"-"+endDate.getFullYear());
  return (  
    <View style={styles.container}>
       <View style={{flexDirection:'row'}}  >
       <Text style={styles.txt1}>W dniu {extractDate()}</Text>
       <TouchableOpacity style={styles.button2} onPress={deleteHandler.bind(this,props.id)}>
            <AntDesign name="delete" size={24} color={Colors.primaryColor} />
          </TouchableOpacity>
       </View>
       <View style={styles.line}>
       <Text style={styles.txt1}>od {extractTime()} do {extractEndTime()}</Text>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
     flex: 1,
     alignItems:'center',
     
    // justifyContent: 'space-evenly' ,
     margin: 15,
  },
  line:{
    padding:20,
     borderBottomColor:"#000000",
     borderBottomWidth: StyleSheet.hairlineWidth,
     
  },
  line2:{
    padding:4,
     borderTopColor:"#000000",
     borderTopWidth: StyleSheet.hairlineWidth,
     
  },
  txt1:{
    alignSelf:'center',
    fontFamily:'open-sans',
    fontSize:20,
    color:"#808080",
    marginRight: 15.
    
  },

});

export default WalkItem;
