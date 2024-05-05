import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import lightPhoto from "../../../assets/light.jpeg";
import pumpPhoto from "../../../assets/pump.webp";
export default function App({ navigation }) {
  return (
    <View style={{ backgroundColor: "#EFF9F1", flex: 1 }}>
      <View style={funcopStyle.title}>
        <Text style={funcopStyle.nameText}>Chọn chức năng</Text>
      </View>
      <View style={{ flexDirection: "column", marginTop: 50 }}>
        <TouchableOpacity
          style={funcopStyle.functionButton}
          onPress={() =>
            navigation.navigate("Methodop", (data = { func: "light" }))
          }
        >
          <Image
            source={lightPhoto}
            style={{ width: 300, height: 150, borderRadius: 10 }}
          />
          <Text style={funcopStyle.functionButtonText}>Chiếu sáng</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "column", marginTop: 50 }}>
        <TouchableOpacity
          style={funcopStyle.functionButton}
          onPress={() =>
            navigation.navigate("Methodop", (data = { func: "pump" }))
          }
        >
          <Image
            source={pumpPhoto}
            style={{ width: 300, height: 150, borderRadius: 10 }}
          />
          <Text style={funcopStyle.functionButtonText}>Tưới tiêu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const funcopStyle = StyleSheet.create({
  title: {
    marginTop: 80,
    alignItems: "center",
    flexDirection: "column",
  },
  nameText: {
    fontVariant: "roboto",
    fontWeight: "bold",
    fontSize: 40,
    color: "#3CAF58",
  },
  functionButton: {
    alignItems: "center",
    borderRadius: 20,
  },
  functionButtonText: {
    color: "black",
    paddingTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
