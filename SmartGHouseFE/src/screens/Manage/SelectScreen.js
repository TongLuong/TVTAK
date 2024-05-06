import { useState } from "react";
import { View, Text, SectionList, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Image } from "react-native";
import lightPhoto from "../../../assets/light.jpeg";
import pumpPhoto from "../../../assets/pump.webp";
import light2 from "../../../assets/light3.png";
import light2_grey from "../../../assets/light3-grey.png";
import pump2 from "../../../assets/watering.jpg";
import pump2_grey from "../../../assets/watering-grey.jpg";

  const AppButton = ({ onPress, title, style, titleStyle }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[{
        width: '45%',
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: 10,
        maxHeight: 35,
        borderRadius: 20,
        paddingHorizontal: '10%',
        elevation: 3
      }, style]}
    >
      <Text style={[{ fontSize: 19, fontVariant: 'roboto', color: '#3CAF58', paddingVertical: '1%' }, titleStyle,]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

export default function SelectScreen( {navigation, route} ) {
    let option = route.params;
    const [funcSeclection, setFuncSelection] = useState('');
    const [type, setType] = useState('');


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginBottom: '10%'}}>
            <Text style={{ fontSize: 25, marginBottom: '4%', fontWeight: '600', color: '#3CAF58', alignSelf: 'center' }}>Chọn chức năng</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={funcSeclection === 'light' && { borderWidth: 2, padding: '3%', borderColor: '#3CAF58'}}>
            <TouchableOpacity
                onPress={() => {setFuncSelection('light')}}
            >
                <Text style={{ alignSelf: 'center', fontSize: 20, marginBottom: '4%', color: '#3CAF58', fontWeight: '600' }}>Chiếu sáng</Text>
                {funcSeclection === 'pump' || funcSeclection === '' ?
                <Image
                source={light2_grey}
                style={{ width: 160, height: 160, borderRadius: 10 }}
                /> :
                <Image
                source={light2}
                style={{ width: 160, height: 160, borderRadius: 10 }}
                />
                }
            </TouchableOpacity>
            </View>
            <View style={funcSeclection === 'pump' && { borderWidth: 2, padding: '3%', borderColor: '#3CAF58'}}>
            <TouchableOpacity
            onPress={() => {setFuncSelection('pump')}}
            >
                <Text style={{ alignSelf: 'center', fontSize: 20, marginBottom: '4%', color: '#3CAF58', fontWeight: '600' }}>Tưới tiêu</Text>
                    {funcSeclection === 'light' || funcSeclection === '' ?
                    <Image
                    source={pump2_grey}
                    style={{ width: 160, height: 160, borderRadius: 10 }}
                    /> :
                    <Image
                    source={pump2}
                    style={{ width: 160, height: 160, borderRadius: 10 }}
                    />
                    }
                    {/* {console.log(funcSeclection)} */}
            </TouchableOpacity>
            </View>
            </View>
            </View>
            <View style={{ marginBottom: '25%'}}>
            <Text style={{ fontSize: 25, marginTop: '4%', fontWeight: '600', color: '#3CAF58', alignSelf: 'center' }}>Chọn phương thức</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                style={type === '' || type === 'manual' ? [loginStyle.submitButton, { borderWidth: 1, borderColor: "#3CAF58", backgroundColor: 'white' }] : loginStyle.submitButton}
                onPress={() => setType('auto')}
                >
                    <Text style={type === '' || type === 'manual' ? [loginStyle.submitButtonText, { color: '#3CAF58' }] : loginStyle.submitButtonText}>Tự động</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={type === '' || type === 'auto' ? [loginStyle.submitButton, { borderWidth: 1, borderColor: "#3CAF58", backgroundColor: 'white' }] : loginStyle.submitButton}
                    onPress={() => setType('manual')}
                >
                    <Text style={type === '' || type === 'auto' ? [loginStyle.submitButtonText, { color: '#3CAF58' }] : loginStyle.submitButtonText}>Thủ công</Text>
                </TouchableOpacity>
            </View>
            </View>
            <View>
                <TouchableOpacity
                style={(funcSeclection != '' && type != '') ? loginStyle.submitButton2 : [loginStyle.submitButton2, { backgroundColor: 'grey', borderWidth: 0 }]}
                disabled={!(funcSeclection != '' && type != '')}
                onPress={() => {
                    if (funcSeclection === 'light' && type === 'manual') {
                        navigation.navigate("Manuallight");
                    } 
                    else if (funcSeclection === 'pump' && type === 'manual') {
                        }
                    else if (funcSeclection === 'light' && type === 'auto') {
                        navigation.navigate("Auto", (data = {func: "light"}));
                    }
                    else navigation.navigate("Auto", (data = {func: "pump"}));
                    }}
            >
                <Text style={loginStyle.submitButtonText}>Tiếp tục</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[loginStyle.submitButton2, { marginTop: 0, borderWidth: 1, borderColor: "#3CAF58", backgroundColor: 'white' }]}
                onPress={() => {
                    navigation.navigate("DeviceList");
                  }}
            >
                <Text style={[loginStyle.submitButtonText, { color: '#3CAF58' }]}>Quản lý danh sách thiết bị</Text>
            </TouchableOpacity>
            </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: '25%',
      paddingHorizontal: '6%',
      marginBottom: 65, 
      backgroundColor: '#EFF9F1',
      flexDirection: 'column',

    },
    item: {
      backgroundColor: '#FAF9F8',
      padding: 20,
      marginVertical: 8,
      marginLeft: '9%',
      elevation: 5,
      borderRadius: 20,
    },
    header: {
      fontSize: 25,
    },
    title: {
      fontSize: 20,
      marginBottom: '3%'
    },
  });

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
      width: '40%',
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
      fontWeight: '500',
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
    submitButton2: {
        backgroundColor: "#3CAF58",
        padding: 10,
        margin: 15,
        height: 40,
        borderColor: "#3CAF58",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
      },
  });