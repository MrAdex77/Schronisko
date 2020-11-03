import React from "react";
import {ImageBackground,ScrollView, View, Text, StyleSheet,Linking,Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons,FontAwesome } from '@expo/vector-icons'; 


const days=[
    {day: 'Poniedziałek',hours: '10.00-14.00',key: '1'},
    {day: 'Wtorek',hours: '10.00-18.00',key: '2'},
    {day: 'Środa',hours: '10.00-18.00',key: '3'},
    {day: 'Czwartek',hours: '10.00-14.00',key: '4'},
    {day: 'Piątek',hours: '10.00-14.00',key: '5'},
    {day: 'Sobota',hours: '10.00-14.00',key: '6'},
    {day: 'Niedziela',hours: 'zamknięte',key: '7'},
]
const phone='12345678';
const mail='abc@abc.com';

const ContactScreen = (props) => {

     const openDial= ()=>{
         try{
          if(Platform.OS === "android")
          {
            Linking.canOpenURL(`tel:${phone}`)
            .then(supported => {
              if (!supported) {
                // handle the error
                console.log("blad open dialer")
                throw new Error("Error open dialer andro");
              } else {
                return Linking.openURL(`tel:${phone}`);
              }
            }) .catch( function (Error) {
        
                console.log("catch po dialer android");
                console.log(Error);
              })
          }else{
            Linking.canOpenURL(`telprompt:${phone}`)
            .then(supported => {
              if (!supported) {
                // handle the error
                console.log("blad open dialer")
                throw new Error("Error open dialer ios");
                   
              } else {
                return Linking.openURL(`telprompt:${phone}`);
              }
            }) .catch( function (Error) {
        
                console.log("catch po dialer ios");
                console.log(Error);
              })
          }
        
     }catch (e){
         
        return{Error: true};
     }}
    const openMail =()=>{
        Linking.openURL(`mailto:${mail}`)
    }



  return (
    <ImageBackground source={require('../img/dog.png')} style={styles.screen}>
        <ScrollView>
      <Text  style={styles.tittle}> Godziny otwarcia dla odwiedzających: </Text>

      {
          days.map(item => (<View key={item.key}>
              <Text style={styles.innerDays}>{item.day} {item.hours}</Text>
          </View>))
      }
     
      <Text  style={styles.tittle}> Schronisko dla Bezdomnych Zwierząt PodajŁapę </Text>
      <Text style={styles.tittle}>Adres:</Text>
      <Text style={styles.inner}>ul. Gilowa 44/4642- 202 Częstochowa' </Text>
      <Text style={styles.tittle}>E-mail </Text>
      <View style={styles.item}>
          <TouchableOpacity style={styles.btn} onPress={()=>openMail()}>
              <Ionicons name="ios-mail" size={34} color="black" />
              <Text style={styles.inner}>{mail}</Text>
          </TouchableOpacity>
      </View>
      <Text style={styles.tittle}>Telefon </Text>
      <View style={styles.item}>
          <TouchableOpacity style={styles.btn} onPress={()=>openDial()}>
              <FontAwesome name="phone-square" size={30} color="black" />
              <Text style={styles.inner}>{phone}</Text>
          </TouchableOpacity>
      </View>
      <Text style={styles.inner}>    </Text>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    resizeMode:"cover",
    justifyContent: "center",
    
  },
  tittle: {
     color: 'white',
     fontFamily: 'open-sans',
     fontSize: 30,
     textAlign: 'center',
     fontWeight:'bold',
     padding:5,
     margin:5,
  },
  inner: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    paddingRight:20,
    margin:5,
    paddingBottom:10,
    

  },
  innerDays: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'left',
    paddingRight:20,
    margin:5,
    paddingLeft:15,
  },
  item:{
    flex: 1,
    margin: 15,
    height: 100,
    overflow: "hidden",
    
  },
  btn:{
  backgroundColor:'rgba(52,52,52,0.4)',
  flex: 1,
  shadowColor: "black",
  shadowOpacity: 0.26,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 10,
  elevation: 3,
  padding: 20,
  flexDirection:'row',
  justifyContent: "space-evenly",
  alignItems: "center",
  alignSelf:'center',
  },
 
});

export default ContactScreen;
