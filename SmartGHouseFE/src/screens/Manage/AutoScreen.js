import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { DataTable } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createSchedule, getAllSchedule, deleteSchedule, getDeviceByScheduleId } from "../../services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import {
  MaterialCommunityIcons
} from "@expo/vector-icons";

const TimeForm = ({ isVisible, onClose, deviceOption }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [type, setType] = useState("");

  const handleConfirm = async () => {
    // console.log("Start Time:", startTime);
    // console.log("End Time:", endTime);
    // console.log("Selected Date:", selectedDate);
    // console.log("Type:", type);
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
    } catch (error) {
      console.log(error);
    }

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
        placeholder="Loại thiết bị"
        value={type}
        onChangeText={setType}
      />
      <View style={styles.buttonContainer}>
        <Button title="Đồng ý" onPress={handleConfirm} />
        <Button title="Hủy" onPress={handleCancel} />
      </View>
    </View>
  );
};

const ScheduleForm = ({ isVisible, onClose }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [repeat, setRepeat] = useState("");
  const [content, setContent] = useState("");

  const handleConfirm = () => {
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    console.log("Day of Week:", dayOfWeek);
    console.log("Repeat:", repeat);
    console.log("Content:", content);
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

export default function App({ navigation, route }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isTimeFormVisible, setIsTimeFormVisible] = useState(false);
  const [isScheduleFormVisible, setIsScheduleFormVisible] = useState(false);

  const [user, setUser] = useState(null);
  const [scheds, setScheds] = useState([]);
  const [flag, setFlag] = useState(false);

  const option = route.params;

  useEffect(() => {
    const getAllSchedules = async () => {
      try {
        const user = await AsyncStorage.getItem("User");
        const userData = JSON.parse(user);
        setUser(userData);

        const res = await getAllSchedule(userData?.id);
        if (res.data.length > 0)
        {
          const temp = JSON.parse(JSON.stringify(res.data));
          
          setScheds(temp.map((item) => {
              return {
                id: item.id,
                start_time: item.start_time,
                end_time: item.end_time,
                date: item.date,
                type: item.type
              };
            })
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

  //console.log(option);
  const toggleTimeFormVisibility = () => {
    setIsTimeFormVisible(!isTimeFormVisible);
    setFlag(!flag);
  };

  const toggleScheduleFormVisibility = () => {
    setIsScheduleFormVisible(!isScheduleFormVisible);
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
                  style={styles.addButton}
                  onPress={toggleTimeFormVisibility}
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
              <Text style={{ color: "#3CAF58" }}>Giờ</Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1 }}>
              <Text style={{ color: "#3CAF58" }}>Thời gian</Text>
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
                    {
                      true &&
                      <Text style={{ color: "black" }}>{handleDuration(item)}</Text>
                    }
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
