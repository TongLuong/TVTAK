import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  TouchableOpacity,
  Touchable,
  Alert,
  SectionList,
} from "react-native";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAllNote,
  getAllNotification,
  deleteNotification,
} from "../../services/userService";
import CalendarStrip from "react-native-calendar-strip";
import { useIsFocused } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const AppButton = ({ onPress, title, style, titleStyle }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      {
        backgroundColor: "white",
        alignItems: "center",
        width: "35%",
        alignSelf: "center",
        marginBottom: 10,
        maxHeight: 26,
        borderRadius: 20,
        elevation: 4,
      },
      style,
    ]}
  >
    <Text
      style={[
        {
          fontSize: 16,
          fontVariant: "roboto",
          color: "#3CAF58",
          paddingVertical: "1%",
        },
        titleStyle,
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

export default function App({ navigation }) {
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const m = true;
  // const markedList = ['2024-04-14', '2024-04-17'];
  // const notiList = ['2024-04-25', '2024-04-20'];
  const [markedList, setMarkedList] = useState([]);
  const [notiList, setNotiList] = useState([]);
  const [cur, setCur] = useState(false);

  const [notes, setNotes] = useState(["Không có ghi chú"]);
  const [noti, setNoti] = useState([]);
  const [user, setUser] = useState(null);

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const getAllNotes = async () => {
      try {
        const user = await AsyncStorage.getItem("User");
        const userData = JSON.parse(user);
        setUser(userData);

        const res = await getAllNote(userData?.id);
        if (res.data.length > 0) {
          setNotes(
            JSON.parse(JSON.stringify(res.data)).map((item, _) => {
              return item.content;
            })
          );
        } else setNotes(["Không có ghi chú"]);

        const res2 = await getAllNotification(userData?.id);
        if (res2.data.length > 0) {
          const tempNoti = JSON.parse(JSON.stringify(res2.data)).map(
            (item, _) => {
              return { id: item.id, time: item.time, content: item.content };
            }
          );
          const sortedNoti = [...tempNoti].sort((a, b) => {
            if (new Date(a.time).valueOf() < new Date(b.time).valueOf())
              return -1;
            else return 1;
          });
          setNoti(sortedNoti);
        } else setNoti([]);
      } catch (error) {
        console.log(error);
      }
    };
    getAllNotes();
  }, [useIsFocused()]);

  useEffect(() => {
    if (noti.length > 0) {
      const today = new Date();
      const todayTime =
        moment(today).format("DD/MM/YYYY") +
        " " +
        moment(today).format("HH:mm");
      const nextNoti =
        moment(new Date(noti[0].time)).format("DD/MM/YYYY") +
        " " +
        moment(new Date(noti[0].time)).format("HH:mm");
      if (todayTime === nextNoti) {
        Alert.alert("Thông báo!", noti[0].content);
        if (!delNoti(noti[0].id)) Alert.alert("Lỗi", "Lỗi máy chủ!");
      }
    }

    // update every 60 seconds
    setTimeout(() => {
      if (timer >= 2) setTimer(0);
      else setTimer(timer + 1);
    }, 40000);
  }, [timer]);

  const delNoti = async (index) => {
    const res = await deleteNotification(user?.id, noti[index].id);
    if (res.status == 200) {
      setNoti(noti.filter((_, i) => i != index));
      return true;
    }
    return false;
  };

  return (
    <ScrollView style={{ marginBottom: 65 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <CalendarStrip
            style={styles.calendar}
            selectedDate={value}
            markedDates={noti.map((item) => {
              return {
                date: moment(new Date(item.time)),
                dots: [
                  {
                    color: "#000000",
                  },
                ],
              };
            })}
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

          <View
            style={{
              backgroundColor: "#EFF9F1",
              marginTop: "3%",
              marginHorizontal: "2%",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Text
                style={{
                  color: "#3CAF58",
                  fontSize: 16,
                  fontWeight: "bold",
                  borderBottomColor: "#3CAF58",
                  borderBottomWidth: 1,
                  paddingBottom: "2%",
                }}
              >
                Thông báo tiếp theo
              </Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{ fontSize: 14, color: "#3CAF58", marginVertical: "2%" }}
              >
                {noti.length <= 0
                  ? "Không có thông báo"
                  : "Ngày " +
                    moment(new Date(noti[0].time)).format("DD/MM/YYYY") +
                    ", vào lúc " +
                    moment(new Date(noti[0].time)).format("HH:mm")}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#EFF9F1",
              marginTop: "3%",
              marginHorizontal: "2%",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Text
                style={{
                  color: "#3CAF58",
                  fontSize: 16,
                  fontWeight: "bold",
                  borderBottomColor: "#3CAF58",
                  borderBottomWidth: 1,
                  paddingBottom: "2%",
                }}
              >
                Thông báo đã đặt
              </Text>
              <AppButton
                title={"Đặt thông báo"}
                style={{ marginTop: "2%" }}
                onPress={() => {
                  navigation.navigate("NotiAddition");
                }}
              />
            </View>
            <View style={{ marginLeft: "3%", maxHeight: 230 }}>
              <ScrollView>
                <DataTable>
                  {noti.length > 0 ? (
                    <DataTable.Row>
                      <DataTable.Title style={{ flex: 2 }}>
                        <View>
                          <Text style={{ color: "#3CAF58" }}>Ngày</Text>
                        </View>
                      </DataTable.Title>
                      <DataTable.Title style={{ flex: 1 }}>
                        <View>
                          <Text style={{ color: "#3CAF58" }}>Giờ</Text>
                        </View>
                      </DataTable.Title>
                      <DataTable.Title style={{ flex: 2.5 }}>
                        <View>
                          <Text style={{ color: "#3CAF58" }}>Nội dung</Text>
                        </View>
                      </DataTable.Title>
                      <DataTable.Title style={{ flex: 0.3 }}>
                        <View>
                          <Text style={{ color: "#3CAF58" }}></Text>
                        </View>
                      </DataTable.Title>
                    </DataTable.Row>
                  ) : (
                    <DataTable.Row>
                      <DataTable.Cell
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: "#3CAF58" }}>
                          Không có thông báo
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  )}
                  {noti.map((item, index) => {
                    return (
                      <DataTable.Row key={index}>
                        <DataTable.Cell style={{ flex: 2 }}>
                          <Text style={{ color: "#3CAF58" }}>
                            {moment(new Date(item.time)).format("DD/MM/YYYY")}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 1 }}>
                          <Text style={{ color: "#3CAF58" }}>
                            {moment(new Date(item.time)).format("HH:mm")}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2.5 }}>
                          <Text style={{ color: "#3CAF58" }}>
                            {item.content}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 0.3 }}>
                          <MaterialCommunityIcons
                            name="delete"
                            size={22}
                            color="red"
                            style={{ flex: 1 }}
                            onPress={() => {
                              Alert.alert("Xác nhận", "Bạn có chắc muốn xóa?", [
                                {
                                  text: "Hủy bỏ",
                                  style: "cancel",
                                },
                                {
                                  text: "OK",
                                  onPress: () => {
                                    if (delNoti(index))
                                      Alert.alert(
                                        "Thành công",
                                        "Bạn đã xóa thông báo!"
                                      );
                                    else Alert.alert("Lỗi", "Lỗi máy chủ!");
                                  },
                                },
                              ]);
                            }}
                          />
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  })}
                </DataTable>
              </ScrollView>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#EFF9F1",
              marginTop: "3%",
              paddingBottom: "3%",
              marginHorizontal: "2%",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Text
                style={{
                  color: "#3CAF58",
                  fontSize: 16,
                  fontWeight: "bold",
                  borderBottomColor: "#3CAF58",
                  borderBottomWidth: 1,
                  paddingBottom: "1%",
                }}
              >
                Ghi chú gần đây
              </Text>
              <AppButton
                title={"Thêm ghi chú"}
                style={{ marginTop: "2%" }}
                onPress={() => {
                  navigation.navigate("NoteAddition", {});
                }}
              />
            </View>

            <View style={{ marginTop: 5, maxHeight: 230 }}>
              <Text
                style={{
                  color: "#3CAF58",
                  fontSize: 14,
                  marginHorizontal: "5%",
                  marginLeft: "8%",
                }}
              >
                {notes[0]}
              </Text>
            </View>
            <AppButton
              title={"Xem tất cả"}
              style={{ width: "40%", paddingHorizontal: "2%", marginTop: "5%" }}
              onPress={() => {
                navigation.navigate("NoteList");
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  calendar: {
    height: 100,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#EFF9F1",
  },
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingTop: "10%",
  },
  header: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  picker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF9F1",
    justifyContent: "center",
    height: "20%",
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#999999",
    marginBottom: 12,
  },
  footer: {
    marginTop: "auto",
    paddingHorizontal: 16,
  },
  /** Item */
  item: {
    flex: 1,
    height: "100%",
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#e3e3e3",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CAFFCF",
    elevation: 5,
  },
  itemRow: {
    width: width,
    height: "86%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: "500",
    color: "#737373",
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: "transparent",
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
