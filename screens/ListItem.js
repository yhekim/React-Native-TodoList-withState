/*eslint-disable */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import Icon from "react-native-vector-icons/MaterialIcons"

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
const COLORS={primary:"#1f145c",white:"#fff"}

const ListItem = ({todo,todos,setTodos}) => {
    const markTodo=(todoId)=>{
        //console.log("mark")
       setTodos(
         todos.map((todo)=>(todo.id==todoId)?{...todo,completed:!todo.completed}:todo)
       )
       }
       
       const deleteTodo = (todoId)=>{
         setTodos(
           todos.filter((todo)=>(todo.id !== todoId))
         )
       }
   

    return (
        <View style={styles.listItem}>
          <View style={{flex:1}}>
             <Text  style={[styles.text,{textDecorationLine:todo.item.completed ? 'line-through' : 'none',}]}>{todo.item.task}</Text>
          </View>
          {
            !todo.item.completed &&
            <TouchableOpacity style={[styles.actionIcon]} onPress={()=>markTodo(todo.item.id)}>
            <Icon name="done" size={20} color={COLORS.white}/>
          </TouchableOpacity>
          }
          
          <TouchableOpacity style={[styles.actionIcon,{backgroundColor:"red"}]} onPress={()=>deleteTodo(todo.item.id)}>
            <Icon name="delete" size={20} color={COLORS.white}/>
          </TouchableOpacity>
          
            
        </View>
    )}


    const styles = StyleSheet.create({
        listItem: {
            padding: 20,
            backgroundColor:COLORS.white,
            flexDirection:'row',
            elevation:12,
            borderRadius:7,
            marginVertical:10,
            
        }, 
        actionIcon:{
          height:25,
          width: 25,
          backgroundColor:"green",
          justifyContent:"center",
          alignItems:"center",
          marginLeft:5,
          borderRadius:3,
         },
         text:{
             color:"#000",
             fontSize:18,
         }
       
  
      });
      
      export default ListItem;