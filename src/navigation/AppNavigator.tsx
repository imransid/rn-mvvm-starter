import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { getTokens } from "../utils/secureStorage";
import { restoreSession } from "../features/auth/authSlice";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    // on app mount, attempt to restore session from secure tokens
    useEffect(() => {
        (async () => {
            const tokens = await getTokens();
            if (tokens?.accessToken) {
                // optionally validate token: call /me to load profile
                try {
                    const { data } = await (await import("../api/api")).default.get("/me");
                    dispatch(restoreSession({ user: data }));
                } catch {
                    // token invalid -> try refresh or logout
                    dispatch(restoreSession({ user: null }));
                }
            } else {
                dispatch(restoreSession({ user: null }));
            }
        })();
    }, [dispatch]);

    return (
        <NavigationContainer>
            {isAuthenticated ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    );
}
