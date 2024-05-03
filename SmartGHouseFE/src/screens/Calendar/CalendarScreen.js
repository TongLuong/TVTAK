import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  TouchableOpacity,
  Touchable
} from 'react-native';
import moment from 'moment';
import Swiper from 'react-native-swiper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { DataTable } from 'react-native-paper';
import NoteAddition from './NoteAddition';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllNote } from '../../services/userService';

const { width } = Dimensions.get('window');

const AppButton = ({ onPress, title, style, titleStyle }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[{
      backgroundColor: 'white',
      alignItems: 'center',
      width: "35%",
      alignSelf: 'center',
      marginBottom: 10,
      maxHeight: 26,
      borderRadius: 20
    }, style]}
  >
    <Text style={[{ fontSize: 16, fontVariant: 'roboto', color: '#3CAF58', paddingVertical: '1%' }, titleStyle,]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default function App({ navigation }) {
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const m = true;
  // const markedList = ['2024-04-14', '2024-04-17'];
  // const notiList = ['2024-04-25', '2024-04-20'];
  const [markedList, setMarkedList] = useState([]);
  const [notiList, setNotiList] = useState([]);
  const [cur, setCur] = useState(false);
  const [isNoted, setIsNoted] = useState(false);
  const [notes, setNotes] = useState(["Loading..."]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getAllNotes = async () => {
      try {
        const user = await AsyncStorage.getItem("User");
        const userData = JSON.parse(user);
        setUser(userData);

        const res = await getAllNote(userData?.id);
        setNotes(JSON.parse(JSON.stringify(res.data)).map((item, _) => {
            return item.content;
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    getAllNotes();
  }, [isNoted, notes]);

  const weeks = React.useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('isoWeek');
    
    return [-1, 0, 1].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');
        
        let marked = false;
        let noti = false;
        for (let i in markedList){
          //date.toDate().toISOString().slice(0,10)
          if (!(markedList[i].getTime() < date.toDate().getTime()) && !(markedList[i].getTime() > date.toDate().getTime())) {
            marked = true;
          }
        }
        for (let i in notiList){
          if (!(notiList[i].getTime() < date.toDate().getTime()) && !(notiList[i].getTime() > date.toDate().getTime())) {
            noti = true;
          }
        }

        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
          isMarked: marked, 
          haveNoti: noti
        };
      });
    });
  }, [week, markedList, notiList]);

  // useEffect(() => 
  // {
  //   setCount(count + 1)
  // }, [value])

  return (
    <ScrollView style={{marginBottom: 65}}>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

          <View style={styles.picker}>
            <Swiper
              index={1}
              ref={swiper}
              loop={false}
              showsPagination={false}
              onIndexChanged={ind => {
                if (ind === 1) {
                  return;
                }
                else {
                  // const newIndex = ind - 1;
                  // const newWeek = week + newIndex;
                  // setWeek(newWeek);
                  // setValue(moment(value).add(newIndex, 'week').toDate());
                  swiper.current.scrollTo(1, false);
                  // setTimeout(() => {
                  //   const newIndex = ind - 1;
                  //   const newWeek = week + newIndex;
                  //   setWeek(newWeek);
                  //   setValue(moment(value).add(newIndex, 'week').toDate());
                  //   swiper.current.scrollTo(1, false);
                  // }, 100);
                }
              }}>
              {weeks.map((dates, index) => (
                <View
                  style={[styles.itemRow, { paddingHorizontal: 16 }]}
                  key={index}>
                  {dates.map((item, dateIndex) => {
                    var currDate = new Date(value.getFullYear(), value.getMonth(), value.getDate());
                    var eleDate = new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate());

                    const isActive = !(currDate.getTime() < eleDate.getTime()) && !(currDate.getTime() > eleDate.getTime());
                    return (
                      <TouchableWithoutFeedback
                        key={dateIndex}
                        onPress={() => {
                          setValue(item.date)
                          setCur(item)
                          }}>
                        <View
                          style={[
                            styles.item,
                            isActive && {
                              backgroundColor: '#9CDD9B',
                            },
                          ]}>
                          {item.isMarked && <Ionicons style={{marginBottom: 10}} size={13} name="ellipse"/>}
                          <Text
                            style={[
                              styles.itemWeekday,
                              isActive && { color: 'black' },
                            ]}>
                            {item.weekday}
                          </Text>
                          <Text
                            style={[
                              styles.itemDate,
                              isActive && { color: 'black' },
                            ]}>
                            {item.date.getDate()}
                          </Text>
                          {item.haveNoti && <Ionicons style={{marginTop: 10}} size={16} name="notifications"/>}
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </View>
              ))}
            </Swiper>
          </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#EFF9F1'}}>      
          <AppButton title={"Đánh dấu"} onPress={ 
            () => {
                const selectedDate = new Date(value.getFullYear(), value.getMonth(), value.getDate());
                setMarkedList(markedList => [...markedList, selectedDate]);

                // remove noti
                setNotiList(notiList.filter(item => {
                  return (item.getTime() < selectedDate.getTime()) || (item.getTime() > selectedDate.getTime());
                }));
          }}/>
          <AppButton title={"Hủy đánh dấu"} titleStyle={{ color: 'red'}} onPress={
            () => {
              const selectedDate = new Date(value.getFullYear(), value.getMonth(), value.getDate());
              setMarkedList(markedList.filter(item => {
                return (item.getTime() < selectedDate.getTime()) || (item.getTime() > selectedDate.getTime());
              }));
            }}/>
        </View>

        {/* <View>
            <Text>
              {JSON.stringify(value)}
            </Text>
        </View> */}

      <View style = {{ backgroundColor: '#EFF9F1', marginTop:'3%', marginHorizontal: '2%', borderRadius: 20 }}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center', justifyContent: 'space-around'}}>
          <Text style={{color: '#3CAF58', fontSize: 16, fontWeight: 'bold', borderBottomColor: '#3CAF58', borderBottomWidth: 1, paddingBottom: '2%'}}>Thời gian thu hoạch dự kiến</Text>
          <AppButton title={"Dự kiến thu hoạch"} style={{marginTop: '2%'}} />
        </View>
        <View>
          <Text style={{fontSize: 25, marginLeft: '10%', color: '#3CAF58', marginVertical: '2%'}}>
            31 tháng 12 năm 2024
          </Text>
        </View>
        <View style={{flexDirection:'row', justifyContent: 'flex-end'}}>
          <Text style={{marginTop:'1%', marginRight: '2%', color: '#3CAF58'}}>
            Đặt thông báo vào ngày này?
          </Text>
          <AppButton title={"Có"} style={{width:"10%", borderColor: '#3CAF58', borderWidth: 1, height: 26, marginRight: '2%'}}
            onPress={
              () => {
                const selectedDate = new Date(value.getFullYear(), value.getMonth(), value.getDate());
                setNotiList(notiList => [...notiList, selectedDate]);
                
                // remove marked
                setMarkedList(markedList.filter(item => {
                  return (item.getTime() < selectedDate.getTime()) || (item.getTime() > selectedDate.getTime());
                }));
              }
            }
          />
          <AppButton title={"Xóa"} style={{width:"15%", borderColor: 'red', borderWidth: 1, height: 26, marginRight: '2%'}} titleStyle={{color: 'red'}}
            onPress={
              () => {
                const selectedDate = new Date(value.getFullYear(), value.getMonth(), value.getDate());
                setNotiList(notiList.filter(item => {
                  return (item.getTime() < selectedDate.getTime()) || (item.getTime() > selectedDate.getTime());
                }));
              }
            }
          />
        </View>
      </View>

      <View style = {{ backgroundColor: '#EFF9F1', marginTop:'3%', marginHorizontal: '2%', borderRadius: 20  }}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center', justifyContent: 'space-around'}}>
          <Text style={{color: '#3CAF58', fontSize: 16, fontWeight: 'bold', borderBottomColor: '#3CAF58', borderBottomWidth: 1, paddingBottom: '2%'}}>Thông báo đã đặt</Text>
          <AppButton title={"Đặt thông báo"} style={{marginTop: '2%'}} onPress={() => {navigation.navigate("NotiAddition")}}/>
        </View>
        <View>
          <DataTable>
            <DataTable.Row>
                <DataTable.Title>
                  <View>
                    <Text style={{color: '#3CAF58'}}>Giờ</Text>
                  </View>
                </DataTable.Title>
                <DataTable.Title>
                  <View>
                    <Text style={{color: '#3CAF58'}}>Nội dung</Text>
                  </View>
                </DataTable.Title>
                <DataTable.Title>
                  <View>
                    <Text></Text>
                  </View>
                </DataTable.Title>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <Text style={{color: '#3CAF58'}}>15:00</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={{color: '#3CAF58'}}>Thăm vườn</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                  <AppButton title={"Xóa"} />
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
            <DataTable.Cell>
                <Text style={{color: '#3CAF58'}}>18:00</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={{color: '#3CAF58'}}>Tắt máy bơm</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <AppButton title={"Xóa"} />
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
      </View>

      <View style = {{ backgroundColor: '#EFF9F1', marginTop:'3%', paddingBottom: '1%', marginHorizontal: '2%', borderRadius: 20 }}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center', justifyContent: 'space-around'}}>
          <Text style={{color: '#3CAF58', fontSize: 16, fontWeight: 'bold', borderBottomColor: '#3CAF58', borderBottomWidth: 1, paddingBottom: '1%'}}>Ghi chú</Text>
          <AppButton title={"Thêm ghi chú"} style={{marginTop: '2%'}} onPress={() => {
              navigation.navigate("NoteAddition");
              setIsNoted(!isNoted);
          }}/>
          {/* { isNoted? 
            <Text> <Text onPress={() => {console.log("Edit Note")}}>Sửa  </Text>| 
            <Text onPress={() => {console.log("Delete Note")}}>  Xóa</Text> </Text> 
            : 
            <AppButton title={"Thêm ghi chú"} style={{marginTop: '2%'}} onPress={() => {
              navigation.navigate("NoteAddition");
              setIsNoted(!isNoted);
            }}/>  } */}
        </View>
        <View style={{marginTop: 5}}>
          <Text style={{color: '#3CAF58', fontSize: 16, marginHorizontal: '5%', marginLeft: "12%"}}>
            {notes[0]}
          </Text>
        </View>
        <AppButton title={"Xem tất cả"} 
          style={{width: '40%', paddingHorizontal: '2%', marginTop: "5%"}}
          onPress={() => { navigation.navigate("NoteList")}}/>
      </View>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 24,
      paddingTop: '20%'
    },
    header: {
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: '#1d1d1d',
      marginBottom: 12,
    },
    picker: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#EFF9F1',
      justifyContent: 'center',
      height: '20%',
    },
    subtitle: {
      fontSize: 17,
      fontWeight: '600',
      color: '#999999',
      marginBottom: 12,
    },
    footer: {
      marginTop: 'auto',
      paddingHorizontal: 16,
    },
    /** Item */
    item: {
      flex: 1,
      height: '100%',
      marginHorizontal: 4,
      paddingVertical: 6,
      paddingHorizontal: 4,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#e3e3e3',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#CAFFCF',
      elevation: 5,
    },
    itemRow: {
      width: width,
      height: '86%',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    itemWeekday: {
      fontSize: 13,
      fontWeight: '500',
      color: '#737373',
      marginBottom: 4,
    },
    itemDate: {
      fontSize: 15,
      fontWeight: '600',
      color: '#111',
    },
    /** Placeholder */
    placeholder: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      height: 400,
      marginTop: 0,
      padding: 0,
      backgroundColor: 'transparent',
    },
    placeholderInset: {
      borderWidth: 4,
      borderColor: '#e5e7eb',
      borderStyle: 'dashed',
      borderRadius: 9,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },
    /** Button */
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 1,
      backgroundColor: '#007aff',
      borderColor: '#007aff',
    },
    btnText: {
      fontSize: 18,
      lineHeight: 26,
      fontWeight: '600',
      color: '#fff',
    },
  });
  