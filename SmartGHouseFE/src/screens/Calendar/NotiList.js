import { useState } from "react";
import { View, Text, SectionList, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity } from "react-native";

const DATA = [
    {
      date: '2024-05-05',
      data: [{
        id: 1,
        time: '15:00',
        content: 'Thăm vườn'
      }, 
      {
        id: 1,
        time: '18:00',
        content: 'Bật đèn'
      },
    ]
    },
    {
      date: '2024-05-06',
      data: [{
        id: 1,
        time: '15:00',
        content: 'Thăm vườn'
      }, 
      {
        id: 1,
        time: '18:00',
        content: 'Bật đèn'
      },
    ]
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

export default function NotiList() {
    return (
        <SafeAreaView style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.title}>Thời gian: {item.time}</Text>
              <Text style={styles.title}>Nội dung: {item.content}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '3%' }} >
                <AppButton title={"Xóa"} style={{ borderWidth: 1, borderColor: 'red' }} titleStyle={{ color: 'red'}}/>
              </View>
            </View>
          )}
          renderSectionHeader={({section: {date}}) => 
            {
              return <Text style={styles.header}>{date}</Text>
            }}
        />
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: '10%',
      marginHorizontal: 16,
      marginBottom: 65, 
      backgroundColor: '#EFF9F1',
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