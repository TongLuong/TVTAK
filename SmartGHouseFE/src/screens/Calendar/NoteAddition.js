import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { createNewNote } from '../../services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppButton = ({ onPress, title, style, titleStyle }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[{
        width: '60%',
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: 10,
        maxHeight: 35,
        borderRadius: 20,
        paddingHorizontal: '10%'
      }, style]}
    >
      <Text style={[{ fontSize: 20, fontVariant: 'roboto', color: '#3CAF58', paddingVertical: '1%' }, titleStyle,]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

export default function NoteAddition({ navigation }) {
    const [value, onChangeText] = useState('');
    const [user, setUser] = useState({});

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const user = await AsyncStorage.getItem("User");
          const userData = JSON.parse(user);
          setUser(userData);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }, []);

    const sendNewNote = async () => {
      const note = {
        content: value
      };

      const res = await createNewNote(user?.id, note);
      return res.status;
    };

    return (
        <ScrollView style={{marginBottom: 65}}>
            <View>
                <Text
                style={{
                fontSize: 23,
                color: "#3CAF58",
                alignSelf: "center",
                marginTop: '5%'
            }}>
                    Thêm ghi chú
                </Text>
                <View
                style={{
                    backgroundColor: '#EFF9F1', marginTop:'3%', marginHorizontal: '2%', borderRadius: 20, borderWidth: 1, borderColor: '#3CAF58'
                }}>
                <TextInput
                    editable
                    multiline={true}
                    numberOfLines={20}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    style={{padding: 10, color: "black", alignItems: 'center'}}
                    placeholder="Viết ghi chú của bạn tại đây..."
                />
                </View>
            </View>
            <View style = {{ alignItems: 'center', marginTop: "5%"}}>
                <AppButton title={"Lưu ghi chú"} onPress={() => {
                  if (sendNewNote())
                    navigation.navigate("CalendarScreen");
                  else
                  {
                    Alert.alert("Error", "Server side error!");
                  }
                }}/>
                <AppButton title={"Hủy"} titleStyle={{color: 'red'}} onPress={() => navigation.navigate("CalendarScreen")}/>
                <AppButton title={"Xóa tất cả"} titleStyle={{color: 'black'}} onPress={() => {onChangeText('')}}/>
            </View> 
        </ScrollView>        
    )
}