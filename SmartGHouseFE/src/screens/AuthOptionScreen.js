import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function App({navigation}){
  return (
    <View style = {{flexDirection:'row', alignItems:'center', marginTop:60}}>
      <Image style = {{width: 50, height: 50, borderRadius: 100}} source={require('../Image/User_avatar.png')}/>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style = {{fontVariant:'roboto' ,fontWeight:'bold', fontSize:30, color:'#3CAF58'}}>Đăng nhập</Text>
      </TouchableOpacity>
      <Text style = {{fontVariant:'roboto' ,fontWeight:'bold', fontSize:40, color:'#3CAF58'}}>/</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style = {{fontVariant:'roboto' ,fontWeight:'bold', fontSize:30, color:'#3CAF58'}}>Đăng Ký</Text>
      </TouchableOpacity>
    </View>
  );
}
