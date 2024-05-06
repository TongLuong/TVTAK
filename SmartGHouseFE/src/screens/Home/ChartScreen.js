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

const screenWidth = Dimensions.get("window").width;

const Chart = ({
  data,
  color,
  backgroundGradientFrom,
  backgroundGradientTo,
  labelColor,
  gridColor
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
      width={(screenWidth/100)*90}
        height={175}
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: color,
          backgroundGradientFrom: backgroundGradientFrom, // Change gradient start color to yellow
          backgroundGradientTo: backgroundGradientTo,
          decimalPlaces: 0,
          color: (opacity = 1) => gridColor,
          labelColor: (opacity = 1) => labelColor,
          stroke: "black"
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 8,
          paddingLeft: 20,
        }}
        withVerticalLines
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
        <Text style={[chartStyle.titleChart, {color: "#755A09"}]}>Giá trị ánh sáng (Lux)</Text>
        <Chart
          data={data1}
          color={"#755A09"}
          backgroundGradientFrom={"#ebdeb8"}
          backgroundGradientTo={"#ebdeb8"}
          labelColor={"#755A09"}
          gridColor={"#755A09"}
        />
        {data2.length > 0 && (
          <Text style={[chartStyle.titleChart, { color: '#850000'}]}>Giá trị nhiệt độ (°C)</Text>
        )}
        <Chart
          data={data2}
          color={"#850000"}
          backgroundGradientFrom={"#f3cdcc"}
          backgroundGradientTo={"#f3cdcc"}
          labelColor={"#850000"}
          gridColor={"#850000"}
        />
        {data3.length > 0 && (
          <Text style={[chartStyle.titleChart, { color: "#3e4ca0"}]}>Giá trị độ ẩm (%)</Text>
        )}
        <Chart
          data={data3}
          color={"#3e4ca0"}
          backgroundGradientFrom={"#cfe2e4"}
          backgroundGradientTo={"#cfe2e4"}
          labelColor={"#3e4ca0"}
          gridColor={"#3e4ca0"}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const chartStyle = StyleSheet.create({
  chartContainer: {
    flex: 1,
    backgroundColor: "#EFF9F1",
  },
  chartConfig: {
    margin: 10,
  },
  titleChart: {
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: "bold"
  },
  title: {
    fontSize: 30,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  scrollView: {
    paddingBottom: 20,
  },
});
export default ChartScreen;
