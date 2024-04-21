import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import styles from '../styles/styles';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { DataTable, Modal } from 'react-native-paper';
import { getRecordLast } from '../services/userService';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: 'white',
      alignItems: 'center',
      width: "56%",
      alignSelf: 'center',
      marginBottom: 10,
      height: 26,
      borderRadius: 20
    }}
  >
    <Text style={{ fontSize: 15, fontVariant: 'roboto', color: '#3CAF58' }}>
      {title}
    </Text>
  </TouchableOpacity>
);

const AppButton1 = ({ onPress, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: 'white',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      height: 26,
      borderRadius: 20,
      paddingLeft: 30,
      paddingRight: 30
    }}
  >
    <Text style={{ fontSize: 14, fontVariant: 'roboto', color: '#3CAF58' }}>
      <Ionicons name='add-circle-outline' size={14} />
      {" " + title}
    </Text>
  </TouchableOpacity>
);

const AppButton2 = ({ onPress, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: 'white',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      height: 26,
      borderRadius: 20,
      paddingLeft: 30,
      paddingRight: 30,
    }}
  >
    <Text style={{ fontSize: 12, fontVariant: 'roboto', color: '#3CAF58' }}>
      {title}
    </Text>
  </TouchableOpacity>
);

const AppButton4 = ({ onPress, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: 'white',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      height: 26,
      borderRadius: 20,
      paddingLeft: 30,
      paddingRight: 30,
    }}
  >
    <Text style={{ fontSize: 12, fontVariant: 'roboto', color: '#3CAF58' }}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default function HomeScreen( {navigation} ) {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [humidity, setHumidity] = useState('0');
  const [temp, setTemp] = useState('0');
  const [light, setLight] = useState('0');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseHumid = await getRecordLast('iot-humid');
        setHumidity(responseHumid?.data?.value);
        const responseTemp = await getRecordLast('iot-temp');
        setTemp(responseTemp?.data?.value);
        const responseLight = await getRecordLast('iot-light');
        setLight(responseLight?.data?.value);
        
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []); 
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);

      const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
      const dayIndex = now.getDay();
      const date = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      setCurrentDate(`${days[dayIndex]},\nngày ${date} tháng ${month}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
  <View style={{paddingTop: 50}}>

    <View style={{ margin: 10, backgroundColor: '#EFF9F1', borderRadius: 45, padding: 10, marginTop: 20}}>
      <View style={{ flexDirection: 'row', alignSelf: "center",justifyContent: 'space-around', alignItems: 'center', borderBottomWidth: 1, marginBottom: 10, borderColor: '#3CAF58'}}>
        <Text style={timeStyle.hours}>
        {currentTime}
        </Text>
        <Text style={timeStyle.date}>
          {currentDate}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignSelf: "center", justifyContent: 'space-around', alignItems: 'center', borderBottomWidth: 1, gap: 20, marginBottom: 15, paddingBottom: 10, borderColor: '#3CAF58'}}>
        <View style={{alignItems: 'center'}}>
          <Text style={statusStyle.title}>Độ ẩm{"\n"}</Text>
          <Text style={statusStyle.content}>{humidity}%</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={statusStyle.title}>Nhiệt độ{"\n"}</Text>
          <Text style={statusStyle.content}>{temp}°</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={statusStyle.title}>Cường độ sáng{"\n"}</Text>
          <Text style={statusStyle.content}>{light} Lux</Text> 
        </View>
      </View>
      <AppButton title={"Đi đến Quản lý nhà kính"} onPress={() => {navigation.navigate('Manage')}}/>
    </View>

    <View style={{ margin: 10, backgroundColor: '#EFF9F1', borderRadius: 45, paddingTop: 10}}>
    <DataTable>
      <DataTable.Row>
        <DataTable.Cell> <Text style={{fontSize: 23, color: '#3CAF58'}}> <Ionicons size={20} name="settings-sharp"/>  Thiết bị</Text></DataTable.Cell>
        <DataTable.Cell>
          <View style={{justifyContent: 'center', paddingBottom: 10}}>
            <AppButton1 title={"Thêm thiết bị"} onPress={() => navigation.navigate('History')}/>
          </View>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Header> 
        <DataTable.Cell style={{flex: 1.3}}>
          <Text style={{color: '#3CAF58'}}>
            Tên thiết bị
          </Text>
        </DataTable.Cell> 
        <DataTable.Title>
          <Text style={{color: '#3CAF58'}}>
            Chế độ
          </Text>
        </DataTable.Title> 
        <DataTable.Title>
          <Text style={{color: '#3CAF58'}}>
            Trạng thái
          </Text>
        </DataTable.Title>
      </DataTable.Header> 
      <DataTable.Row> 
        <DataTable.Cell style={{flex: 1.3}} textStyle={{color: '#3CAF58'}}>Hệ thống tưới</DataTable.Cell> 
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Thủ công</DataTable.Cell> 
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Tắt</DataTable.Cell>
      </DataTable.Row> 
  
      <DataTable.Row> 
        <DataTable.Cell style={{flex: 1.3 }} textStyle={{color: '#3CAF58'}}>Hệ thống chiếu sáng</DataTable.Cell> 
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Tự động</DataTable.Cell> 
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Bật</DataTable.Cell>
      </DataTable.Row> 
      <DataTable.Row> 
      <DataTable.Cell style={{flex: 1.3}} textStyle={{color: '#3CAF58'}}>Cảm biến nhiệt độ</DataTable.Cell> 
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Thủ công</DataTable.Cell> 
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Tắt</DataTable.Cell> 
      </DataTable.Row>
      <DataTable.Row> 
      <DataTable.Cell style={{flex: 1.3}} textStyle={{color: '#3CAF58'}}>Cảm biến độ ẩm</DataTable.Cell> 
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Tự động</DataTable.Cell> 
        <DataTable.Cell textStyle={{color: '#3CAF58'}}  >Bật</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={{padding: 30}}>
        <DataTable.Cell style={{flex: 1.1}} textStyle={{color: '#3CAF58'}}>
        <AppButton2 title={"Cài đặt thiết bị"}/>
        </DataTable.Cell>
        <DataTable.Cell style={{flex: 1.4}}>
          <AppButton4 title={"Xem lịch sử hoạt động"} onPress={() => {navigation.navigate('History')}}/>
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable> 
    </View>

  </View>
    );
  }
  
  const timeStyle = StyleSheet.create(
    {
      hours: {
        fontSize: 40,
        alignSelf: 'center',
        color: '#3CAF58',
        paddingRight: 10
      },
      date: {
        fontSize: 24,
        alignSelf: 'center',
        color: '#3CAF58'
      }
    }
  )

  const statusStyle = StyleSheet.create({
    title: {
      fontSize: 18,
      alignSelf: 'center',
      color: '#3CAF58'
    },
    content: {
      fontSize: 37,
      alignSelf: 'center',
      color: '#3CAF58'
    }
  })
