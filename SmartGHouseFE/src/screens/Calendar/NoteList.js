import { View, Text, SectionList, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { getAllNote } from '../../services/userService';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NoteList() {
    const [user, setUser] = useState({});
    const [data, setData] = useState({});

    useEffect(() => {
      const getAllNotes = async () => {
        try {
          const user = await AsyncStorage.getItem("User");
          const userData = JSON.parse(user);
          setUser(userData);

          const res = await getAllNote(userData?.id);
          setData(JSON.parse(JSON.stringify(res.data)).map((item, _) => {
              return {data: [item.content]};
            })
          );
        } catch (error) {
          console.log(error);
        }
      };
      getAllNotes();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
        {/* <SectionList
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
              <View style={{backgroundColor: 'black'}}>
                <Text>ABC</Text>
              </View>
            </View>
          )}
        /> */}
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: '2%',
      marginHorizontal: 16,
      marginBottom: 65
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
    },
    header: {
      fontSize: 32,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
    },
  });