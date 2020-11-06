import React,{useState,useEffect} from "react";
import { 
        FlatList,
        View,
        Text,
        ActivityIndicator,
        Button,
        StyleSheet 
} from "react-native";
import NewsItem from "../components/NewsItem";
import Colors from "../constants/Colors";
import axios from 'axios';

const NewsScreen = (props) => {
    const dane2 =[];
    
    useEffect(()=>{
        GetNewsAsync();
    },[])
 
    const[isLoading,setIsLoading]=useState(true);
    const[data,setData]=useState('');
    async function GetNewsAsync (){
       try{
       await axios.get('http://176.107.131.27/panel/news/overview')
       
         .then( function(response) {
          console.log("udany get moje dane")
          //console.log(response.data.news)
          setIsLoading(false)
          setData(response.data.news)
         
          
          //console.log(response)
          
         }) .catch( function (error) {
           
           console.log("catch po axiosie pobranie  newsa");
           console.log(error);
         })
   
       }catch ( e ) {
     
           return {error: true};
         }
   
   }

  const renderNewsItem= (itemData) =>{

   return(
     <NewsItem
       Tittle={itemData.item.title}
       Desc={itemData.item.description}
       date={itemData.item.date}
     />
   );
  };
   if (isLoading) {
        return (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
          </View>
        );
      }
    return (
    <View style={styles.screen}>
        <FlatList
        keyExtractor={(item, index) => item._id}
        data={data}
        renderItem={renderNewsItem}
        style={{ width: "100%" }}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centered:
  {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default NewsScreen;
