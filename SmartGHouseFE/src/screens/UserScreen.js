import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen'
import SignupScreen from './SignUpScreen'
import AuthopScreen from './AuthOptionScreen'
import AccountScreen from './AccountScreen'

const Stack = createStackNavigator();

export default function App() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Authop" component={AuthopScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
      </Stack.Navigator>
    );
  }
  
  
