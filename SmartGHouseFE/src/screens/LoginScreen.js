import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from "react-hook-form";
import axiosInst from "../axios/axiosClient";
import { useState } from 'react';
import axios from "axios";

export default function App({navigation}) {
    const {register, handleSubmit} = useForm({
      defaultValues: {username: "", password: ""}
    });

    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    const onSignInSubmit = async () => {
      // await axiosInst.get(
      //   "/api/user/signin",
      //   {
      //     account: username,
      //     password: pass
      //   })
      //   .then(res => {
      //     console.log(res.data);
      //   })
      //   .catch(e => console.log(e));
      console.log("yo");
      await axiosInst.get(
        "test")
        .then(res => {
          console.log("hello");
        })
        .catch(e => console.log(e));
        console.log("yo2");
    };

    return (
        <SafeAreaView style = {loginStyle.loginMain}>
          <View style = {loginStyle.title}>
            <Image style = {loginStyle.image} source={require('../Image/User_avatar.png')}/>
            <Text style = {{fontVariant:'roboto' ,fontWeight:'bold', fontSize:40, color:'#3CAF58'}}>Đăng nhập</Text>
          </View>
          <View style = {{flexDirection:'column'}}>
            <View>
              <Text style = {{fontVariant:'roboto' ,fontWeight:'regular', color:'black'}}>Địa chỉ email</Text>
              <TextInput
                //{...register("username", { required: "field cannot be empty" })}
                onChangeText={(text) => setUsername(text)}
                style = {loginStyle.input}
                placeholder=''
                placeholderTextColor = 'black'
              />
            </View>
            <View>
              <Text style = {{fontVariant:'roboto' ,fontWeight:'regular', color:'black'}}>Mật khẩu</Text>
              <TextInput 
                //{...register("password")}
                onChangeText={(text) => setPass(text)}
                style = {loginStyle.input}
                placeholder=''
                placeholderTextColor = 'black'
              />
            </View>
            <View>
              <TouchableOpacity style = {loginStyle.submitButton}
                onPress={() => {
                  //navigation.navigate('Account')}
                  onSignInSubmit()
                  }}>
                <Text style={ loginStyle.submitButtonText}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
            <View style = {loginStyle.otherfunctionText}>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style = {{fontVariant:'roboto' ,fontWeight:'regular', color:'#3CAF58', }}>Đăng ký</Text>
              </TouchableOpacity>
              <Text style = {{flex:1}}/>
              <TouchableOpacity>
                <Text style = {{fontVariant:'roboto' ,fontWeight:'regular', color:'#3CAF58'}}>Quên mật khẩu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
    );
  }
  const loginStyle = StyleSheet.create(
    {
      loginMain: {
        backgroundColor:'white',
        paddingHorizontal:30,
        borderColor: 'black',
        borderWidth: 1,
        margin: 10,
        height: 450
      },
      title:{
        marginTop: 30,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column'
      },
      image: {
        width: 50,
        height: 50,
        borderRadius: 100,
      },
      input: {
        margin: 15,
        height: 40,
        borderColor: 'black',
        borderWidth: 1
      },
      submitButton: {
        backgroundColor: '#3CAF58',
        padding: 10,
        margin: 15,
        height: 40,
        borderColor: '#3CAF58',
        alignItems:'center',
        borderWidth: 1
      },
      submitButtonText: {
        color: 'white'
      },
      otherfunctionText: {
        marginTop:10,
        flexDirection: 'row'
      },
    }
  )
