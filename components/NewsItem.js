import React,{useState} from "react";
import {ScrollView,SafeAreaView,View, Text, StyleSheet,TouchableOpacity ,Alert} from "react-native";
import { useDispatch,useSelector } from "react-redux";
import * as newsActions from "../store/actions/news";
import { AntDesign } from '@expo/vector-icons'; 


const NewsItem = (props) => {
   const dt= new Date (props.date);

   const isAdmin = useSelector((state) => state.auth.user.isAdmin);

   const [color,setColor]=useState("rgba(0,0,0,0)");

   const dispatch = useDispatch();
   

   const deleteHandler = (id) => {
    setColor("rgba(255,0,0,0.3)");
    Alert.alert("Usunąć aktualnośc?" ,"Czy chcesz usunac tą aktualność?", [
      { text: "Nie", style: "default", onPress:()=> (setColor("rgba(0,0,0,0)"))},
      {
        text: "Tak",
        style: "destructive",
        onPress: () => {
          dispatch(newsActions.deleteNews(id));
        }, 
      },
    ]);
  };


    const extractDate = (d) =>(
      (d.getDate()<10?"0"+d.getDate():d.getDate())+"-"+d.getMonth()+"-"+d.getFullYear()
    );
  return (
    <SafeAreaView style={[styles.container,{backgroundColor:color}]}>



      <View style={styles.desc}>
        <Text style={styles.txt1}>{props.Tittle}</Text>

        {isAdmin && <TouchableOpacity style={styles.button2} onPress={deleteHandler.bind(this, props.id)}>
          <AntDesign name="delete" size={18} color="red" />
        </TouchableOpacity>}

        <Text style={styles.txt3}>{extractDate(dt)}</Text>
        <View style={styles.separator} />
        <Text style={styles.txt2}>{props.Desc}</Text>
      </View>



    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
     flex: 1,
    justifyContent: 'center',
    marginHorizontal:16,


  },
  desc:{
     flex:1,
     textAlign: 'center',
     marginTop:15,
     marginBottom:20,
     backgroundColor: 'rgba(200,200,200,0.3)',
  },
  txt1:{
    fontSize: 24,
    fontFamily:'open-sans',
    fontWeight: 'bold',
    padding:10,
  },
  txt2:{
    fontSize:16,
    fontFamily: 'open-sans',
    padding:15,
  },
  txt3:{
    fontSize:14,
    fontFamily: 'open-sans',
    paddingLeft:15,
    color:'#303030',
  },
  separator: {
     backgroundColor:'white',
     height:10,
     width: '100%',
     marginBottom:10,
     marginTop:10,
     
  }
});

export default NewsItem;
