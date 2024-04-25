import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App({navigation, route}){
  let option = route.params
  return (
    <View style = {{backgroundColor: '#EFF9F1', flex: 1}}>
        <View style = {methodopStyle.title}>
            <Text style = {methodopStyle.nameText}>Chọn tùy chọn</Text>
        </View>
        <View style = {{flexDirection:'column', marginTop: 50}}>
            <TouchableOpacity 
            style = {methodopStyle.functionButton} 
            onPress= {() => {
              let destination = (option.func === "light" ? 'Manuallight' : 'Manualwater')
              navigation.navigate(destination)
            }
            }>
                <Ionicons name = 'hand-left-outline' size = {20}/>
                <Text style={methodopStyle.functionButtonText}>Thủ công</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {methodopStyle.functionButton} onPress= {() => {
              let destination = (option.func === "light" ? 'autolight' : 'autowater')
              navigation.navigate(destination)
            }
            }>
                <Ionicons name = 'settings-outline' size = {20}/>
                <Text style={methodopStyle.functionButtonText}>Tự động</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const methodopStyle = StyleSheet.create(
    {
      title:{
        marginTop: 80,
        alignItems: 'center',
        flexDirection: 'column'
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
        marginVertical: 50,
        flexDirection: 'row'
      },
      functionButtonText: {
        color: 'black',
        marginLeft: 130
      }
    }
  )
