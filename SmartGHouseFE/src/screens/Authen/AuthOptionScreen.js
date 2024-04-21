import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App({navigation}){
  return (
    <View style = {authStyle.authMain}>
      <Ionicons name = 'person-circle' size = {60}/>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style = {authStyle.optionText}>Đăng nhập</Text>
      </TouchableOpacity>
      <Text style = {authStyle.optionText}>/</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style = {authStyle.optionText}>Đăng Ký</Text>
      </TouchableOpacity>
    </View>
  );
}

const authStyle = StyleSheet.create(
    {
      authMain: {
        flexDirection:'row', 
        alignItems:'center', 
        backgroundColor: '#EFF9F1', 
        flex:1, 
        marginLeft: 10
      },
      optionText:{
        fontVariant:'roboto' ,
        fontWeight:'bold', 
        fontSize:30, 
        color:'#3CAF58'
      },
    }
  )
