import { View, Text, SectionList, StyleSheet, StatusBar, SafeAreaView, Alert } from "react-native";
import { getAllNote, deleteNote, editNote } from '../../services/userService';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from '@react-navigation/native';

export default function NoteList({ navigation }) {
    const [data, setData] = useState([{data: ["Loading..."]}]);
    const [idNote, setIdNote] = useState([-1]);
    const [update, setUpdate] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
      const getAllNotes = async () => {
        try {
          const user = await AsyncStorage.getItem("User");
          const userData = JSON.parse(user);
          setUser(userData);

          const res = await getAllNote(userData?.id);
          setData([{data: JSON.parse(JSON.stringify(res.data)).map((item) => {
                return item.content;
              })
          }]);
          
          setIdNote(JSON.parse(JSON.stringify(res.data)).map((item) => {
            return item.id;
          })
        );
        } catch (error) {
          console.log(error);
        }
      };
      getAllNotes();
    }, [update, useIsFocused()]);

    const _deleteNote = async (i) => {
      const res = await deleteNote(user?.id, idNote[i]);
      setUpdate(!update);
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
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    navigation.navigate("NoteAddition", {id: idNote[index], content: data[0].data[index]});
                  }
                }
              >
              <Text style={styles.title}>{item}</Text>
              </TouchableOpacity>
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