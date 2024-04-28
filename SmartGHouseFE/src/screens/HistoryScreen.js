import { StyleSheet, Text, View} from 'react-native';
import styles from '../styles/styles';
import { DataTable, Modal } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import { useEffect, useState } from 'react';
import {getDataByMonth} from '../services/userService';

const getCurrentMonth = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // January is 0
  return currentMonth;
};
const getCurrentYear = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return currentYear;
};
export default function HistoryScreen() {
  const [logDevice, setLogDevice] = useState([]);
  const [selectedValue, setSelectedValue] = useState("manual-light");
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedYear, setSelectedYear] = useState(getCurrentYear());
  const fetchData = async () => {
    try {
      const res = await getDataByMonth(selectedValue, selectedMonth, selectedYear);
      setLogDevice(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  } , [])
  useEffect(() => {
    fetchData();
  }, [selectedValue, selectedMonth, selectedYear])

 
    return (
    <>
 <View style={[styles.container, {marginTop: 88,marginLeft: 15, marginRight: 15, backgroundColor:'#EFF9F1', borderRadius: 30}]}>
 <Text style={{ fontSize: 23, color: '#3CAF58', flex: 1 }}>Lịch sử thiết bị</Text>
 <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
 <View style={{ flex: 3 }}> 
    <RNPickerSelect 
    value={selectedValue}
      onValueChange={(value) => setSelectedValue(value)}
      items={[
        { label: 'Hệ thống đèn', value: 'manual-light' },
        { label: 'Máy Bơm nước', value: 'manual-pump' },
      ]}
    />
  </View>
  <View style={{ flex: 1.8 , borderWidth: 1, borderColor: 'black', borderRadius: 5 }}> 
    <RNPickerSelect 
      value={selectedMonth}
      onValueChange={(value) => setSelectedMonth(value)}
      items={[
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
        { label: "11", value: 11 },
        { label: "12", value: 12 },
      ]}
      style={{
        inputAndroid: {
          textAlign: 'center', // Center align the selected value on Android
        },
        inputIOS: {
          textAlign: 'center', // Center align the selected value on iOS
        },
      }}
    />
  </View>
  <View style={{ flex: 2, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}> 
    <RNPickerSelect 
      value={selectedYear}
      onValueChange={(value) => setSelectedYear(value)}
      items={[
        { label: "2024", value: 2024 },
        { label: "2025", value: 2025 },
        { label: "2026", value: 2026 },
       
      ]}
      style={{
        inputAndroid: {
          textAlign: 'right', // Center align the selected value on Android
        },
        inputIOS: {
          textAlign: 'center', // Center align the selected value on iOS
        },
      }}
    />
  </View>

</View>
 <DataTable style={{marginTop: 10}}>
      <DataTable.Row style={{flex:1 }}>
        <DataTable.Cell> </DataTable.Cell>
        <DataTable.Cell >
       
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Header> 
        <DataTable.Cell style={{flex: 1}}>
          <Text style={{color: '#3CAF58'}}>
            Ngày
          </Text>
        </DataTable.Cell> 
        <DataTable.Title style={{flex: 0.8}}>
          <Text style={{color: '#3CAF58'}}>
            Giờ
          </Text>
        </DataTable.Title> 
        <DataTable.Title style={{flex: 1.2}}>
          <Text style={{color: '#3CAF58'}}>
            Thiết bị
          </Text>
        </DataTable.Title>
        <DataTable.Title>
        <Text style={{color: '#3CAF58'}}>
            Hoạt động 
          </Text>
        </DataTable.Title>
      </DataTable.Header> 
      {logDevice && logDevice.length > 0 && logDevice.slice(0, 5).map((item, index) => {
              // Create a new Date object from the timestamp
              const date = new Date(item.created_at);

              // Format the date and time as desired
              const formattedDate = date.toLocaleDateString(); // Example: "4/25/2024"
              const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); // Example: "3:00:53 PM"

              return (
                <DataTable.Row key={index}> 
                  <DataTable.Cell style={{flex: 1}} textStyle={{color: '#3CAF58'}}>{formattedDate}</DataTable.Cell> 
                  <DataTable.Cell style={{flex: 0.8}} textStyle={{color: '#3CAF58'}}>{formattedTime}</DataTable.Cell> 
                  <DataTable.Cell style={{flex: 1.2}} textStyle={{color: '#3CAF58'}}>Hệ thống đèn</DataTable.Cell>
                  <DataTable.Cell textStyle={{color: '#3CAF58'}}>{item.status ? "Bật" : "Tắt"}</DataTable.Cell>
                </DataTable.Row> 
              );
})}

    </DataTable> 
  
      </View>

      <View style={{backgroundColor: '#EFF9F1', marginTop: 10 ,marginBottom: 80, marginLeft: 15, marginRight: 15, borderRadius: 30}}>
        

  
      </View>
    </>    
    );
  }
  