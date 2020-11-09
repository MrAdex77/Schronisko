import React,{useState} from "react";
import {Alert,ScrollView,Button, View, Text, StyleSheet,Platform ,TouchableOpacity} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import Colors from "../constants/Colors";
import axios from "axios";
const SignUpOnWalkScreen = (props) => {
  //const [date, setDate] = useState(new Date(1598051730000));
  
  const [date, setDate] = useState(new Date());
  const [endDate,setEndDate] = useState(new Date());
  const[count,setCount] = useState(1);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [check,setCheck] = useState(false);
  
  
  const maxdate = new Date();
  maxdate.setDate(maxdate.getDate()+30);
  const mindate = new Date();
  mindate.setDate(mindate.getDate()+1);


const SetCountPlus = () =>{  
   if (count<=8 && endDate.getHours()<17) {
     setCount(count+1);
     const dd=new Date(date);
   
     dd.setHours(dd.getHours()+count);
   
     setEndDate(dd);
   } 
   if (count<=8 && endDate.getHours()===17 ) {
    const dd=new Date(date);
    const d=new Date(date);
    d.setMinutes(0);
    setCount(count+1);
    setCheck(true);

    dd.setHours(18);
    dd.setMinutes(0);
    setEndDate(dd);
    setDate(d);
   }
};
const SetCountMinus = () =>{  
  if (count>1) {
    setCount(count-1);
    
    const dd = new Date(endDate);
   
    dd.setHours((dd.getHours())-1);
    
    setEndDate(dd);
  } 
  if(count === 2 && check) {
    setCount(count-1);
    const dd=new Date(date);
    setCheck(false);
    setEndDate(dd);
  }
};

const extractDate = ()=>(date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate());
const extractTime = ()=>(date.getHours()+":"+(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()));
const extractEndTime = ()=>(endDate.getHours()+":"+(endDate.getMinutes()<10?"0"+endDate.getMinutes():endDate.getMinutes()));
const extractEndDate = ()=>(endDate.getFullYear()+"-"+endDate.getMonth()+"-"+endDate.getDate());
const checkDate = () => {
  
 if (date.getDay() === 0) {
  
   Alert.alert("W niedziele schronisko jest zamkniete");
 } else {
  if (date.getHours() >= 10 && date.getHours() <= 17 && endDate.getHours() >= date.getHours()  ) {
    if (date.getHours() === endDate.getHours() && date.getMinutes() === endDate.getMinutes()) {
      Alert.alert("Popraw godzinę")
    } else {
      AddWalkAsync();
    }
} else {
  Alert.alert("Schronisko jest czynne od 10 do 18 popraw godzine ")
}
 }
};




  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setEndDate(currentDate);
    setCount(1);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  async function AddWalkAsync (){

    const token = await SecureStore.getItemAsync("token");
   
    
   try{
   await axios.patch('http://176.107.131.27/panel/walk/new',{
       date: date,
       token:token
   })
   
     .then( function(response) {
      console.log("udalo sie dodac spacer")
      console.log(response)
      
      Alert.alert("Dodano spacer")
      
     }) .catch( function (error) {
       
       console.log("catch po axiosie  spaceru");
       console.log(error);
       Alert.alert("Nie udalo sie,sprobuj ponownie");
       
     })

   }catch ( e ) {
 
       return {error: true};
     }

}

  return (
    <View style={styles.screen}>
      <View>
        {/* <Button onPress={showDatepicker} color={Colors.primaryColor} title="Wybierz datę spaceru" /> */}
        <TouchableOpacity   style={styles.btn} onPress={showDatepicker}          >
       <Text style={styles.txt}>Wybierz datę spaceru</Text>
       </TouchableOpacity>
      </View>
      <View>
        {/* <Button onPress={showTimepicker} color={Colors.primaryColor} title="Wybierz godzinę rozpoczecia" /> */}
        <TouchableOpacity   style={styles.btn} onPress={showTimepicker}          >
       <Text style={styles.txt}>Wybierz godzinę rozpoczęcia</Text>
       </TouchableOpacity>
      </View>
     
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={mindate}
          maximumDate={maxdate}
          
        />
      )}
      
      <View style={styles.line2}>
      <Text style={styles.txt1}>Data rozpoczęcia: {extractDate()} </Text>
      {/* <Text style={styles.txt1}>Godzina rozpoczęcia: {extractTime()} </Text> */}
      </View>
       <View style={styles.line}>
       <Text style={styles.txt1}>Godzina rozpoczęcia: {extractTime()} </Text>
       </View>
      <View>
        <Text style={styles.txt1}>Ilośc spacerów(ilosc godzin)</Text>
      </View>
      <View>
      <Text style={styles.txt2} >{count-1}</Text>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View>
        {/* <Button onPress={SetCountPlus} color={Colors.primaryColor} title="+ spacer" /> */}
        <TouchableOpacity   style={styles.btn1} onPress={SetCountPlus}          >
       <Text style={styles.txt}>+</Text>
       </TouchableOpacity>
        </View>
        <View style={{width:1}}></View>
        <View>
        {/* <Button onPress={SetCountMinus} color={Colors.primaryColor} title="- spacer" /> */}
        <TouchableOpacity   style={styles.btn2} onPress={SetCountMinus}          >
       <Text style={styles.txt}>-</Text>
       </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line2}>
      <Text style={styles.txt1}>Data zakonczenia {extractEndDate()}</Text>
      </View>
      <View style={styles.line}>
        {/* <Text style={styles.txt1}>Data zakonczenia {extractEndDate()}</Text> */}
      <Text style={styles.txt1}>Godzina zakonczenia: {extractEndTime()} </Text>
      </View>
      <View>
        {/* <Button  onPress={checkDate} color={Colors.primaryColor} title="Umów się na spacer"/> */}
        <TouchableOpacity   style={styles.btn} onPress={checkDate}        >
       <Text style={styles.txt}>Umów się na spacer</Text>
       </TouchableOpacity>
      </View>
        <View>
           {/* <Text style={styles.txt1}>Twoje spacery:</Text>
            <Text style={styles.txt1}>Spacer z psem</Text> */}
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
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
  btn1:{
    alignSelf:'center',
    marginTop:10,
    padding:20,
    width: "90%",
    marginLeft: 5,
    //marginRight: 5,
    marginBottom: 10,
    backgroundColor:'#0D9E47',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  btn2:{
    alignSelf:'center',
    marginTop:10,
    padding:20,
    width: "90%",
    //marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    backgroundColor:'#0D9E47',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  txt:{
    alignSelf:'center',
    fontFamily:'open-sans',
    fontSize:20,
    color:"#fff",
    fontWeight:'bold',
    },
    txt1:{
      alignSelf:'center',
      fontFamily:'open-sans',
      fontSize:20,
      color:"#808080",
      
      },
      txt2:{
        alignSelf:'center',
        fontFamily:'open-sans',
        fontSize:30,
        color:"#808080",
        fontWeight:'bold',
        },
      line:{
        padding:4,
         borderBottomColor:"#000000",
         borderBottomWidth: StyleSheet.hairlineWidth,
         
      },
      line2:{
        padding:4,
         borderTopColor:"#000000",
         borderTopWidth: StyleSheet.hairlineWidth,
         
      },
});

export default SignUpOnWalkScreen;
