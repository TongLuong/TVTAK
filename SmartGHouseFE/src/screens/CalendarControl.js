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
        <Stack.Screen name = "NoteList" component={NoteList} />
        <Stack.Screen name = "NoteAddition" component={NoteAddition} />
        <Stack.Screen name = "NotiAddition" component={NotiAddition} />
    </Stack.Navigator>
  )
}

export default function CalendarControl() {
    return (
            <CalendarStack />
    )
}