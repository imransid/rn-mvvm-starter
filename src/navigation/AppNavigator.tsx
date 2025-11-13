import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { clearTokens } from "../utils/secureStorage";
import { setForceStopLoader } from "../features/auth/authSlice";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const isAuthenticated = useSelector((state: RootState) => state.root.auth.isAuthenticated);
    const loading = useSelector((state: RootState) => state.root.auth.loading);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        const handleAuthState = async () => {
            if (loading) {
                dispatch(setForceStopLoader());
            }
            if (!isAuthenticated) {
                await clearTokens();
            }
        };

        handleAuthState();
    }, [loading, isAuthenticated, dispatch]);

    return (
        <NavigationContainer>
            {isAuthenticated ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    );
}
