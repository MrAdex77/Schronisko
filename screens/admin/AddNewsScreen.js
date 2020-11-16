import React,{useState,useEffect} from "react";
import { TouchableOpacity,ImageBackground,View, Text,
   StyleSheet ,TextInput,ScrollView,Platform,SafeAreaView,
   Keyboard,TouchableWithoutFeedback,Button,Alert, KeyboardAvoidingView} from "react-native";
import axios from 'axios';

import * as SecureStore from "expo-secure-store";
import Colors from "../../constants/Colors";



const AddNewsScreen = (props) => {

 const [tittle,setTittle]=useState('');
 const [description,setDescripiton]=useState('');
 

 const tittleInputHandler = (enteredText) =>{
    setTittle(enteredText);
};
const descriptionInputHandler = (enteredText) =>{
    setDescripiton(enteredText);
};
 const addNewsHandler = () =>{
    console.log("Addnewshandler");
      
      Keyboard.dismiss();
      AddNewsAsync();
 };
 async function AddNewsAsync (){

     const token = await SecureStore.getItemAsync("token");
    
     
    try{
    await axios.post('http://176.107.131.27/panel/news/new',{
        title:tittle,
        description:description,
        token:token
    })
    
      .then( function(response) {
       console.log("udalo sie dodac newsa")
       console.log(response)
       setTittle('')
       setDescripiton('')
       Alert.alert("Dodano aktualność")
       
      }) .catch( function (error) {
        
        console.log("catch po axiosie  newsa");
        console.log(error);
        Alert.alert("Nie udalo sie,sprobuj ponownie");
        
      })

    }catch ( e ) {
  
        return {error: true};
      }

}

  return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={{ flex: 1 }}
  >
      <SafeAreaView style={{ flex:1 }}>
        <ScrollView  >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          
       <View style={styles.screen} >   
        
       <TextInput
        style={styles.input}
        placeholder="Tytuł..."
        multiline={false}
        maxLength={80}
        onChangeText={tittleInputHandler}
        value={tittle}
      />
      
      <TextInput
        style={styles.input3}
        multiline={true}
        maxLength={1000}
        placeholder="Treść..."
        onChangeText={descriptionInputHandler}
        value={description}
      />
     <TouchableOpacity   style={styles.btn} onPress={addNewsHandler}              >
       <Text style={styles.txt}>Opublikuj</Text>
     </TouchableOpacity>
      <View style={{ flex : 1} } /> 
     </View>
     
                        
     </TouchableWithoutFeedback>
     </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
  
  );
};



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-end",
  },
  input: {
    marginTop:10,
    flexDirection: "row",
    alignSelf: "center",
    width: "90%",
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    minHeight: 50, //... For dynamic height
    borderRadius: 50,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "gray",
    paddingLeft: 20, //... With respect to the min height, so that it doesn't cut
    paddingTop: 20, //... With respect to the min height, so that it doesn't cut
    paddingBottom: 20 ,//... With respect to the min height, so that it doesn't cut
    paddingRight:20,
  },
  input3:{
    marginTop:10,
    flexDirection: "row",
    alignSelf: "center",
    width: "90%",
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    minHeight: 50, //... For dynamic height
    borderRadius: 50,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "gray",
    paddingLeft: 20, //... With respect to the min height, so that it doesn't cut
    paddingTop: 20, //... With respect to the min height, so that it doesn't cut
    paddingBottom: 20, //... With respect to the min height, so that it doesn't cut
    paddingRight:20,

  },
  btn:{
    alignSelf:'center',
    marginTop:10,
    padding:20,
    width: "90%",
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    backgroundColor:'#0D9E47',
    borderRadius: 50,
  },
  txt:{
  alignSelf:'center',
  fontFamily:'open-sans',
  fontSize:20,
  color:"#fff",
  fontWeight:'bold',
  },
  scrollView:{
    alignSelf: "center",
  },
});

export default AddNewsScreen;
