import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, Button, Pressable, Platform, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { createNotification } from '../../services/userService';
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

export default function NotiAddition({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [text, onChangeText] = useState('');
  const [value, setValue] = useState('');
  const [time, setTime] = useState('');
  const [timePicker, setTimePicker] = useState(false);
  const [user, setUser] = useState({});

    const toggleDatePicker = () => {
      setOpen(!open);
    }

    const toggleTimePicker = () => {
      setTimePicker(!timePicker);
    }

    const onChange = ({type}, selectedDate) => {
      if (type == "set") {
        const currentDate = selectedDate;
        setDate(currentDate);

        if (Platform.OS === "android") {
          toggleDatePicker();
          setValue(currentDate.toDateString().substring(4));
        }
      } else {
        toggleDatePicker();
      }
    }

    const onTimeChange = ({type}, selectedDate) => {
      if (type == "set") {
        const currentDate = selectedDate;
        setDate(currentDate);

        if (Platform.OS === "android") {
          toggleTimePicker();
          setTime(currentDate.toLocaleTimeString());
        }
      } else {
        toggleTimePicker();
      }
    }

    const confirmIOSDate = () => {
      setValue(date.toDateString());
      toggleDatePicker();
    }

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

    const sendNewNoti = async () => {
      const noti = {
        time: date.toISOString(),
        content: text
      };

      const res = await createNotification(user?.id, noti);
      return res.status == 200;
    }

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
                    Đặt thông báo
                </Text>
                <View>
                  <Text style={{marginHorizontal: '4%', fontSize: 16, marginTop: '3%'}}>Ngày</Text>

                  { open && <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChange}
                    style={styles.datePicker}
                  />}

                  {
                    open && Platform.OS === "ios" && 
                    (
                      <View
                        style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                          <TouchableOpacity
                            onPress={toggleDatePicker}>
                            <Text>Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={confirmIOSDate}>
                            <Text>Confirm</Text>
                          </TouchableOpacity>
                      </View>
                    )
                  }

                  <Pressable
                  onPress={toggleDatePicker}>
                    <View
                    style={{
                        backgroundColor: '#EFF9F1', marginTop:'3%', marginHorizontal: '2%', borderRadius: 20, borderWidth: 1, borderColor: '#3CAF58'
                    }}>
                        <TextInput
                          editable={false}
                          multiline={true}
                          numberOfLines={2}
                          onChangeText={text => onChangeText(text)}
                          value={value}
                          style={{padding: 10, color: "black"}}
                          placeholder="Chọn ngày..."
                          onPressIn={toggleDatePicker}
                      />
                    </View>
                  </Pressable>
                </View>
                <View>
                  <Text style={{marginHorizontal: '4%', fontSize: 16, marginTop: '3%'}}>Giờ</Text>

                  { timePicker && <DateTimePicker
                    mode="time"
                    display="spinner"
                    value={date}
                    onChange={onTimeChange}
                    style={styles.datePicker}
                  />}

                  {/* {
                    open && Platform.OS === "ios" && 
                    (
                      <View
                        style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                          <TouchableOpacity
                            onPress={toggleTimePicker}>
                            <Text>Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={confirmIOSDate}>
                            <Text>Confirm</Text>
                          </TouchableOpacity>
                      </View>
                    )
                  } */}

                  <Pressable
                  onPress={toggleTimePicker}>
                <View
                style={{
                    backgroundColor: '#EFF9F1', marginTop:'3%', marginHorizontal: '2%', borderRadius: 20, borderWidth: 1, borderColor: '#3CAF58'
                }}>
                    <TextInput
                      editable={false}
                      multiline={true}
                      numberOfLines={2}
                      value={time}
                      style={{padding: 10, color: "black"}}
                      placeholder="Chọn giờ..."
                      onPressIn={toggleTimePicker}
                  />
                </View>
                </Pressable>
                </View>
                <Text style={{marginHorizontal: '4%', fontSize: 16, marginTop: '3%'}}>
                  Nội dung
                </Text>
                <View
                style={{
                    backgroundColor: '#EFF9F1', marginTop:'3%', marginHorizontal: '2%', borderRadius: 20, borderWidth: 1, borderColor: '#3CAF58'
                }}>
                <TextInput
                    editable
                    multiline={true}
                    numberOfLines={2}
                    onChangeText={text => onChangeText(text)}
                    value={text}
                    style={{padding: 10, color: "black"}}
                    placeholder="Viết nội dung thông báo của bạn tại đây..."
                />
                </View>
            </View>
            <View style = {{ alignItems: 'center', marginTop: "5%"}}>
                <AppButton title={"Lưu thông báo"} 
                onPress={() => 
                {
                  // console.log("Date Pick: ", date.toISOString());
                  // console.log("Time pick: ", time);
                  // console.log("Content: ", text);
                  if (sendNewNoti())
                    navigation.navigate("CalendarScreen");
                  else
                  {
                    Alert.alert("Error", "Server side error!");
                  }
                }}/>
                <AppButton title={"Hủy"} titleStyle={{color: 'red'}} onPress={() => navigation.navigate("CalendarScreen")}/>
            </View> 
        </ScrollView>        
    )
}

const styles = StyleSheet.create({
  datePicker: {
    height: 120,
    marginTop: -10
  }
})