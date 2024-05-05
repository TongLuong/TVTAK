import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { DataTable, Checkbox } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toggleDevice } from '../../services/userService';
import { ScrollView } from 'react-native-gesture-handler';
export default function App() {
  const [checkedItems, setCheckedItems] = useState(Array(8).fill(false));
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [value, setValue] = useState(null);
  const [isEnded, setIsEnded] = useState(false);
  const [user, setUser] = useState({});
  const data = [
    { label: 'Tưới nhỏ giọt', value: '1' },
    { label: 'Tưới phun sương', value: '2' },
    { label: 'Tưới phun mưa', value: '3' },
  ];
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AsyncStorage.getItem('User');
        if (!user) {
          navigator.navigate('UserScreen');
        }
        const userData = JSON.parse(user);
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [])
  const handleStartStop = async() => {
    const newStatus = !isStarted ? 1 : 0;
    setIsStarted(!isStarted);
    setIsEnded(false);
    setIsPaused(false);
    await toggleDevice(user?.id, 3, newStatus);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleEnd = async () => {
    const newStatus = !isStarted ? 1 : 0;
    setIsEnded(true);
    setIsStarted(false);
    setIsPaused(false);
    await toggleDevice(user?.id, 3, newStatus);
  };
  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !checkedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <ScrollView style={{marginBottom: 65}}>
      <View style={manualwaterStyle.manualwaterMain}>
        <Text>
          <View>
            <Text style = {manualwaterStyle.titleText}>Chọn khu vực:</Text>
          </View>
        </Text>
        <DataTable style = {manualwaterStyle.optionTable}>
          <DataTable.Header style = {manualwaterStyle.headerTable}>
            <DataTable.Cell>
              <Text style = {manualwaterStyle.tableText}>STT</Text>
            </DataTable.Cell>
            <DataTable.Title>
              <Text style = {manualwaterStyle.tableText}>Cây trong khu vực</Text>
            </DataTable.Title>
            <DataTable.Title >
              <Text></Text>
            </DataTable.Title>
          </DataTable.Header>

          {[...Array(8).keys()].map((index) => (
            <DataTable.Row style = {manualwaterStyle.rowsTable} key={index}>
              <DataTable.Cell textStyle={{ color: '#3CAF58' }}>
                {index + 1}
              </DataTable.Cell>
              <DataTable.Cell textStyle={manualwaterStyle.tableText}>
                {['Cải bó xôi', 'Cà chua', 'Cà rốt', 'Dâu tây', 'Dưa chuột', 'Dưa lưới', 'Ớt chuông', 'Rau cải ngọt'][index]}
              </DataTable.Cell>
              <DataTable.Cell>
                <Checkbox
                  status={checkedItems[index] ? 'checked' : 'unchecked'}
                  onPress={() => handleCheckboxChange(index)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        <View style={manualwaterStyle.selectView}>
          <Text style={manualwaterStyle.dropText}>Chọn cách tưới:</Text>
          <Dropdown
            style={manualwaterStyle.dropdown}
            placeholderStyle={manualwaterStyle.placeholderStyle}
            selectedTextStyle={manualwaterStyle.dropText}
            data={data}
            search
            labelField="label"
            valueField="value"
            placeholder=""
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
          />
        </View>
        <View style={manualwaterStyle.actionButton}>
        {!isStarted && !isEnded && (
          <Button
            title="Bắt đầu"
            color="#3CAF58"
            onPress={handleStartStop}
          />
        )}

        {isStarted && !isEnded && (
          <View style={manualwaterStyle.actionButton}>
            <Button 
              title={isPaused ? "Tiếp tục" : "Tạm dừng"}
              color="#3CAF58"
              onPress={handlePauseResume}
            />
            <Text style={{flex:1}}> </Text>
            <Button
              title="Kết thúc"
              color="#3CAF58"
              onPress={handleEnd}
            />
          </View>
        )}

        {isEnded && (
          <Button
            title="Bắt đầu"
            color="#3CAF58"
            onPress={handleStartStop}
          />
        )}
        </View>
      </View>
    </ScrollView>
  );
}

const manualwaterStyle = StyleSheet.create(
    {
      manualwaterMain: {
        backgroundColor: '#EFF9F1', 
        flex:1, 
      },
      optionTable: {
        borderColor: '#3CAF58',
        backgroundColor: 'white',
        borderWidth: 0.7
      },
      headerTable: {
        borderColor: '#3CAF58',
      },
      rowsTable: {
        borderColor: '#3CAF58',
      },
      titleText: {
        fontVariant:'roboto' ,
        fontWeight:'bold', 
        fontSize:40, 
        color:'#3CAF58',
        marginVertical: 10
      },
      tableText:{
        fontVariant:'roboto' ,
        fontWeight:'regular', 
        color:'black',
      },
      actionButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      },
      selectView: {
        marginBottom: 10,
        marginVertical: 10
      },
      dropdown: {
        margin: 16,
        height: 20,
        borderBottomColor: '#3CAF58',
        borderBottomWidth: 0.5,
      },
      dropText:{
        fontVariant:'roboto' ,
        fontWeight:'regular', 
        color:'#3CAF58',

      },
      placeholderStyle: {
        fontSize: 16,
      },
    }
  )
