/*eslint-disable */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import Icon from "react-native-vector-icons/MaterialIcons"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  View,
  Alert,

} from 'react-native';
import ListItem from './screens/ListItem';

const COLORS={primary:"#1f145c",white:"#fff"}

const todoList=[

  {id:1,task:"First todo", completed:true},
  {id:2,task:"Second todo", completed:false}
]

const App = () => {

  const [todos,setTodos]=useState([]);
  const [textInput,setTextInput]=useState("");


 useEffect(() => {
    saveTodoTouserDevice(todoList)
    getTodosFromUserDevice()
   
 }, [])


  
  const saveTodoTouserDevice = async todos => {

    try {
      const stringifyTodos = JSON.stringify(todos)
      await AsyncStorage.setItem('todos', stringifyTodos)
    } catch (e) {
      console.log(e)
    }}


  const getTodosFromUserDevice = async () => {
    try {
      const todos =await AsyncStorage.getItem("todos")
      if(todos !=null){
        setTodos(JSON.parse(todos))
      }
    } catch (e) {
      console.log(e)
    }}


const addTodo=()=>{
   if (!textInput =="") {
    
    const newTodo={
      id:Math.random(),
      task:textInput,
      completed:false,
    };
    setTodos([...todos,newTodo]);
  
    setTextInput("")
    
  }
  else{
    Alert.alert("Error","Please input todo")
  }
}




const clearTodos=()=>{
  Alert.alert("Confirm","Clear todos?",[
    {
      text:"Yes",
      onPress:()=>setTodos([]),
    },
    {
      text:"No",
      
    }]) }


 return (
  <SafeAreaView style={{flex:1,backgroundColor:COLORS.white}}>
    <View style={styles.header}>
      <Text style={{fontWeight:"bold",fontSize:20,color:COLORS.primary}}>TODO APP</Text>
      <Icon name="delete" size={25} color="red" onPress={()=>clearTodos()}/>
    </View>

<FlatList
contentContainerStyle={{padding:20,paddingBottom:100}}
showsVerticalScrollIndicator={false}
data={todos}
renderItem={(item)=><ListItem key={item.id} todo={item} todos={todos} setTodos={setTodos}/>}/>

    <View style={styles.footer}>
      <View style={styles.inputContainer}>
        <TextInput style={{fontSize:18}}
         placeholder='Add Todo'
         value={textInput}
         onChangeText={(text)=>setTextInput(text)}
         
         />
      </View>
      <TouchableOpacity onPress={()=>addTodo()}>
        <View style={styles.iconContainer}>
          <Icon name="add" color={COLORS.white} size={30}/>
        </View>

      </TouchableOpacity>

    </View>
 
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header:{
    padding: 20,
    flexDirection:'row',
    alignItems:"center",
    justifyContent:"space-between",

  },
  footer:{
    position: 'absolute',
    bottom: 0,
    width: "100%",
    flexDirection:'row',
    alignItems:"center",
    paddingHorizontal:20,
    color:COLORS.white,
    backgroundColor:COLORS.white,


  },
  inputContainer:{
    backgroundColor:COLORS.white,
    elevation:40,
    flex:1,

    height: 50,
    marginVertical:20,
    marginRight:20,
    borderRadius:30,
    paddingHorizontal:20,
   
  },
  iconContainer:{
    height:50,
    width: 50,
    backgroundColor:COLORS.primary,
    borderRadius:25,
    elevation:40,
    justifyContent:"center",
    alignItems:"center",

  },
  text:{
    color:"#000"
  }
  
});

export default App;
