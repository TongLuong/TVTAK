import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import styles from '../styles/styles';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { DataTable, Modal } from "react-native-paper";
import { getRecordLast } from "../../services/userService";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { path } from "../../utils/constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { getAllDevice } from '../../services/userService';

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: "white",
      alignItems: "center",
      width: "46%",
      alignSelf: "center",
      marginBottom: 10,
      maxHeight: 26,
      borderRadius: 20,
    }}
  >
    <Text
      style={{
        fontSize: 16,
        fontVariant: "roboto",
        color: "#3CAF58",
        paddingVertical: "1%",
      }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const AppButton1 = ({ onPress, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: "white",
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "space-between",
      maxHeight: 26,
      borderRadius: 20,
      paddingLeft: 30,
      paddingRight: 30,
    }}
  >
    <Text style={{ fontSize: 16, fontVariant: "roboto", color: "#3CAF58" }}>
      <Ionicons
        style={{ alignSelf: "center" }}
        name="add-circle-outline"
        size={12}
      />
      {" " + title}
    </Text>
  </TouchableOpacity>
);

const AppButton2 = ({ onPress, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: "white",
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "center",
      height: 26,
      borderRadius: 20,
      paddingLeft: 30,
      paddingRight: 30,
    }}
  >
    <Text style={{ fontSize: 12, fontVariant: "roboto", color: "#3CAF58" }}>
      {title}
    </Text>
  </TouchableOpacity>
);

const AppButton4 = ({ onPress, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: "white",
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "center",
      height: 26,
      borderRadius: 20,
      paddingLeft: 30,
      paddingRight: 30,
    }}
  >
    <Text style={{ fontSize: 12, fontVariant: "roboto", color: "#3CAF58" }}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  const [humidity, setHumidity] = useState("0");
  const [temp, setTemp] = useState("0");
  const [light, setLight] = useState("0");
  const [flag, setFlag] = useState(false);
  const [devices, setDevices] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseHumid = await getRecordLast("iot-humid");
        setHumidity(responseHumid?.data?.value);
        const responseTemp = await getRecordLast("iot-temp");
        setTemp(responseTemp?.data?.value);
        const responseLight = await getRecordLast("iot-light");
        setLight(responseLight?.data?.value);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getAllDevices = async () => {
      var userData = null;
      if (user == null)
      {
        const userRes = await AsyncStorage.getItem("User");
        userData = JSON.parse(userRes);
        setUser(userData);
      }

      var temp = user;
      if (user == null)
        temp = userData;

      const res = await getAllDevice(temp?.id);
      setDevices(
        JSON.parse(JSON.stringify(res.data)).map((item) => {
          return {
            id: item.id,
            name: item.name,
            status: item.status,
            type: item.type
          };
        })
      );
    };
    getAllDevices();
  }, [useIsFocused(), flag]);

  return (
    <View style={{ paddingTop: "5%" }}>
      <View
        style={{
          margin: 10,
          backgroundColor: "#EFF9F1",
          borderRadius: 45,
          padding: 10,
          marginTop: "5%",
        }}
      >
        <Text
          style={{
            fontSize: 23,
            color: "#3CAF58",
            alignSelf: "center",
          }}
        >
          Trạng thái hệ thống
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "space-around",
            alignItems: "center",
            gap: 20,
            marginBottom: 15,
            paddingBottom: 10,
            borderColor: "#3CAF58",
          }}
        >
          <View style={dataStyle.container}>
            <View style={{ alignSelf: "center" }}>
              <Ionicons name="water-outline" size={24} color="#3CAF58" />
            </View>
            <Text style={statusStyle.content}>{humidity}%</Text>
            <Text style={statusStyle.title}>Độ ẩm{"\n"}</Text>
          </View>
          <View style={dataStyle.container}>
            <View style={{ alignSelf: "center" }}>
              <MaterialCommunityIcons
                name="thermometer"
                size={24}
                color="#3CAF58"
              />
            </View>
            <Text style={statusStyle.content}>{temp}°</Text>
            <Text style={statusStyle.title}>Nhiệt độ{"\n"}</Text>
          </View>
          <View style={dataStyle.container}>
            <View style={{ alignSelf: "center" }}>
              <FontAwesome5 name="lightbulb" size={24} color="#3CAF58" />
            </View>
            <Text style={statusStyle.content}>{light} lx</Text>
            <Text style={statusStyle.title}>Độ sáng{"\n"}</Text>
          </View>
        </View>
        <AppButton
          title={"Thống kê dữ liệu"}
          onPress={() => {
            navigation.navigate(path.CHART);
          }}
        />
      </View>

      <View
        style={{
          margin: 10,
          marginTop: "0%",
          height: "100%",
          backgroundColor: "#EFF9F1",
          borderRadius: 45,
          paddingTop: 10,
        }}
      >
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>
              {" "}
              <Text style={{ fontSize: 23, color: "#3CAF58" }}>
                {" "}
                <Ionicons size={20} name="settings-sharp" /> Thiết bị
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <View
                style={{
                  justifyContent: "center",
                  paddingBottom: 10,
                  width: "100%",
                }}
              >
                <AppButton1
                  title={"Thêm"}
                  onPress={() => navigation.navigate("DeviceAddtion")}
                />
              </View>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Header>
            <DataTable.Cell style={{ flex: 2 }}>
              <Text style={{ color: "#3CAF58" }}>Tên thiết bị</Text>
            </DataTable.Cell>
            <DataTable.Title style={{ flex: 2 }}>
              <Text style={{ color: "#3CAF58" }}>Loại</Text>
            </DataTable.Title>
            <DataTable.Title style={{ flex: 1 }}>
              <Text style={{ color: "#3CAF58" }}>Trạng thái</Text>
            </DataTable.Title>
          </DataTable.Header>
          {
            devices.map((item, index) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell
                    style={{ flex: 2 }}
                    textStyle={{ color: "#3CAF58" }}
                  >
                    {item.name}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{ flex: 2 }}
                    textStyle={{ color: "#3CAF58" }}
                  >
                    {item.type == "sensor"? "Cảm biến" : "Thiết bị khác"}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{ flex: 1 }}
                    textStyle={{ color: "#3CAF58" }}
                  >
                    {item.status == 0? "Tắt" : "Bật"}
                  </DataTable.Cell>
                </DataTable.Row>
              )
            })
          }
          {/* <DataTable.Row>
            <DataTable.Cell
              style={{ flex: 3 }}
              textStyle={{ color: "#3CAF58" }}
            >
              Hệ thống tưới
            </DataTable.Cell>
            <DataTable.Cell
              style={{ flex: 2 }}
              textStyle={{ color: "#3CAF58" }}
            >
              Thủ công
            </DataTable.Cell>
            <DataTable.Cell
              style={{ flex: 1 }}
              textStyle={{ color: "#3CAF58" }}
            >
              Tắt
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell
              style={{ flex: 3 }}
              textStyle={{ color: "#3CAF58" }}
            >
              Hệ thống chiếu sáng
            </DataTable.Cell>
            <DataTable.Cell
              style={{ flex: 2 }}
              textStyle={{ color: "#3CAF58" }}
            >
              Tự động
            </DataTable.Cell>
            <DataTable.Cell
              style={{ flex: 1 }}
              textStyle={{ color: "#3CAF58" }}
            >
              Bật
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell
              style={{ flex: 3 }}
              textStyle={{ color: "#3CAF58" }}
            >
              Cảm biến nhiệt độ
            </DataTable.Cell>
            <DataTable.Cell
              style={{ flex: 2 }}
              textStyle={{ color: "#3CAF58" }}
            >
              Thủ công
            </DataTable.Cell>
            <DataTable.Cell
              style={{ flex: 1 }}
              textStyle={{ color: "#3CAF58" }}
            >
              Tắt
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell
              style={{ flex: 3 }}
              textStyle={{ color: "#3CAF58" }}
            >
              Cảm biến độ ẩm
            </DataTable.Cell>
            <DataTable.Cell
              style={{ flex: 2 }}
              textStyle={{ color: "#3CAF58" }}
            >
              Tự động
            </DataTable.Cell>
            <DataTable.Cell
              style={{ flex: 1 }}
              textStyle={{ color: "#3CAF58" }}
            >
              Bật
            </DataTable.Cell>
          </DataTable.Row> */}

          <DataTable.Row style={{ padding: "3%" }}>
            <DataTable.Cell
              style={{ position: "absolute", left: "10%" }}
              textStyle={{ color: "#3CAF58" }}
            >
              <AppButton2 title={"Cài đặt"} 
                onPress={() => {
                  navigation.navigate("DeviceList")
                }}
              />
            </DataTable.Cell>
            <DataTable.Cell style={{ position: "absolute", right: "10%" }}>
              <AppButton4
                title={"Lịch sử"}
                onPress={() => {
                  navigation.navigate("History");
                }}
              />
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </View>
  );
}

const timeStyle = StyleSheet.create({
  hours: {
    fontSize: 40,
    alignSelf: "center",
    color: "#3CAF58",
    paddingRight: 10,
  },
  date: {
    fontSize: 24,
    alignSelf: "center",
    color: "#3CAF58",
  },
});

const statusStyle = StyleSheet.create({
  title: {
    fontSize: 12,
    alignSelf: "center",
    color: "#3CAF58",
  },
  content: {
    fontSize: 20,
    alignSelf: "center",
    color: "#3CAF58",
  },
});
const dataStyle = StyleSheet.create({
  container: {
    backgroundColor: "#FAF9F8", // Fallback color if gradients are not supported
    // backgroundImage: 'linear-gradient(315deg, #55efc4 0%, #000000 74%)',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    // borderColor: "black",
    // borderWidth: 1,
    flex: 1,
    elevation: 4
  },
  measureLine: {},
});
