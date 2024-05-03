import { View, Text, SectionList, StyleSheet, StatusBar, SafeAreaView, Alert } from "react-native";
import { getAllNote, deleteNote, editNote } from '../../services/userService';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MaterialCommunityIcons
} from "@expo/vector-icons";

export default function NoteList() {
    const [data, setData] = useState([{data: ["Loading..."]}]);
    const [idNote, setIdNote] = useState([-1]);
    const [user, setUser] = useState({});

    useEffect(() => {
      const getAllNotes = async () => {
        try {
          const user = await AsyncStorage.getItem("User");
          const userData = JSON.parse(user);
          setUser(userData);

          const res = await getAllNote(userData?.id);
          setData(JSON.parse(JSON.stringify(res.data)).map((item) => {
              return {data: [item.content]};
            })
          );
          
          setIdNote(JSON.parse(JSON.stringify(res.data)).map((item) => {
            return item.id;
          })
        );
        } catch (error) {
          console.log(error);
        }
      };
      getAllNotes();
    }, [idNote]);

    const _deleteNote = async (i) => {
      console.log(idNote, i);
      const res = await deleteNote(user?.id, idNote[i]);
      if (res.status == 200)
      {
        setIdNote(idNote.filter((_, ind) => ind != i));
        return true;
      }
      return false;
    };

    return (
        <SafeAreaView style={styles.container}>
          <SectionList
            sections={data}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, index}) => (
              <View style={styles.item}>
                <Text style={styles.title}>{item}</Text>
                <MaterialCommunityIcons
                  name="note-edit"
                  size={20}
                  color="black"
                  style={{flex: 1}}
                  onPress={() => {console.log("edit note")}}
                />
                <Text> | </Text>
                <MaterialCommunityIcons
                  name="delete"
                  size={20}
                  color="black"
                  style={{flex: 1}}
                  onPress={() => {
                    if(_deleteNote(index))
                    {
                      console.log("Done");
                      Alert.alert("Success", "Delete note successfully!");
                    }
                    else
                    {
                      console.log("Failed");
                      Alert.alert("Error", "Server side error!");
                    }
                  }}
                />
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
      marginBottom: 65
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: "5%",
      marginVertical: "3%",
      flexDirection: "row",
      alignItems: "center"
    },
    header: {
      fontSize: 32,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      flex: 12
    },
  });