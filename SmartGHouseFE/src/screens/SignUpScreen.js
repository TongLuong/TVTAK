import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App({navigation}) {
  return (
    <SafeAreaView style = {signupStyle.signupMain}>
      <View style = {signupStyle.title}>
        <Text style = {signupStyle.titleText}>Đăng Ký</Text>
      </View>
      <View style = {{flexDirection:'column'}}>
        <View>
          <Text style = {signupStyle.inputTitle}>Họ và tên</Text>
          <TextInput
            style = {signupStyle.input}
          />
        </View>
        <View>
          <Text style = {signupStyle.inputTitle}>Địa chỉ email</Text>
          <TextInput
            style = {signupStyle.input}
            placeholder=''
            placeholderTextColor = 'black'
          />
        </View>
        <View>
          <Text style = {signupStyle.inputTitle}>Mật khẩu</Text>
          <TextInput 
            style = {signupStyle.input}
            placeholder=''
            placeholderTextColor = 'black'
          />
        </View>
        <View>
          <Text style = {signupStyle.inputTitle}>Nhập lại mật khẩu</Text>
          <TextInput
            style = {signupStyle.input}
            placeholder=''
            placeholderTextColor = 'black'
          />
        </View>
        <View>
          <TouchableOpacity style = {signupStyle.submitButton} onPress={() => navigation.navigate('Account')}>
            <Text style={ signupStyle.submitButtonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
        <View style = {signupStyle.otherfunction}>
          <Text>Đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style = {signupStyle.otherfunctionText}>Đăng nhập ngay</Text>
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
      paddingHorizontal: 40,
      borderColor: 'black',
      borderWidth: 1,
      margin: 10,
      height: 550,
      marginTop: 100,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    title:{
      marginTop: 30,
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column'
    },
    titleText:{
        fontVariant:'roboto' ,
        fontWeight:'bold', 
        fontSize:40, 
        color:'#3CAF58'
      },
    input: {
      margin: 10,
      height: 40,
      borderColor: 'black',
      borderWidth: 1
    },
    inputTitle:{
        fontVariant:'roboto' ,
        fontWeight:'regular', 
        color:'black'
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
    otherfunction: {
        marginBottom: 20,
        marginLeft: 60,
        flexDirection: 'row'
      },
    otherfunctionText: {
      fontVariant:'roboto' ,
      fontWeight:'regular', 
      color:'#3CAF58', 
    },
  }
)
