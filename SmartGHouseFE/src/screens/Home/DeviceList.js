import { useState } from "react";
import { View, Text, SectionList, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity } from "react-native";

const DATA = [
    {
      name: 'Hệ thống đèn',
      data: [{
        id: 1,
        name: 'Hệ thống đèn',
        status: 1,
        type: 'manual',
      }]
    },
    {
      name: 'Máy bơm nước',
      data: [{
        id: 2,
        name: 'Máy bơm nước',
        status: 0, 
        type: 'auto'
      }]
    },
    
  ];

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

export default function DeviceList() {
    const [flag, setFlag] = useState(false);
    return (
        <SafeAreaView style={styles.container}>
          <Text style={{ fontSize: 26, textAlign: 'center'}}>Cài đặt thiết bị</Text>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.title}>Tên thiết bị: {item.name}</Text>
              <Text style={styles.title}>Chế độ: {item.type == 'manual' ? 'Thủ công' : 'Tự động'}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '3%' }} >
                <AppButton title={"Thủ công"} style={item.type == 'manual' && { borderColor: '#3CAF58', borderWidth: 1}} titleStyle={item.type == 'auto' && {color: 'grey'}} onPress={() => {item.type = 'manual'; setFlag(!flag);}}/>
                <AppButton title={"Tự động"} style={item.type == 'auto' && { borderColor: '#3CAF58', borderWidth: 1}} titleStyle={item.type == 'manual' && {color: 'grey'}} onPress={() => {item.type = 'auto'; setFlag(!flag);}}/>
              </View>
              <Text style={styles.title}>Trạng thái: {item.status == 1 ? 'Bật' : "Tắt"}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '3%' }} >
                <AppButton title={"Bật"} style={{ borderColor: '#3CAF58', borderWidth: 1}} onPress={() => {item.status = 1; setFlag(!flag);}}/>
                <AppButton title={"Tắt"} style={{ borderColor: 'red', borderWidth: 1}} titleStyle={{color: 'red'}} onPress={() => {item.status = 0; setFlag(!flag);}}/>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: '2%',
      marginHorizontal: 16,
      marginBottom: 65, 
      backgroundColor: '#EFF9F1',
    },
    item: {
      backgroundColor: '#FAF9F8',
      padding: 20,
      marginVertical: 8,
      elevation: 5,
      borderRadius: 20,
    },
    header: {
      fontSize: 32,
    },
    title: {
      fontSize: 24,
      marginBottom: '3%'
    },
  });