import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect} from 'react';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
export default function AccountScreen({navigation}){
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await AsyncStorage.getItem('User');
        const userData = JSON.parse(user);
        if (!userData) {
          navigation.navigate('UserScreen');
        }
        console.log(userData);
        
      } catch (error) {
        console.log(error);
      }
    }
    checkLogin();
  });
  return (
    <View style = {{backgroundColor: '#EFF9F1', flex: 1}}>
        <View style = {accountStyle.accountSym}>
            <Ionicons name = 'person-circle' size = {60}/>
            <Text style = {accountStyle.nameText}>Email</Text>
        </View>
        <View style = {{flexDirection:'column', marginTop: 50}}>
            <TouchableOpacity style = {accountStyle.functionButton}>
                <Text style={ accountStyle.functionButtonText}>Thông tin người dùng</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {accountStyle.functionButton} onPress={() => navigation.navigate('UserScreen')}>
                <Text style={ accountStyle.functionButtonText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const accountStyle = StyleSheet.create(
    {
      accountSym: {
        flexDirection:'row', 
        alignItems:'center', 
        marginTop: 20
      },
      nameText: {
        fontVariant:'roboto' ,
        fontWeight:'bold', 
        fontSize:40, 
        color:'#3CAF58'
      },
      functionButton: {
        backgroundColor: 'white',
        padding: 10,
        margin: 15,
        height: 40,
        borderColor: '#3CAF58',
        alignItems:'center',
        borderWidth: 1,
        marginVertical: 50
      },
      functionButtonText: {
        color: 'black'
      }
    }
  )
