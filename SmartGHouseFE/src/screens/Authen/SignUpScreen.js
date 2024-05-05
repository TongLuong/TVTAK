import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { signUp } from "../../services/userService";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function App({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const checkValid = () => {
    if (
      username === "" ||
      password === "" ||
      email === "" ||
      rePassword === "" ||
      phone === ""
    ) {
      return false;
    }
    return true;
  };
  const onSignUpSubmit = async () => {
    try {
      if (!checkValid()) {
        console.log("Invalid input");
        return;
      }
      if (password !== rePassword) {
        console.log("Password not match");
        return;
      }
      const data = {
        email: email,
        username: username,
        password: password,
        phone: phone,
      };
      const res = await signUp(data);
      if (res.status === 200) {
        console.log("Sign up succeeded");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
    }
    // e.message: status code
    // e.response.data: body
    // e.response.status
    // e.response.header
  };

  return (
    <SafeAreaView style={signupStyle.signupMain}>
      <View style={signupStyle.title}>
        <Text style={signupStyle.titleText}>Đăng Ký</Text>
      </View>
      <View style={{ flexDirection: "column" }}>
        <View>
          <Text style={signupStyle.inputTitle}>Địa chỉ email</Text>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            style={signupStyle.input}
            placeholder=""
            placeholderTextColor="black"
          />
        </View>
        <View>
          <Text style={signupStyle.inputTitle}>Số điện thoại</Text>
          <TextInput
            onChangeText={(text) => setPhone(text)}
            style={signupStyle.input}
            placeholder=""
            placeholderTextColor="black"
          />
        </View>
        <View>
          <Text style={signupStyle.inputTitle}>Tên đăng nhập</Text>
          <TextInput
            onChangeText={(text) => setUsername(text)}
            style={signupStyle.input}
          />
        </View>
        <View>
          <Text style={signupStyle.inputTitle}>Mật khẩu</Text>
          <View style={signupStyle.containerPass}>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              style={signupStyle.inputPass}
              placeholder=""
              placeholderTextColor="black"
            />
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#aaa"
              style={signupStyle.iconPass}
              onPress={toggleShowPassword}
            />
          </View>
        </View>
        <View>
          <Text style={signupStyle.inputTitle}>Nhập lại mật khẩu</Text>
          <View style={signupStyle.containerPass}>
            <TextInput
              onChangeText={(text) => setRePassword(text)}
              style={signupStyle.inputPass}
              placeholder=""
              placeholderTextColor="black"
            />
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#aaa"
              style={signupStyle.iconPass}
              onPress={toggleShowPassword}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={signupStyle.submitButton}
            onPress={() => {
              onSignUpSubmit();
            }}
          >
            <Text style={signupStyle.submitButtonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
        <View style={signupStyle.otherfunction}>
          <Text>Đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={signupStyle.otherfunctionText}>Đăng nhập ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const signupStyle = StyleSheet.create({
  signupMain: {
    backgroundColor: "white",
    paddingHorizontal: 40,
    borderColor: "black",
    borderWidth: 1,
    margin: 10,
    height: 630,
    marginTop: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    margin: 10,
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
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#3CAF58",
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 40,
    marginRight: 40,
    height: 40,
    borderColor: "#3CAF58",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
  },
  otherfunction: {
    marginBottom: 20,
    marginLeft: 60,
    flexDirection: "row",
  },
  otherfunctionText: {
    fontVariant: "roboto",
    fontWeight: "regular",
    color: "#3CAF58",
  },
  containerPass: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 1,
    height: 40,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#f3f3f3",
  },
  iconPass: {
    marginRight: 15,
  },
  inputPass: {
    flex: 1,
    paddingLeft: 12,
  },
});
