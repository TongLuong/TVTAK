import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { getRecordAvgInDay } from "../../services/userService";

const Chart = ({
  data,
  color,
  backgroundGradientFrom,
  backgroundGradientTo,
  labelColor,
}) => {
  if (data.length === 0) return <View></View>;
  const values = data.map((item) => parseInt(item.value));
  const labels = data.map((item) => item.date);
  return (
    <View>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: values,
              color: (opacity = 1) => color,
            },
          ],
        }}
        width={350}
        height={170}
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: color,
          backgroundGradientFrom: backgroundGradientFrom, // Change gradient start color to yellow
          backgroundGradientTo: backgroundGradientTo,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => labelColor,
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 8,
          paddingLeft: 20,
        }}
      />
    </View>
  );
};

const ChartScreen = () => {
  const [data1, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await getRecordAvgInDay("iot-light");
        setData(data1?.data);
        const data2 = await getRecordAvgInDay("iot-temp");
        setData2(data2?.data);

        const data3 = await getRecordAvgInDay("iot-humid");
        setData3(data3?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={chartStyle.chartContainer}>
      <ScrollView style={chartStyle.scrollView}>
        {data1.length > 0 && (
          <Text style={chartStyle.title}>Biểu đồ thống kê</Text>
        )}
        <Text style={chartStyle.titleChart}>Cảm biến ánh sáng</Text>
        <Chart
          data={data1}
          color={"black"}
          backgroundGradientFrom={"#ffd700"}
          backgroundGradientTo={"#ffec8b"}
          labelColor={"black"}
        />
        {data2.length > 0 && (
          <Text style={chartStyle.titleChart}>Cảm biến nhiệt độ</Text>
        )}
        <Chart
          data={data2}
          color={"white"}
          backgroundGradientFrom={"#ff0000"}
          backgroundGradientTo={"#ff6347"}
          labelColor={"white"}
        />
        {data3.length > 0 && (
          <Text style={chartStyle.titleChart}>Cảm biến độ ẩm</Text>
        )}
        <Chart
          data={data3}
          color={"white"}
          backgroundGradientFrom={"#0000ff"}
          backgroundGradientTo={"#6495ed"}
          labelColor={"white"}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const chartStyle = StyleSheet.create({
  chartContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 25,
  },
  chartConfig: {
    margin: 10,
  },
  titleChart: {
    paddingLeft: 20,
    fontSize: 15,
    fontWeight: "bold",
  },
  title: {
    fontSize: 30,
    color: "#3CAF58",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
  scrollView: {
    paddingBottom: 20,
  },
});
export default ChartScreen;
