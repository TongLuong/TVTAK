import { Button, StyleSheet, Text, View } from 'react-native';
import styles from '../styles/styles';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper'

export default function App() {

  const navigation = useNavigation();
  // const [currentTime, setCurrentTime] = useState('');
  
  return (
  <>
    <View style={{ margin: 10, borderColor: 'black', borderWidth: 1}}>
      <View style={{ flexDirection: 'row', alignSelf: "center",justifyContent: 'space-around', alignItems: 'center', borderBottomWidth: 1, marginBottom: 10}}>
        <Text style={timeStyle.hours}>
          20:30{"  "}
        </Text>
        <Text style={timeStyle.date}>
          Thứ 5,{"\n"}
          ngày 15 tháng 5
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignSelf: "center", justifyContent: 'space-around', alignItems: 'center', borderBottomWidth: 1, gap: 20, marginBottom: 15, paddingBottom: 10}}>
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
      <Button
        onPress={() => {
          navigation.navigate('Manage')
        }}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>

    <View style={{ margin: 10, borderColor: 'black', borderWidth: 1}}>
    <DataTable>
      <DataTable.Row>
        <DataTable.Cell>Thiết bị</DataTable.Cell>
        <DataTable.Cell>
          <Button
          onPress={() => {
            navigation.navigate('History')
          }}
          title="Custom Alert here"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          />
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Header style={styles.tableHeader}> 
        <DataTable.Title style={{flex: 1.3}}>Tên thiết bị</DataTable.Title> 
        <DataTable.Title>Chế độ</DataTable.Title> 
        <DataTable.Title>Trạng thái</DataTable.Title>
      </DataTable.Header> 
      <DataTable.Row> 
        <DataTable.Cell style={{flex: 1.3}}>Hệ thống tưới</DataTable.Cell> 
        <DataTable.Cell>Thủ công</DataTable.Cell> 
        <DataTable.Cell>Không hoạt động</DataTable.Cell>
      </DataTable.Row> 
  
      <DataTable.Row> 
        <DataTable.Cell style={{flex: 1.3}}>Hệ thống chiếu sáng</DataTable.Cell> 
        <DataTable.Cell>Tự động</DataTable.Cell> 
        <DataTable.Cell>Đang hoạt động</DataTable.Cell>
      </DataTable.Row> 
      <DataTable.Row> 
      <DataTable.Cell style={{flex: 1.3}}>Cảm biến nhiệt độ</DataTable.Cell> 
        <DataTable.Cell>Thủ công</DataTable.Cell> 
        <DataTable.Cell>Không hoạt động</DataTable.Cell> 
      </DataTable.Row>
      <DataTable.Row> 
      <DataTable.Cell style={{flex: 1.3}}>Cảm biến độ ẩm</DataTable.Cell> 
        <DataTable.Cell>Tự động</DataTable.Cell> 
        <DataTable.Cell>Đang hoạt động</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell style={{flex: 1.4}}>
        <Button
        onPress={() => {
        }}
        title="Custom device here"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
        </DataTable.Cell>
        <DataTable.Cell style={{flex: 1.1}}>
        <Button
        onPress={() => {
          navigation.navigate('History')
        }}
        title="Move to another page"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
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
        alignSelf: 'center'
      },
      date: {
        fontSize: 24,
        alignSelf: 'center'
      }
    }
  )

  const statusStyle = StyleSheet.create({
    title: {
      fontSize: 18,
      alignSelf: 'center'
    },
    content: {
      fontSize: 37,
      alignSelf: 'center'
    }
  })