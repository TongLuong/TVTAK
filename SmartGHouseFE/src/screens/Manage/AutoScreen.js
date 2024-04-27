import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { DataTable } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TimeForm = ({ isVisible, onClose }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [content, setContent] = useState('');

  const handleConfirm = () => {
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
    console.log('Selected Date:', selectedDate);
    console.log('Content:', content);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <View style={isVisible ? styles.formContainer : styles.hidden}>
      <Text style={styles.title}>Đặt thời gian</Text>
      <TextInput
        style={styles.input}
        placeholder="Giờ bắt đầu"
        value={startTime}
        onChangeText={setStartTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Giờ kết thúc"
        value={endTime}
        onChangeText={setEndTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Ngày thực hiện"
        value={selectedDate}
        onChangeText={setSelectedDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Nội dung"
        value={content}
        onChangeText={setContent}
      />
      <View style={styles.buttonContainer}>
        <Button title="Đồng ý" onPress={handleConfirm} />
        <Button title="Hủy" onPress={handleCancel} />
      </View>
    </View>
  );
};

const ScheduleForm = ({ isVisible, onClose }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [repeat, setRepeat] = useState('');
  const [content, setContent] = useState('');

  const handleConfirm = () => {
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
    console.log('Day of Week:', dayOfWeek);
    console.log('Repeat:', repeat);
    console.log('Content:', content);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <View style={isVisible ? styles.formContainer : styles.hidden}>
      <Text style={styles.title}>Đặt lịch biểu</Text>
      <TextInput
        style={styles.input}
        placeholder="Giờ bắt đầu"
        value={startTime}
        onChangeText={setStartTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Giờ kết thúc"
        value={endTime}
        onChangeText={setEndTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Thứ"
        value={dayOfWeek}
        onChangeText={setDayOfWeek}
      />
      <TextInput
        style={styles.input}
        placeholder="Lặp lại"
        value={repeat}
        onChangeText={setRepeat}
      />
      <TextInput
        style={styles.input}
        placeholder="Nội dung"
        value={content}
        onChangeText={setContent}
      />
      <View style={styles.buttonContainer}>
        <Button title="Đồng ý" onPress={handleConfirm} />
        <Button title="Hủy" onPress={handleCancel} />
      </View>
    </View>
  );
};

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isTimeFormVisible, setIsTimeFormVisible] = useState(false);
  const [isScheduleFormVisible, setIsScheduleFormVisible] = useState(false);

  const toggleTimeFormVisibility = () => {
    setIsTimeFormVisible(!isTimeFormVisible);
  };

  const toggleScheduleFormVisibility = () => {
    setIsScheduleFormVisible(!isScheduleFormVisible);
  };

  const handleDateSelected = date => {
    setSelectedDate(date);
  };

  return (
    <View>
      <View style={styles.container}>
        <CalendarStrip
          style={styles.calendar}
          selectedDate={selectedDate}
          onDateSelected={handleDateSelected}
          calendarAnimation={{ type: 'sequence', duration: 30 }}
          daySelectionAnimation={{
            type: 'border',
            borderWidth: 1,
            borderHighlightColor: '#EFF9F1',
          }}
          calendarHeaderStyle={{ color: 'black' }}
          calendarColor={'white'}
          iconContainer={{ flex: 0.1 }}
          dateContainerStyle={{ borderRadius: 20 }}
          highlightDateContainerStyle={{ backgroundColor: '#9CDD9B', borderRadius: 20 }}
        />
      </View>
      <View style={styles.container}>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell> <Text style={{ color: '#3CAF58' }}> <Ionicons size={14} name="alarm-outline" />  Thời gian thực hiện</Text></DataTable.Cell>
            <DataTable.Cell>
              <View style={{ justifyContent: 'center', paddingRight: 10 }}>
                <TouchableOpacity
        style={styles.addButton}
        onPress={toggleTimeFormVisibility}
      >
        <Text style={styles.addButtonText}>
          <Ionicons name='timer-outline' size={14} />
          {" Đặt thời gian"}
        </Text>
      </TouchableOpacity>
              </View>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Header>
            <DataTable.Cell style={{ flex: 1.3 }}>
              <Text style={{ color: '#3CAF58' }}>
                Ngày
              </Text>
            </DataTable.Cell>
            <DataTable.Title>
              <Text style={{ color: '#3CAF58' }}>
                Giờ
              </Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={{ color: '#3CAF58' }}>
                Nội dung
              </Text>
              <Text></Text>
            </DataTable.Title>
          </DataTable.Header>
          <DataTable.Row style={{ padding: 30 }}>
          </DataTable.Row>
        </DataTable>
      </View>
      <View style={styles.container}>
        <DataTable>
      <DataTable.Row>
        <DataTable.Cell> <Text style={{ color: '#3CAF58'}}> <Ionicons size={14} name="calendar-outline"/>  Lịch biểu</Text></DataTable.Cell>
        <DataTable.Cell>
          <View style={{justifyContent: 'center', paddingRight: 10}}>
            <TouchableOpacity
        style={styles.addButton}
        onPress={toggleScheduleFormVisibility}
      >
        <Text style={styles.addButtonText}>
          <Ionicons name='add-circle-outline' size={14} />
          {" Đặt lịch biểu"}
        </Text>
      </TouchableOpacity>
          </View>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Header> 
        <DataTable.Cell style={{flex: 1.3}}>
          <Text style={{color: '#3CAF58'}}>
            Thứ
          </Text>
        </DataTable.Cell> 
        <DataTable.Title>
          <Text style={{color: '#3CAF58'}}>
            Giờ
          </Text>
        </DataTable.Title> 
        <DataTable.Title>
          <Text style={{color: '#3CAF58'}}>
            Nội dung
          </Text>
          <Text style={{color: '#3CAF58'}}>
            Lặp lại
          </Text>
          <Text></Text>
        </DataTable.Title>
      </DataTable.Header> 
      <DataTable.Row style={{padding: 30}}>
      </DataTable.Row>
    </DataTable>
      </View>
      {isTimeFormVisible && (
        <TimeForm isVisible={isTimeFormVisible} onClose={toggleTimeFormVisibility} />
      )}
      {isScheduleFormVisible && (
        <ScheduleForm isVisible={isScheduleFormVisible} onClose={toggleScheduleFormVisibility} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFF9F1',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 100
  },
  calendar: {
    height: 100,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#EFF9F1',
  },
    formContainer: {
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    top: '30%' ,
    left: '35%' ,
    position:'absolute'
  },
   hidden: {
    display: 'none',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: '#3CAF58',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 26,
    borderRadius: 20,
    paddingLeft: 30,
    paddingRight: 30
  },
  addButtonText: {
    fontSize: 14,
    color: '#3CAF58',
  },
});