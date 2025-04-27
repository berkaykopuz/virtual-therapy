
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminLogin from "../screens/AdminLogin";

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
      <Stack.Navigator initialRouteName='AdminLogin'>
        <Stack.Screen name ='AdminLogin' component={AdminLogin} options={{headerShown: false}}/>
      </Stack.Navigator>
  );
}
