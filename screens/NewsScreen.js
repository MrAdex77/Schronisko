import React,{useState,useEffect,useCallback} from "react";
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
import { NavigationActions, StackActions } from "react-navigation";
import * as newsActions from "../store/actions/news";
import { useDispatch,useSelector } from "react-redux";

const NewsScreen = (props) => {
    
    
    const[error,SetError]=useState(false);
  const[isLoading,setIsLoading]=useState(false);
  const data=useSelector((state) => state.news.news);
  
  const dispatch = useDispatch();
  
  const loadNews = useCallback(async () => {
    SetError(null);
    setIsLoading(true);
    try {
      await dispatch(newsActions.GetNewsAsync());
    } catch (err) {
      SetError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, SetError]);

  const renderNewsItem = (itemData) => {

    return (
      <NewsItem
        Tittle={itemData.item.title}
        Desc={itemData.item.description}
        date={itemData.item.date}
        id={itemData.item._id}
      />
    );
  };


  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadNews);

    return () => {
      willFocusSub.remove();
    };
  }, [loadNews]);

  useEffect(() => {
    loadNews();
  }, [dispatch, loadNews]);

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
          onPress={loadNews}
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
