import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import styles from '../styles/styles';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { DataTable, Modal } from 'react-native-paper';

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
      marginTop: 15,
      marginBottom: 15
    }}
  >
    <Text style={{ fontSize: 14, fontVariant: 'roboto', color: '#3CAF58' }}>
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
      marginTop: 15,
      marginBottom: 15
    }}
  >
    <Text style={{ fontSize: 14, fontVariant: 'roboto', color: '#3CAF58' }}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default function App() {

  return (
  <>

    <View style={{ margin: 10, backgroundColor: '#EFF9F1', borderRadius: 45, padding: 10, marginTop: 20}}>
      <View style={{ flexDirection: 'row', alignSelf: "center",justifyContent: 'space-around', alignItems: 'center', borderBottomWidth: 1, marginBottom: 10, borderColor: '#3CAF58'}}>
        <Text style={timeStyle.hours}>
          20:30{"  "}
        </Text>
        <Text style={timeStyle.date}>
          Thứ 5,{"\n"}
          ngày 15 tháng 5
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignSelf: "center", justifyContent: 'space-around', alignItems: 'center', borderBottomWidth: 1, gap: 20, marginBottom: 15, paddingBottom: 10, borderColor: '#3CAF58'}}>
        <View style={{alignItems: 'center'}}>
          <Text style={statusStyle.title}>Độ ẩm{"\n"}</Text>
          <Text style={statusStyle.content}>69 %</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={statusStyle.title}>Nhiệt độ{"\n"}</Text>
          <Text style={statusStyle.content}>25 °C</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={statusStyle.title}>Cường độ sáng{"\n"}</Text>
          <Text style={statusStyle.content}>85 Lux</Text> 
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
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Không hoạt động</DataTable.Cell>
      </DataTable.Row> 
  
      <DataTable.Row> 
        <DataTable.Cell style={{flex: 1.3 }} textStyle={{color: '#3CAF58'}}>Hệ thống chiếu sáng</DataTable.Cell> 
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Tự động</DataTable.Cell> 
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Đang hoạt động</DataTable.Cell>
      </DataTable.Row> 
      <DataTable.Row> 
      <DataTable.Cell style={{flex: 1.3}} textStyle={{color: '#3CAF58'}}>Cảm biến nhiệt độ</DataTable.Cell> 
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Thủ công</DataTable.Cell> 
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Không hoạt động</DataTable.Cell> 
      </DataTable.Row>
      <DataTable.Row> 
      <DataTable.Cell style={{flex: 1.3}} textStyle={{color: '#3CAF58'}}>Cảm biến độ ẩm</DataTable.Cell> 
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Tự động</DataTable.Cell> 
        <DataTable.Cell textStyle={{color: '#3CAF58'}}  >Đang hoạt động</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell style={{flex: 1.1}} textStyle={{color: '#3CAF58'}}>
        <AppButton2 title={"Cài đặt thiết bị"}/>
        </DataTable.Cell>
        <DataTable.Cell style={{flex: 1.4}}>
          <AppButton4 title={"Xem lịch sử hoạt động"} onPress={() => {navigation.navigate('History')}}/>
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable> 
    </View>

  </>
    );
  }
  
  const timeStyle = StyleSheet.create(
    {
      hours: {
        fontSize: 55,
        alignSelf: 'center',
        color: '#3CAF58',
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
