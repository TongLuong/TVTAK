import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { DataTable, Checkbox } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';

export default function App() {
  const [checkedItems, setCheckedItems] = useState(Array(8).fill(false));
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [value, setValue] = useState(null);
  const [isEnded, setIsEnded] = useState(false);
  const data = [
    { label: 'Màu đỏ', value: '1' },
    { label: 'Màu vàng', value: '2' },
    { label: 'Màu xanh', value: '3' },
  ];
  const handleStartStop = () => {
    setIsStarted(!isStarted);
    setIsEnded(false);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleEnd = () => {
    setIsEnded(true);
    setIsStarted(false);
    setIsPaused(false);
  };
  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !checkedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <View style={manuallightStyle.manuallightMain}>
      <Text>
        <View>
          <Text style = {manuallightStyle.titleText}>Chọn khu vực:</Text>
        </View>
      </Text>
      <DataTable style = {manuallightStyle.optionTable}>
        <DataTable.Header style = {manuallightStyle.headerTable}>
          <DataTable.Cell>
            <Text style = {manuallightStyle.tableText}>STT</Text>
          </DataTable.Cell>
          <DataTable.Title>
            <Text style = {manuallightStyle.tableText}>Cây trong khu vực</Text>
          </DataTable.Title>
          <DataTable.Title >
            <Text></Text>
          </DataTable.Title>
        </DataTable.Header>

        {[...Array(8).keys()].map((index) => (
          <DataTable.Row style = {manuallightStyle.rowsTable} key={index}>
            <DataTable.Cell textStyle={{ color: '#3CAF58' }}>
              {index + 1}
            </DataTable.Cell>
            <DataTable.Cell textStyle={manuallightStyle.tableText}>
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
      <View style={manuallightStyle.selectView}>
        <Text style={manuallightStyle.dropText}>Chọn màu đèn:</Text>
        <Dropdown
          style={manuallightStyle.dropdown}
          placeholderStyle={manuallightStyle.placeholderStyle}
          selectedTextStyle={manuallightStyle.dropText}
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
      <View style={manuallightStyle.actionButton}>
      {!isStarted && !isEnded && (
        <Button
          title="Bắt đầu"
          color="#3CAF58"
          onPress={handleStartStop}
        />
      )}

      {isStarted && !isEnded && (
        <View style={manuallightStyle.actionButton}>
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
  );
}

const manuallightStyle = StyleSheet.create(
    {
      manuallightMain: {
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
