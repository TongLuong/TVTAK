import { useEffect, useState } from "react";
import { View, Text, SectionList, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { getAllDevice, toggleDevice, deleteDevice } from '../../services/userService';

const DATA = [
    {
      data: [{
        id: -1,
        name: 'Loading...',
        status: 0,
        type: 'manual',
      }]
    }
  ];

const AppButton = ({ onPress, title, style, titleStyle }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[{
      width: '45%',
      backgroundColor: 'white',
      alignItems: 'center',
      marginBottom: 10,
      maxHeight: 35,
      borderRadius: 20,
      paddingHorizontal: '10%',
      elevation: 3
    }, style]}
  >
    <Text style={[{ fontSize: 19, fontVariant: 'roboto', color: '#3CAF58', paddingVertical: '1%' }, titleStyle,]}>
      {title}
    </Text>
  </TouchableOpacity>
);

var currStatus = [];

export default function DeviceList() {
    const [flag, setFlag] = useState(false);
    const [user, setUser] = useState(null);
    const [devices, setDevices] = useState(DATA);

    useEffect(() => {
      const getAllDevices = async () => {
        var userData = null;
        if (user == null)
        {
          const userRes = await AsyncStorage.getItem("User");
          userData = JSON.parse(userRes);
          setUser(userData);
        }

        var temp = user;
        if (user == null)
          temp = userData;

        const res = await getAllDevice(temp?.id);
        setDevices(
          [{
            data: JSON.parse(JSON.stringify(res.data)).map((item) => {
              if (currStatus.length < res.data.length)
                currStatus.push(item.status);

              return {
                id: item.id,
                name: item.name,
                status: item.status,
                type: item.type
              };
            })
          }]
        );
      };
      getAllDevices();
    }, [useIsFocused(), flag]);

    const toggleDeviceHandler = async (id, newStatus) => {
      const res = await toggleDevice(user?.id, id, newStatus);
      return res.status == 200;
    };

    const handleDeleteDevice = async (id) => {
      const res = await deleteDevice(user?.id, id);
      return res.status == 200;
    };

    return (
        <SafeAreaView style={styles.container}>
          <Text style={{ fontSize: 26, textAlign: 'center'}}>Cài đặt thiết bị</Text>
        <SectionList
          sections={devices}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({item, index}) => (
            <View style={styles.item}>
              <Text style={styles.title}>Tên thiết bị: {item.name}</Text>
              <Text style={styles.title}>Trạng thái: {currStatus[index] == 1 ? 'Bật' : "Tắt"}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '3%' }} >
                <AppButton title={"Tắt"} style={{ borderColor: 'red', borderWidth: 1}} titleStyle={{color: 'red'}} onPress={
                  () => {
                    if (toggleDeviceHandler(item.id, 0))
                    {
                      currStatus[index] = 0;
                    }
                    else
                      Alert.alert("Lỗi", "Lỗi máy chủ");
                    setFlag(!flag);
                  }
                }/>
                <AppButton title={"Bật"} style={{ borderColor: '#3CAF58', borderWidth: 1}} onPress={
                  () => {
                    if (toggleDeviceHandler(item.id, 1))
                    {
                      currStatus[index] = 1;
                    }
                    else
                      Alert.alert("Lỗi", "Lỗi máy chủ");
                    setFlag(!flag);
                  }
                }/>
              </View>
              <View style={{ flexDirection: 'row', marginTop: '3%', width: 600, marginLeft: "3.5%" }}>
                <AppButton title={"Xóa thiết bị"} style={{ borderColor: 'red', borderWidth: 1}} titleStyle={{color: 'red'}}
                  onPress={() => {
                    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa?",
                      [
                        {
                          text: "Hủy bỏ",
                          style: "cancel"
                        },
                        {
                          text: "OK",
                          onPress: () => {
                            if (deleteDevice(item.id))
                              Alert.alert("Thành công", "Thiết bị đã xóa!");
                            else
                              Alert.alert("Lỗi", "Lỗi máy chủ");
                            setFlag(!flag);
                          }
                        }
                      ]
                    );
                  }}
                />
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: '2%',
      marginHorizontal: 16,
      marginBottom: 65, 
      backgroundColor: '#EFF9F1',
    },
    item: {
      backgroundColor: '#FAF9F8',
      padding: 20,
      marginVertical: 8,
      elevation: 5,
      borderRadius: 20,
    },
    header: {
      fontSize: 32,
    },
    title: {
      fontSize: 24,
      marginBottom: '3%'
    },
  });