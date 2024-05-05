import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
  Pressable
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { DataTable } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createSchedule, getAllSchedule, deleteSchedule, getSchedsByDevice } from "../../services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import {
  MaterialCommunityIcons
} from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';

const TimeForm = ({ isVisible, onClose, deviceOption }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  //const [dateTime, setDateTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [type, setType] = useState("");

  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [start_time, setStart_time] = useState(new Date());
  const [end_time, setEnd_time] = useState(new Date());
  const [selected_date, setSelected_date] = useState(new Date());

  const handleConfirm = async () => {
    const schedule = {
      type: type,
      date: selectedDate,
      start_time: startTime,
      end_time: endTime,
    };

    const device_id = deviceOption === "light" ? 1 : 3;
    try {
      const user = await AsyncStorage.getItem("User");
      const userData = JSON.parse(user);
      const res = await createSchedule(userData?.id, device_id, schedule);
      if (res.status == 200)
        Alert.alert("Thành công", "Thời gian biểu đã được thêm");
      else
        Alert.alert("Lỗi", "Lỗi máy chú");
    } catch (error) {
      console.log(error);
    }

    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const onChangeStart = ({type}, selected) => {
    setOpenStart(false);
    setStartTime(moment(new Date(selected)).format("HH:mm:ss"));
    setStart_time(selected);
  };

  const onChangeEnd = ({type}, selected) => {
    setOpenEnd(false);
    setEndTime(moment(new Date(selected)).format("HH:mm:ss"));
    setEnd_time(selected);
  };

  const onChangeDate = ({type}, selected) => {
    setOpenDate(false);
    setSelectedDate(moment(new Date(selected)).format("DD/MM/YYYY"));
    setSelected_date(selected);
  };

  return (
    <View style={isVisible ? styles.formContainer : styles.hidden}>
      <Text style={styles.title}>Đặt thời gian</Text>
      {
        openStart &&
        <DateTimePicker
          mode="time"
          display="spinner"
          is24Hour={true}
          value={start_time}
          onChange={onChangeStart}
        />
      }
      <Pressable onPress={() => {
        setOpenStart(true);
      }}>
        <TextInput
          editable={false}
          style={styles.input}
          placeholder="Giờ bắt đầu"
          value={startTime}
        />
      </Pressable>
      {
        openEnd &&
        <DateTimePicker
          mode="time"
          display="spinner"
          is24Hour={true}
          value={end_time}
          onChange={onChangeEnd}
        />
      }
      <Pressable onPress={() => {
        setOpenEnd(true);
      }}>
        <TextInput
          editable={false}
          style={styles.input}
          placeholder="Giờ kết thúc"
          value={endTime}
        />
      </Pressable>
      {
        openDate &&
        <DateTimePicker
          mode="date"
          display="spinner"
          is24Hour={true}
          value={selected_date}
          onChange={onChangeDate}
        />
      }
      <Pressable onPress={() => {
        setOpenDate(true);
      }}>
        <TextInput
          editable={false}
          style={styles.input}
          placeholder="Ngày thực hiện"
          value={selectedDate}
        />
      </Pressable>
      <TextInput
        style={styles.input}
        placeholder="Loại thiết bị"
        value={type}
        onChangeText={setType}
      />
      <View style={styles.buttonContainer}>
        <Button title="Hủy" onPress={handleCancel} color="red"/>
        <Button title="Đồng ý" onPress={handleConfirm} />
      </View>
    </View>
  );
};

export default function App({ navigation, route }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isTimeFormVisible, setIsTimeFormVisible] = useState(false);

  const [user, setUser] = useState(null);
  const [scheds, setScheds] = useState([]);
  const [flag, setFlag] = useState(false);

  const option = route.params;
  const deviceId = option.func === "light" ? 1 : 3;

  useEffect(() => {
    const getAllSchedules = async () => {
      try {
        const user = await AsyncStorage.getItem("User");
        const userData = JSON.parse(user);
        setUser(userData);

        //const res = await getAllSchedule(userData?.id);
        const res = await getSchedsByDevice(userData?.id, deviceId);
        if (res.data)
        {
          const item = JSON.parse(JSON.stringify(res.data));
          
          setScheds([{
                id: item.id,
                start_time: item.start_time,
                end_time: item.end_time,
                date: item.date,
                type: item.type
            }]
          );
        }
        else
          setScheds([]);
      } catch (error) {
        console.log(error);
      }
    };
    getAllSchedules();
  }, [useIsFocused(), flag]);

  const toggleTimeFormVisibility = () => {
    setIsTimeFormVisible(!isTimeFormVisible);
    setFlag(!flag);
  };

  const handleDateSelected = (date) => {
    setSelectedDate(date);
  };

  const handleDuration = (item) => {
    const end = moment(item.end_time, "HH:mm:ss");
    const start = moment(item.start_time, "HH:mm:ss");
    const hd = end.diff(start, "hours");
    const md = end.diff(start, "minutes") % 60;
    const sd = end.diff(start, "seconds") % 60;
    return moment(hd + ":" + md + ":" + sd, "HH:mm:ss").format("HH:mm:ss");
  };

  const delSched = async (id) => {
    const res = await deleteSchedule(user?.id, id);
    setFlag(!flag);
    return res.status == 200;
  };

  return (
    <View>
      <View style={styles.container}>
        <CalendarStrip
          style={styles.calendar}
          selectedDate={selectedDate}
          onDateSelected={handleDateSelected}
          markedDates={
            scheds.map((item) => {
              return {
                date: moment(item.date, "DD/MM/YYYY"),
                dots: [
                  {
                    color: "#000000"
                  }
                ]
              }
            })
          }
          calendarAnimation={{ type: "sequence", duration: 30 }}
          daySelectionAnimation={{
            type: "border",
            borderWidth: 1,
            borderHighlightColor: "#EFF9F1",
          }}
          calendarHeaderStyle={{ color: "black" }}
          calendarColor={"white"}
          iconContainer={{ flex: 0.1 }}
          dateContainerStyle={{ borderRadius: 20 }}
          highlightDateContainerStyle={{
            backgroundColor: "#9CDD9B",
            borderRadius: 20,
          }}
        />
      </View>
      <View style={styles.container}>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>
              {" "}
              <Text style={{ color: "#3CAF58" }}>
                {" "}
                <Ionicons size={14} name="alarm-outline" /> Thời gian biểu
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <View style={{ justifyContent: "center", paddingRight: 10 }}>
                <TouchableOpacity
                  //disabled={scheds.length >= 1}
                  style={styles.addButton}
                  onPress={() => {
                    if (scheds.length < 1)
                      toggleTimeFormVisibility();
                    else
                      Alert.alert("Lỗi", "Chỉ có thể đặt một lịch biểu!");
                  }}
                >
                  <Text style={styles.addButtonText}>
                    <Ionicons name="timer-outline" size={14} />
                    {" Đặt lịch"}
                  </Text>
                </TouchableOpacity>
              </View>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Header style={{marginLeft: "3%"}}>
            <DataTable.Cell style={{ flex: 1 }}>
              <Text style={{ color: "#3CAF58" }}>Ngày</Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1 }}>
              <Text style={{ color: "#3CAF58" }}>Giờ bắt đầu</Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1 }}>
              <Text style={{ color: "#3CAF58" }}>Giờ kết thúc</Text>
              <Text></Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 0.3 }}>
            </DataTable.Cell>
          </DataTable.Header>
          {
            scheds.length <= 0 &&
            <DataTable.Row>
              <DataTable.Cell style={{marginLeft: "3%"}}>
                <Text>Không có lịch biểu</Text>
              </DataTable.Cell>
            </DataTable.Row>
          }
          {
            scheds.map((item, index) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={{ flex: 1, marginLeft: "3%" }}>
                    <Text style={{ color: "black" }}>{moment(item.date, "DD-MM-YYYY").format("DD/MM/YYYY")}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1 }}>
                    <Text style={{ color: "black" }}>{moment(item.start_time, "HH:mm:ss").format("HH:mm:ss")}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1 }}>
                    <Text style={{ color: "black" }}>{moment(item.end_time, "HH:mm:ss").format("HH:mm:ss")}</Text>
                    {/* {
                      true &&
                      <Text style={{ color: "black" }}>{handleDuration(item)}</Text>
                    } */}
                  </DataTable.Cell>
                  <DataTable.Cell style={{flex: 0.3}}>
                    <MaterialCommunityIcons
                      name="delete"
                      size={20}
                      color="black"
                      style={{flex: 1}}
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
                                if (delSched(item.id))
                                  Alert.alert("Thành công", "Bạn đã xóa lịch biểu!");
                                else
                                  Alert.alert("Lỗi", "Lỗi máy chủ!");
                              }
                            }
                          ]
                        );
                      }}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              )
            })
          }
        </DataTable>
      </View>
      {/* <View style={styles.container}>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={{ color: "#3CAF58" }}>
                <Ionicons size={14} name="calendar-outline" /> Lịch biểu
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <View style={{ justifyContent: "center", paddingRight: 10 }}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={toggleScheduleFormVisibility}
                >
                  <Text style={styles.addButtonText}>
                    <Ionicons name="add-circle-outline" size={14} />
                    {" Đặt lịch biểu"}
                  </Text>
                </TouchableOpacity>
              </View>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Header>
            <DataTable.Cell style={{ flex: 1 }}>
              <Text style={{ color: "#3CAF58" }}>Ngày</Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1 }}>
              <Text style={{ color: "#3CAF58" }}>Giờ bắt đầu</Text>
            </DataTable.Cell> 
            <DataTable.Cell style={{ flex: 1 }}>
              <Text style={{ color: "#3CAF58" }}>Thời lượng</Text>
            </DataTable.Cell>
          </DataTable.Header>
        </DataTable>
      </View> */}
      {isTimeFormVisible && (
        <TimeForm
          isVisible={isTimeFormVisible}
          onClose={toggleTimeFormVisibility}
          deviceOption={option}
        />
      )}
      {/* {isScheduleFormVisible && (
        <ScheduleForm
          isVisible={isScheduleFormVisible}
          onClose={toggleScheduleFormVisibility}
        />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFF9F1",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: "3%"
  },
  calendar: {
    height: 100,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#EFF9F1",
  },
  formContainer: {
    backgroundColor: "white",
    elevation: 3,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    top: "70%",
    left: "35%",
    position: "absolute",
  },
  hidden: {
    display: "none",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: "#3CAF58",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
    color: "black"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: "white",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    height: 26,
    borderRadius: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  addButtonText: {
    fontSize: 14,
    color: "#3CAF58",
    width: 65
  },
});
