import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App({navigation}) {
  return (
    <SafeAreaView style = {forget2Style.forget2Main}>
      <View style = {forget2Style.title}>
        <Text style = {forget2Style.titleText}>Quên mật khẩu</Text>
      </View>
      <View style = {{flexDirection:'column'}}>
        <View style = {{marginVertical:10}}>
          <Text style = {forget2Style.nameText}>Email</Text>
          <View style = {forget2Style.nameBorder}>
            <Text style = {forget2Style.nameText}>Email@gmail.com</Text>
          </View>
          <Text style = {forget2Style.inputTitle}>Nhập mật khẩu mới</Text>
          <TextInput
            style = {forget2Style.input}
            placeholder=''
            placeholderTextColor = 'black'
          />
        </View>
        <View>
          <TouchableOpacity style = {forget2Style.submitButton} onPress={() => navigation.navigate('Account')}>
            <Text style={ forget2Style.submitButtonText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const forget2Style = StyleSheet.create(
  {
    forget2Main: {
      backgroundColor:'white',
      paddingHorizontal: 40,
      borderColor: 'black',
      borderWidth: 1,
      margin: 10,
      height: 400,
      marginTop: 170,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    title:{
      marginTop: 10,
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
      borderWidth: 1,
    },
    inputTitle:{
        fontVariant:'roboto' ,
        fontWeight:'regular', 
        color:'black',
        marginTop:20
      },
    nameBorder: {
      margin: 10,
      height: 40,
      borderColor: '#3CAF58',
      borderWidth: 1,
    },
    nameText: {
        fontVariant:'roboto' ,
        fontWeight:'regular', 
        color:'black',
        alignSelf:'center',
        marginTop: 10
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
  }
)