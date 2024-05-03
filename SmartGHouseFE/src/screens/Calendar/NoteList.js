import { View, Text, SectionList, StyleSheet, StatusBar, SafeAreaView } from "react-native";

const DATA = [
    {
      date: 'Main dishes',
      data: ['Ngày biệt ly người đi chẳng nói nên câu, Dẫu em còn níu lại vài câu ướt mi'],
    },
    {
      date: 'Sides',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      date: 'Drinks',
      data: ['Water', 'Coke', 'Beer'],
    },
    {
      date: 'Desserts',
      data: ['Cheese Cake', 'Ice Cream'],
    },
  ];

export default function NoteList() {
    return (
        <SafeAreaView style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
              <View style={{backgroundColor: 'black'}}>
                <Text>ABC</Text>
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