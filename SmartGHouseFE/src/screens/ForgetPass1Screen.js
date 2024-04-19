import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App({navigation}) {
  return (
    <SafeAreaView style = {forget1Style.forget1Main}>
      <View style = {forget1Style.title}>
        <Text style = {forget1Style.titleText}>Quên mật khẩu</Text>
      </View>
      <View style = {{flexDirection:'column'}}>
        <View style = {{marginVertical:50}}>
          <Text style = {forget1Style.inputTitle}>Địa chỉ email</Text>
          <TextInput
            style = {forget1Style.input}
            placeholder=''
            placeholderTextColor = 'black'
          />
        </View>
        <View>
          <TouchableOpacity style = {forget1Style.submitButton} onPress={() => navigation.navigate('Forget pass 2')}>
            <Text style={ forget1Style.submitButtonText}>Tiếp theo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const forget1Style = StyleSheet.create(
  {
    forget1Main: {
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
      marginTop: 30,
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
  }
)