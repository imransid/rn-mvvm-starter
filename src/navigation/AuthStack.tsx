import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../features/auth/LoginScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // disables header for all screens
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
}
