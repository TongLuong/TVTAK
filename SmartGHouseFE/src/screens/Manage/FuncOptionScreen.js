import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App({navigation}){
  return (
    <View style = {{backgroundColor: '#EFF9F1', flex: 1}}>
        <View style = {funcopStyle.title}>
            <Text style = {funcopStyle.nameText}>Chọn chức năng</Text>
        </View>
        <View style = {{flexDirection:'column', marginTop: 50}}>
            <TouchableOpacity style = {funcopStyle.functionButton} onPress={() => navigation.navigate('Methodop', data ={func: "light"})}>
                <Ionicons name = 'sunny-outline' size = {20}/>
                <Text style={funcopStyle.functionButtonText}>Chiếu sáng</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {funcopStyle.functionButton} onPress={() => navigation.navigate('Methodop', data = {func: "water"})}>
                <Ionicons name = 'water-outline' size = {20}/>
                <Text style={ funcopStyle.functionButtonText}>Tưới tiêu</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const funcopStyle = StyleSheet.create(
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
