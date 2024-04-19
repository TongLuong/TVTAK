import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App({navigation}) {
    return (
        <SafeAreaView style = {loginStyle.loginMain}>
          <View style = {loginStyle.title}>
            <Ionicons name = 'person-circle' size = {60}/>
            <Text style = {loginStyle.titleText}>Đăng nhập</Text>
          </View>
          <View style = {{flexDirection:'column'}}>
            <View>
              <Text style = {loginStyle.inputTitle}>Địa chỉ email</Text>
              <TextInput
                style = {loginStyle.input}
                placeholder=''
                placeholderTextColor = 'black'
              />
            </View>
            <View>
              <Text style = {loginStyle.inputTitle}>Mật khẩu</Text>
              <TextInput 
                style = {loginStyle.input}
                placeholder=''
                placeholderTextColor = 'black'
              />
            </View>
            <View style = {{marginTop: 10}}>
              <TouchableOpacity style = {loginStyle.submitButton} onPress={() => navigation.navigate('Account')}>
                <Text style={ loginStyle.submitButtonText}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
            <View style = {loginStyle.otherfunction}>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style = {loginStyle.otherfunctionText}>Đăng ký</Text>
              </TouchableOpacity>
              <Text style = {{flex:1}}/>
              <TouchableOpacity onPress={() => navigation.navigate('Forget pass 1')}>
                <Text style = {loginStyle.otherfunctionText}>Quên mật khẩu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
    );
  }
  const loginStyle = StyleSheet.create(
    {
      loginMain: {
        backgroundColor:'white',
        paddingHorizontal:30,
        borderColor: 'black',
        borderWidth: 1,
        margin: 10,
        height: 500,
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
        margin: 15,
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
        flexDirection: 'row'
      },
      otherfunctionText: {
        fontVariant:'roboto' ,
        fontWeight:'regular', 
        color:'#3CAF58', 
      },
    }
  )
