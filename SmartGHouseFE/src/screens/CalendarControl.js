import { NavigationContainer } from '@react-navigation/native';
import CalendarScreen from './Calendar/CalendarScreen';
import NoteList from './Calendar/NoteList';
import NoteAddition from './Calendar/NoteAddition';
import NotiAddition from './Calendar/NotiAddition';
import NotiList from './Calendar/NotiList';
import { createStackNavigator } from '@react-navigation/stack';
import { Title } from 'react-native-paper';

const Stack = createStackNavigator();

function CalendarStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name = "CalendarScreen" component={CalendarScreen} options={{ headerShown: false }}/>
        <Stack.Screen name = "NoteList" component={NoteList} options = {{ title: "Danh sách ghi chú" }}/>
        <Stack.Screen name = "NoteAddition" component={NoteAddition} options = {{ title: "Thêm ghi chú" }} />
        <Stack.Screen name = "NotiAddition" component={NotiAddition} options = {{ title: "Đặt thông báo" }} />
        <Stack.Screen name = "NotiList" component={NotiList} options = {{ title: "Danh sách thông báo" }} />
    </Stack.Navigator>
  )
}

export default function CalendarControl() {
    return (
            <CalendarStack />
    )
}