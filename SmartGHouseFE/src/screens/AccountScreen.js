import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountScreen({ navigation }) {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await AsyncStorage.getItem("User");
        const userData = JSON.parse(user);
        if (!userData) {
          navigation.navigate("AuthenScreen");
        }
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };
    checkLogin();
  }, []);

  return (
    <View style={{ backgroundColor: "#EFF9F1", flex: 1, marginTop: 20 }}>
      <View style={accountStyle.accountSym}>
        <Text style={accountStyle.nameText}>{user?.username}</Text>
        <Ionicons name="person-circle" size={100} />
      </View>
      <View style={{ flexDirection: "column" }}>
        {/* <View style={accountStyle.functionButton}>
          <Ionicons name="mail" size={24} color="black" />
          <TextInput
            editable
            style={{color: "black", flex: 1, paddingLeft: 20}}
            onChangeText={text => setEmail(text)}
            value={user.email ? user.email : "Chưa cập nhật"}
          />
        </View> */}
        <TouchableOpacity style={accountStyle.functionButton}>
          <Ionicons name="mail" size={24} color="black" />
          <Text style={accountStyle.functionButtonText}>
            {user.email ? user.email : "Chưa cập nhật"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={accountStyle.functionButton}>
          <Ionicons name="person" size={24} color="black" />
          <Text style={accountStyle.functionButtonText}>
            {user.username ? user.username : "Chưa cập nhật"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={accountStyle.functionButton}>
          <Ionicons name="call" size={24} color="black" />
          <Text style={accountStyle.functionButtonText}>
            {user.phone ? user.phone : "Chưa cập nhật"}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={accountStyle.functionButton}>
          <Ionicons name="lock-closed" size={24} color="black" />
          <Text style={accountStyle.functionButtonText}>
            Thông tin người dùng
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={accountStyle.functionButton}
          onPress={() => navigation.navigate("AuthenScreen")}
        >
          <Ionicons name="log-out" size={24} color="black" />
          <Text style={accountStyle.functionButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const accountStyle = StyleSheet.create({
  accountSym: {
    alignItems: "center",
    marginTop: 20,
    height: 200,
    backgroundColor: "white",
  },
  nameText: {
    fontVariant: "roboto",
    fontWeight: "bold",
    fontSize: 40,
    color: "#3CAF58",
    marginTop: 20,
  },
  functionButton: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    flexDirection: "row",
    height: 50,
    padding: 10,
    margin: 20,
    marginTop: 30,
  },
  functionButtonText: {
    color: "black",
    paddingLeft: 20,
  },
});
