import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { DataTable, Checkbox } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { toggleDevice } from "../../services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function App() {
  const [checkedItems, setCheckedItems] = useState(Array(8).fill(false));
  const [isStarted, setIsStarted] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AsyncStorage.getItem("User");
        if (!user) {
          navigator.navigate("UserScreen");
        }
        const userData = JSON.parse(user);
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handleStartStop = async () => {
    const newStatus = isStarted ? 1 : 0;
    setIsStarted(!isStarted);
    await toggleDevice(user?.id, 1, newStatus);
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
          <Text style={manuallightStyle.titleText}>Chọn khu vực:</Text>
        </View>
      </Text>
      <DataTable style={manuallightStyle.optionTable}>
        <DataTable.Header style={manuallightStyle.headerTable}>
          <DataTable.Cell>
            <Text style={manuallightStyle.tableText}>STT</Text>
          </DataTable.Cell>
          <DataTable.Title>
            <Text style={manuallightStyle.tableText}>Cây trong khu vực</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text></Text>
          </DataTable.Title>
        </DataTable.Header>

        {[...Array(8).keys()].map((index) => (
          <DataTable.Row style={manuallightStyle.rowsTable} key={index}>
            <DataTable.Cell textStyle={{ color: "#3CAF58" }}>
              {index + 1}
            </DataTable.Cell>
            <DataTable.Cell textStyle={manuallightStyle.tableText}>
              {
                [
                  "Cải bó xôi",
                  "Cà chua",
                  "Cà rốt",
                  "Dâu tây",
                  "Dưa chuột",
                  "Dưa lưới",
                  "Ớt chuông",
                  "Rau cải ngọt",
                ][index]
              }
            </DataTable.Cell>
            <DataTable.Cell>
              <Checkbox
                status={checkedItems[index] ? "checked" : "unchecked"}
                onPress={() => handleCheckboxChange(index)}
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <View style={manuallightStyle.actionButton}>
        <Button
          title={isStarted ? "Bắt đầu" : "Kết thúc"}
          color="#3CAF58"
          onPress={handleStartStop}
        />
      </View>
    </View>
  );
}

const manuallightStyle = StyleSheet.create({
  manuallightMain: {
    backgroundColor: "#EFF9F1",
    flex: 1,
  },
  optionTable: {
    borderColor: "#3CAF58",
    backgroundColor: "white",
    borderWidth: 0.7,
  },
  headerTable: {
    borderColor: "#3CAF58",
  },
  rowsTable: {
    borderColor: "#3CAF58",
  },
  titleText: {
    fontVariant: "roboto",
    fontWeight: "bold",
    fontSize: 40,
    color: "#3CAF58",
    marginVertical: 10,
  },
  tableText: {
    fontVariant: "roboto",
    fontWeight: "regular",
    color: "black",
  },
  actionButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 10,
    marginRight: 10,
  },
  selectView: {
    marginBottom: 10,
    marginVertical: 10,
  },
  dropdown: {
    margin: 16,
    height: 20,
    borderBottomColor: "#3CAF58",
    borderBottomWidth: 0.5,
  },
  dropText: {
    fontVariant: "roboto",
    fontWeight: "regular",
    color: "#3CAF58",
  },
  placeholderStyle: {
    fontSize: 16,
  },
});
