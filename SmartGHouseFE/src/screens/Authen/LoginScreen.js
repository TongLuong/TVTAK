import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { signIn } from "../../services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function App({ navigation }) {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // -1: login failed, 1: login succeeded, 0: not done
  const [loginStatus, setLoginStatus] = useState(0);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onSignInSubmit = async () => {
    try {
      const res = await signIn(username, pass);
      if (res.status === 200) {
        setLoginStatus(1);
        navigation.navigate("HomeScreen");
        const userDataString = JSON.stringify(res.data);
        await AsyncStorage.setItem("User", userDataString);
      }
    } catch (error) {
      console.log(error);
      setLoginStatus(-1);
    }
  };

  return (
    <SafeAreaView style={loginStyle.loginMain}>
      <View style={loginStyle.title}>
        <Ionicons name="person-circle" size={80} />
        <Text style={loginStyle.titleText}>Welcome</Text>
      </View>
      <View style={{ flexDirection: "column" }}>
        <View>
          <Text style={loginStyle.inputTitle}>Tên đăng nhập hoặc email</Text>
          <TextInput
            onChangeText={(text) => setUsername(text)}
            style={loginStyle.input}
            placeholder="Nhập tên đăng nhập hoặc email"
            placeholderTextColor="#aaa"
          />
        </View>
        <View>
          <Text style={loginStyle.inputTitle}>Mật khẩu</Text>
          <View style={loginStyle.containerPass}>
            <TextInput
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPass(text)}
              style={loginStyle.inputPass}
              placeholder="Nhập mật khẩu"
              placeholderTextColor="#aaa"
            />
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#aaa"
              style={loginStyle.iconPass}
              onPress={toggleShowPassword}
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          {loginStatus == -1 && (
            <Text style={loginStyle.failedText}>
              Sai tên đăng nhập hoặc mật khẩu!
            </Text>
          )}
          <TouchableOpacity
            style={loginStyle.submitButton}
            onPress={() => {
              onSignInSubmit();
            }}
          >
            <Text style={loginStyle.submitButtonText}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={loginStyle.signupButton}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={loginStyle.submitButtonText}>Đăng Ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const loginStyle = StyleSheet.create({
  loginMain: {
    backgroundColor: "white",
    paddingHorizontal: 30,
    borderColor: "black",
    borderWidth: 1,
    margin: 10,
    height: 600,
    marginTop: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  containerPass: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    margin: 15,
    backgroundColor: "#f3f3f3",
    borderRadius: 5,
  },
  title: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
  titleText: {
    fontVariant: "roboto",
    fontWeight: "bold",
    fontSize: 40,
    color: "#3CAF58",
  },
  input: {
    margin: 15,
    height: 40,
    // borderColor: "black",
    // borderWidth: 1,
    paddingLeft: 12,
    borderRadius: 5,
    backgroundColor: "#f3f3f3",
  },
  inputTitle: {
    fontVariant: "roboto",
    fontWeight: "bold",
    color: "black",
    marginLeft: 15,
  },
  failedText: {
    fontVariant: "roboto",
    fontWeight: "regular",
    textAlign: "center",
    color: "red",
  },
  submitButton: {
    backgroundColor: "#3CAF58",
    padding: 10,
    margin: 15,
    height: 40,
    borderColor: "#3CAF58",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
  },
  signupButton: {
    backgroundColor: "#bdbdbd",
    padding: 10,
    margin: 15,
    height: 40,
    borderColor: "#bdbdbd",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
  },
  otherfunction: {
    marginBottom: 20,
    flexDirection: "row",
  },
  otherfunctionText: {
    fontVariant: "roboto",
    fontWeight: "regular",
    color: "#3CAF58",
  },
  iconPass: {
    marginRight: 15,
  },
  inputPass: {
    flex: 1,
    paddingLeft: 12,
  },
});
