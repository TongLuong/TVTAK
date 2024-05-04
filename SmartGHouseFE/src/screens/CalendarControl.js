import { NavigationContainer } from '@react-navigation/native';
import CalendarScreen from './Calendar/CalendarScreen';
import NoteList from './Calendar/NoteList';
import NoteAddition from './Calendar/NoteAddition';
import NotiAddition from './Calendar/NotiAddition';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function CalendarStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name = "CalendarScreen" component={CalendarScreen} options={{ headerShown: false }}/>
        <Stack.Screen name = "NoteList" component={NoteList} options={{ headerTitle: "Danh sách các ghi chú"}}/>
        <Stack.Screen name = "NoteAddition" component={NoteAddition} options={{ headerTitle: "Ghi chú"}}/>
        <Stack.Screen name = "NotiAddition" component={NotiAddition} options={{ headerTitle: "Thêm thông báo"}}/>
    </Stack.Navigator>
  )
}

export default function CalendarControl() {
    return (
            <CalendarStack />
    )
}