import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App({navigation}) {
  return (
    <SafeAreaView style = {signupStyle.signupMain}>
      <View style = {signupStyle.title}>
        <Text style = {{fontVariant:'roboto' ,fontWeight:'bold', fontSize:40, color:'#3CAF58'}}>Đăng Ký</Text>
      </View>
      <View style = {{flexDirection:'column'}}>
        <View>
          <Text style = {{fontVariant:'roboto' ,fontWeight:'regular', color:'black'}}>Họ và tên</Text>
          <TextInput
            style = {signupStyle.input}
          />
        </View>
        <View>
          <Text style = {{fontVariant:'roboto' ,fontWeight:'regular', color:'black'}}>Địa chỉ email</Text>
          <TextInput
            style = {signupStyle.input}
            placeholder=''
            placeholderTextColor = 'black'
          />
        </View>
        <View>
          <Text style = {{fontVariant:'roboto' ,fontWeight:'regular', color:'black'}}>Mật khẩu</Text>
          <TextInput 
            style = {signupStyle.input}
            placeholder=''
            placeholderTextColor = 'black'
          />
        </View>
        <View>
          <Text style = {{fontVariant:'roboto' ,fontWeight:'regular', color:'black'}}>Nhập lại mật khẩu</Text>
          <TextInput
            style = {signupStyle.input}
            placeholder=''
            placeholderTextColor = 'black'
          />
        </View>
      </View>
      <View style = {{alignItems:'center'}}>
        <View>
          <TouchableOpacity style = {signupStyle.submitButton}>
            <Text style={ signupStyle.submitButtonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
        <View style = {signupStyle.otherfunctionText}>
          <Text>Đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style = {{fontVariant:'roboto' ,fontWeight:'regular', color:'#3CAF58'}}>Đăng nhập ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const signupStyle = StyleSheet.create(
  {
    signupMain: {
      backgroundColor:'white',
      paddingHorizontal:30,
      borderColor: 'black',
      borderWidth: 1,
      margin: 10,
      height: 600
    },
    title:{
      marginTop: 30,
      alignItems: 'center',
      flexDirection: 'column'
    },
    input: {
      borderColor: 'black',
      borderWidth: 1
    },
    submitButton: {
      backgroundColor: '#3CAF58',
      padding: 10,
      margin: 15,
      height: 40,
      borderColor: '#3CAF58',
      alignItems:'center',
      borderWidth: 1
    },
    submitButtonText: {
      color: 'white'
    },
    otherfunctionText: {
      marginTop:10,
      flexDirection: 'row'
    },
  }
)
