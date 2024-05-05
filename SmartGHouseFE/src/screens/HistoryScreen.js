import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import styles from "../styles/styles";
import { DataTable, Modal } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";
import React, { useEffect, useState, useRef } from "react";
import { getDataByMonth } from "../services/userService";
import SegmentedPicker from "react-native-segmented-picker";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const getCurrentMonth = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // January is 0
  return currentMonth;
};
const getCurrentYear = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return currentYear;
};

const AppButton = ({ onPress, title, style, titleStyle, disabledCondition }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[{
      width: '60%',
      backgroundColor: 'white',
      alignItems: 'center',
      marginBottom: 10,
      maxHeight: 35,
      borderRadius: 20,
      paddingHorizontal: '10%'
    }, style]}
    disabled = {disabledCondition}
  >
    <Text style={[{ fontSize: 20, fontVariant: 'roboto', color: '#3CAF58', paddingVertical: '1%' }, titleStyle,]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default function HistoryScreen() {
  const [logDevice, setLogDevice] = useState([]);
  const [selectedValue, setSelectedValue] = useState("manual-light");
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedYear, setSelectedYear] = useState(getCurrentYear());
  const [isVisible, setIsVisible] = useState(false);
  const [maxPage, setMaxPage] = useState(0);

  const itemsPerPage = 8; // Define the number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = currentPage * itemsPerPage;

  const paginatedData = logDevice.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onConfirm = (selections) => {
    //console.info(selections);
    setIsVisible(false);
    setSelectedValue(selections?.col_1);
    setSelectedMonth(parseInt(selections?.col_2));
    setSelectedYear(parseInt(selections?.col_3));
  };

  const segmentedPicker = useRef(null);
  const togglePicker = () => {
    setIsVisible(!isVisible); // Toggle the visibility state
    segmentedPicker.current.show();
    setCurrentPage(0);
  };

  const fetchData = async () => {
    try {
      const res = await getDataByMonth(
        selectedValue,
        selectedMonth,
        selectedYear
      );
      setLogDevice(res.data);

      const temp = Math.ceil(res.data.length / itemsPerPage);
      setMaxPage(temp);
      if (temp > 0)
        setCurrentPage(1);
      else
        setCurrentPage(0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedValue, selectedMonth, selectedYear]);

  return (
    <>
      <SegmentedPicker
        ref={segmentedPicker}
        onConfirm={onConfirm}
        options={[
          {
            key: "col_1",
            items: [
              { label: "Hệ thống đèn", value: "manual-light" },
              { label: "Máy bơm nước", value: "manual-pump" },
            ],
          },
          {
            key: "col_2",
            items: [
              { label: "T1", value: "1" },
              { label: "T2", value: "2" },
              { label: "T3", value: "3" },
              { label: "T4", value: "4" },
              { label: "T5", value: "5" },
              { label: "T6", value: "6" },
              { label: "T7", value: "7" },
              { label: "T8", value: "8" },
              { label: "T9", value: "9" },
              { label: "T10", value: "10" },
              { label: "T11", value: "11" },
              { label: "T12", value: "12" },
            ],
          },
          {
            key: "col_3",
            items: [
              { label: "2024", value: "2024" },
              { label: "2023", value: "2023" },
              { label: "2022", value: "2022" },
              { label: "2021", value: "2021" },
              { label: "2020", value: "2020" },
              { label: "2019", value: "2019" },
              { label: "2018", value: "2018" },
              { label: "2017", value: "2017" },
              { label: "2016", value: "2016" },
              { label: "2015", value: "2015" },
            ],
          },
        ]}
      />
      <View
        style={[
          styles.container,
          {
            backgroundColor: "#EFF9F1",
            borderRadius: 30
          },
        ]}
      >
        <View style={{ 
          marginTop: "0%",
          position: "absolute",
          top: "7%"
        }}>
          <Text style={{ fontSize: 23, color: "#3CAF58" }}>
            Lịch sử hoạt động
          </Text>
        </View>
        <View style={{
          flexDirection: "row",
          position: "absolute",
          top: "12%"
        }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {selectedValue == "manual-pump" ? (
              <Ionicons name="water-outline" size={24} color="blue" />
            ) : (
              <FontAwesome5 name="lightbulb" size={24} color="#FCC460" />
            )}
            <Text style={{ marginLeft: 5 }}>
              {selectedValue == "manual-light"
                ? "Hệ thống đèn"
                : "Máy bơm nước"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <MaterialIcons name="access-time" size={24} color="#FAA220" />
            <Text style={{ marginLeft: 5 }}>
              {"Tháng " + selectedMonth + " Năm " + selectedYear}
            </Text>
          </View>
        </View>
        
        <DataTable 
          style={{ 
          justifyContent: "space-evenly", 
          marginLeft: "5%",
          marginTop: "0%",
          position: "absolute",
          top: "12%"
        }}
        >
          <DataTable.Row style={{ flex: 1 }}>
            <DataTable.Cell> </DataTable.Cell>
            <DataTable.Cell></DataTable.Cell>
          </DataTable.Row>
          <DataTable.Header>
            <DataTable.Title style={{ marginLeft: "5%" }}>
              <Text style={{ color: "#3CAF58" }}>Ngày</Text>
            </DataTable.Title>
            <DataTable.Title style={{  }}>
              <Text style={{ color: "#3CAF58" }}>Giờ</Text>
            </DataTable.Title>

            <DataTable.Title style={{  }}>
              <Text style={{ color: "#3CAF58" }}>Hoạt động</Text>
            </DataTable.Title>
          </DataTable.Header>
          {/* {
            paginatedData.length <= 0 &&
            // <DataTable.Row>
            //   <DataTable.Cell
            //     style={{ marginLeft: "5%" }}
            //     textStyle={{ color: "black" }}
            //   >
            //     Không có dữ liệu
            //   </DataTable.Cell>
            // </DataTable.Row>
            <Text style={{ marginLeft: "5%", marginTop: "5%" }} textStyle={{ color: "black" }}>Không có dữ liệu</Text>
          } */}
          {
            paginatedData.map((item, index) => {
              // Create a new Date object from the timestamp
              const date = new Date(item.created_at);

              // Format the date and time as desired
              const formattedDate = date.toLocaleDateString([], {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit"
              }); // Example: "4/25/2024"
              const formattedTime = date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              }); // Example: "3:00:53 PM"

              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell
                    style={{ marginLeft: "5%" }}
                    textStyle={{ color: "black" }}
                  >
                    {formattedDate}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{ }}
                    textStyle={{ color: "black" }}
                  >
                    {formattedTime}
                  </DataTable.Cell>

                  <DataTable.Cell
                    style={{ }}
                    textStyle={{ color: "black" }}>
                    {item.value == 1 ? "Bật" : "Tắt"}
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })
          }
        </DataTable>

        <View
          style={{
            flexDirection: "row",
            //marginTop: "5%",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "80%"
          }}
        >
          <Button title={"Lọc dữ liệu"}
            onPress={() => {
              togglePicker();
            }} 
          />
          <Text
            style={{ marginLeft: 10, marginRight: 10 }}
          ></Text>
          {/* <Button
            onPress={prevPage}
            title="Previous"
            disabled={currentPage === 1}
            color={"#0a5962"}
          /> */}
          <MaterialCommunityIcons name="arrow-left" size={24} color="blue" onPress={() => {
            if (currentPage != 1)
              prevPage();
          }}/>
          <Text
            style={{ marginLeft: 10, marginRight: 10 }}
          >{`Page ${currentPage} of ${maxPage}`}</Text>
          {/* <Button
            onPress={nextPage}
            title="Next"
            color={"#0a5962"}
            disabled={endIndex >= logDevice.length}
          /> */}
          <MaterialCommunityIcons name="arrow-right" size={24} color="blue" onPress={() => {
            if (currentPage < maxPage)
              nextPage();
          }}/>
        </View>
      </View>
    </>
  );
}
