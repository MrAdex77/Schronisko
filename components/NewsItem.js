import React from "react";
import {ScrollView,SafeAreaView,View, Text, StyleSheet } from "react-native";


const NewsItem = (props) => {
   const dt= new Date (props.date);
    const extractDate = (d) =>(
      (d.getDate()<10?"0"+d.getDate():d.getDate())+"-"+d.getMonth()+"-"+d.getFullYear()
    );
  return (
        <SafeAreaView style={styles.container}>
  
              
            
                <View style={styles.desc}>
                   <Text style={styles.txt1}>{props.Tittle}</Text>
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
