import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../features/auth/LoginScreen';
import OnBoard from "../features/onboarding";
import WelcomeAuth from "../features/auth/WelcomeScreen";
import RegisterScreen from "../features/auth/RegistrationScreen";
import ForgotPassword from '../features/auth/ForgotPassword';
import EmptyScreen from "../components/EmptyScreen"
import Verify from '../features/auth/VerifyScreen';
import ResetPassword from "../features/auth/ResetPasswordScreen"
import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // disables header for all screens
            }}
        >
            <Stack.Screen name="OnBoard" component={OnBoard} />
            <Stack.Screen name="WelcomeAuth" component={WelcomeAuth} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Verify" component={Verify} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="EmptyScreen" component={EmptyScreen} />


        </Stack.Navigator>
    );
}
