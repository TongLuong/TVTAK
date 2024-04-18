import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function App({navigation}){
  return (
    <View>
        <View style = {{flexDirection:'row', alignItems:'center'}}>
            <Image style = {{width: 50, height: 50, borderRadius: 100}} source={require('../Image/User_avatar.png')}/>
            <Text style = {{fontVariant:'roboto' ,fontWeight:'bold', fontSize:40, color:'#3CAF58'}}>Email</Text>
        </View>
        <View style = {{flexDirection:'column'}}>
            <TouchableOpacity style = {accountStyle.functionButton}>
                <Text style={ accountStyle.functionButtonText}>Thông tin người dùng</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {accountStyle.functionButton} onPress={() => navigation.navigate('Authop')}>
                <Text style={ accountStyle.functionButtonText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const accountStyle = StyleSheet.create(
    {
      functionButton: {
        backgroundColor: 'white',
        padding: 10,
        margin: 15,
        height: 40,
        borderColor: '#3CAF58',
        alignItems:'center',
        borderWidth: 1,
      },
      functionButtonText: {
        color: 'black'
      }
    }
  )
