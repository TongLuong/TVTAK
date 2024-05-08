import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import {
  getRecordLast,
  getAllDevice,
  adjustThreshold,
} from "../../services/userService";
import { DataTable, Modal } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ThresholdScreen({ navigation }) {
  const [humidity, setHumidity] = useState("0");
  const [temp, setTemp] = useState("0");
  const [light, setLight] = useState("0");
  const [devices, setDevices] = useState([]);
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState(null);
  const [disableInput, setDisableInput] = useState(true);

  const [thresHumid, setThresHumid] = useState("0.0");
  const [thresTemp, setThresTemp] = useState("0.0");
  const [thresLight, setThresLight] = useState("0.0");

  const [overHumid, setOverHumid] = useState(false);
  const [overTemp, setOverTemp] = useState(false);
  const [overLight, setOverLight] = useState(false);

  const getName = (name) => {
    if (name == "light") return "Độ sáng";
    return name == "temp" ? "Nhiệt độ" : "Độ ẩm";
  };

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
    if (thresHumid == "0.0" || thresTemp == "0.0" || thresLight == "0.0")
      return;

    try {
      if (parseFloat(humidity) > parseFloat(thresHumid)) {
        Alert.alert("Cảnh báo", "Vượt ngưỡng giá trị độ ẩm!");
        setOverHumid(true);
      } else setOverHumid(false);

      if (parseFloat(temp) > parseFloat(thresTemp)) {
        Alert.alert("Cảnh báo", "Vượt ngưỡng giá trị nhiệt độ!");
        setOverTemp(true);
      } else setOverTemp(false);

      if (parseFloat(light) > parseFloat(thresLight)) {
        Alert.alert("Cảnh báo", "Vượt ngưỡng độ sáng!");
        setOverLight(true);
      } else setOverLight(false);
    } catch (error) {}
  }, [humidity, temp, light, flag]);

  useEffect(() => {
    const getAllDevices = async () => {
      var userData = null;
      if (user == null) {
        const userRes = await AsyncStorage.getItem("User");
        userData = JSON.parse(userRes);
        setUser(userData);
      }

      var temp = user;
      if (user == null) temp = userData;

      const res = await getAllDevice(temp?.id);
      if (res) {
        const tempData = JSON.parse(JSON.stringify(res.data))
          .map((item) => {
            if (item.name == "humid") setThresHumid(item.threshold.toString());
            else if (item.name == "light")
              setThresLight(item.threshold.toString());
            else if (item.name == "temp")
              setThresTemp(item.threshold.toString());

            return {
              id: item.id,
              name: item.name,
              status: item.status,
              type: item.type,
              threshold: item.threshold,
            };
          })
          .filter((item) => item.type == "sensor");
        setDevices(tempData);
      }
    };
    getAllDevices();
  }, [useIsFocused(), flag]);

  const handleConfirm = async () => {
    for (let i = 0; i < devices.length; i++) {
      var currThreshold = "";
      if (devices[i].name == "humid") currThreshold = thresHumid;
      else if (devices[i].name == "light") currThreshold = thresLight;
      else if (devices[i].name == "temp") currThreshold = thresTemp;

      //console.log(user?.id, devices[i].id, currThreshold);
      const res = await adjustThreshold(user?.id, devices[i].id, currThreshold);
      if (res.status != 200) return false;
    }
    return true;
  };

  const onChangeThreshold = (name, value) => {
    //console.log(value, name, name == "light");
    if (name == "humid") setThresHumid(value);
    else if (name == "light") setThresLight(value);
    else if (name == "temp") setThresTemp(value);
  };

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
      </View>

      <View
        style={{
          margin: 10,
          backgroundColor: "#EFF9F1",
          borderRadius: 45,
          padding: 10,
          marginTop: "0%",
        }}
      >
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Text style={{ fontSize: 23, color: "#3CAF58" }}>
                Ngưỡng dữ liệu
              </Text>
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Header style={{ marginLeft: "5%" }}>
            <DataTable.Title style={{ flex: 1 }}>
              <Text style={{ color: "#3CAF58" }}>Thông số</Text>
            </DataTable.Title>
            <DataTable.Title style={{ flex: 1 }}>
              <Text style={{ color: "#3CAF58" }}>Ngưỡng hiện tại</Text>
            </DataTable.Title>
          </DataTable.Header>

          {devices.map((item, index) => {
            return (
              <DataTable.Row key={index} style={{ marginLeft: "5%" }}>
                <DataTable.Cell style={{ flex: 1 }}>
                  <Text
                    style={
                      item.name == "humid" && overHumid
                        ? { color: "red" }
                        : item.name == "light" && overLight
                        ? { color: "red" }
                        : item.name == "temp" && overTemp
                        ? { color: "red" }
                        : { color: "#3CAF58" }
                    }
                  >
                    {getName(item.name)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 1 }}>
                  <TextInput
                    editable={!disableInput}
                    style={
                      item.name == "humid" && overHumid
                        ? { color: "red" }
                        : item.name == "light" && overLight
                        ? { color: "red" }
                        : item.name == "temp" && overTemp
                        ? { color: "red" }
                        : { color: "#3CAF58" }
                    }
                    value={
                      item.name == "humid"
                        ? thresHumid
                        : item.name == "light"
                        ? thresLight
                        : thresTemp
                    }
                    onChangeText={(text) => onChangeThreshold(item.name, text)}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}

          <DataTable.Row>
            <DataTable.Cell
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Button
                title={disableInput ? "Sửa ngưỡng dữ liệu" : "Lưu lại"}
                onPress={() => {
                  if (disableInput) setDisableInput(false);
                  else {
                    if (handleConfirm())
                      Alert.alert(
                        "Thành công",
                        "Ngưỡng dữ liệu đã được cập nhật!"
                      );
                    else Alert.alert("Lỗi", "Lỗi máy chủ!");
                    setDisableInput(true);
                    setFlag(!flag);
                  }
                }}
                color={"#3CAF58"}
              />
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </View>
  );
}

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
    elevation: 4,
  },
  measureLine: {},
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
