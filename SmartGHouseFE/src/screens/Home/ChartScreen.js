// import React, { useRef, useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { LineChart } from "react-native-chart-kit";
// import { Dimensions } from "react-native";
// import { getRecord } from "../../services/userService";

// const processData = (data) => {
//   const labels = data.map((item) => {
//     const date = new Date(item.created_at);
//     const hour = date.getHours();
//     const minutes = date.getMinutes().toString().padStart(2, "0"); // Padding for minutes
//     return `${hour}:${minutes}`;
//   });
//   const values = data.map((item) => parseInt(item.value));
//   return { labels, values };
// };
// const aggregateData = (data) => {
//   const aggregatedData = {};
//   data.forEach((item) => {
//     const date = new Date(item.created_at);
//     const key = Math.floor(date.getTime() / (15 * 60 * 1000)); // Unique key for each 30-minute interval
//     if (!aggregatedData[key]) {
//       aggregatedData[key] = { count: 0, sum: 0 };
//     }
//     aggregatedData[key].count++;
//     aggregatedData[key].sum += parseInt(item.value);
//   });

//   const aggregatedLabels = [];
//   const aggregatedValues = [];
//   for (const key in aggregatedData) {
//     const intervalStart = new Date(key * 15 * 60 * 1000); // Convert key back to milliseconds
//     const hour = intervalStart.getHours();
//     const minute = intervalStart.getMinutes();
//     aggregatedLabels.push(`${hour}:${String(minute).padStart(2, "0")}`);
//     aggregatedValues.push(aggregatedData[key].sum / aggregatedData[key].count);
//   }

//   return { labels: aggregatedLabels, values: aggregatedValues };
// };
// const Chart = ({ data }) => {
//   const { labels, values } = aggregateData(data);

//   return (
//     <View>
//       <LineChart
//         data={{
//           labels: labels,
//           datasets: [
//             {
//               data: values,
//             },
//           ],
//         }}
//         width={350}
//         height={200}
//         yAxisSuffix=""
//         yAxisInterval={1}
//         chartConfig={{
//           backgroundColor: "#e26a00",
//           backgroundGradientFrom: "#fb8c00",
//           backgroundGradientTo: "#ffa726",
//           decimalPlaces: 0,
//           color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//         }}
//         bezier
//         style={{
//           marginVertical: 8,
//           borderRadius: 8,
//           paddingLeft: 20,
//         }}
//       />
//     </View>
//   );
// };

// const ChartScreen = () => {
//   const [data1, setData] = useState([]);
//   const [data2, setData2] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data1 = await getRecord("iot-light");
//         setData(data1.data);
//         console.log(data1.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <View>
//       {/* <Text>Cảm biến ánh sáng</Text> */}
//       <Chart data={data1} />
//     </View>
//   );
// };
// const chartStyle = StyleSheet.create({
//   chartContainer: {
//     flex: 1,
//     backgroundColor: "#fff",
//     marginTop: 25,
//   },
//   chartConfig: {
//     margin: 10,
//   },
// });

// export default ChartScreen;
