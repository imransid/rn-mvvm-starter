/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Input from "../../components/Input";
// import { clearError, getUsers, loginUser } from "@/redux/slices/userSlices";
// import { toasts } from "@/assets/lib";
import Header from "../../components/Header";
import { loginRequest } from "./authSlice";
import { RootState } from "../../app/store";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [allErrors, setAllErrors] = useState<any>([]);

    const loading = useSelector((state: RootState) => state.root.auth.loading);

    const dispatch = useDispatch<any>();
    const navigation = useNavigation();

    useEffect(() => {
        // dispatch(clearError());
        setAllErrors([]);
    }, [email, password]);

    const handleSubmit = async () => {
        try {
            if (!email || !password) {
                setAllErrors([{ msg: "Please enter email and password" }]);
                return;
            }

            // Dispatch login request to Redux Saga
            dispatch(loginRequest({ email: email, password: password }));
        } catch (error: any) {
            setAllErrors(
                typeof error?.detail === "string" ? [{ msg: error?.detail }] : error?.detail
            );
        }
    };

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.bg}
        >
            <Header />
            <View style={styles.container}>
                {/* Title */}
                <View style={{ marginTop: 40, marginBottom: 20 }}>
                    <Text style={styles.title}>Glad to see you again ✋🏻</Text>
                    <Text style={styles.subtitle}>
                        Log in to access your saved preferences, continue where you stopped.
                    </Text>
                </View>

                {/* Inputs */}
                <View style={{ marginVertical: 20 }}>
                    <Input
                        label="Enter your email address"
                        inputvalue={email}
                        setInput={setEmail}
                        ispassword={false}
                    />
                    <Input
                        label="Enter your password"
                        inputvalue={password}
                        setInput={setPassword}
                        ispassword={true}
                    />

                    {/* Display Errors */}
                    {allErrors?.length > 0 &&
                        allErrors.map((err: any, i: number) => (
                            <View key={i} style={styles.errorRow}>
                                <Ionicons name="close-circle-outline" size={18} color="red" />
                                <Text style={styles.errorText}>{err.msg}</Text>
                            </View>
                        ))}

                    <TouchableOpacity
                        onPress={() => navigation.navigate("ForgotPassword" as never)}
                        style={styles.forgotPasswordWrapper}
                    >
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                {/* Button */}
                <View style={{ marginTop: 48 }}>
                    <CustomButton
                        disabled={!(email && password)}
                        text={loading ? "Loading..." : "Continue"}
                        onPress={() => {
                            if (!(email && password)) {
                                // toasts("Please enter email and password");
                                return;
                            }
                            if (!loading) handleSubmit();
                        }}
                    />
                </View>
            </View>
        </ImageBackground>
    );
};

export default Login;

export const CustomButton = ({
    disabled = false,
    onPress,
    text,
}: {
    disabled?: boolean;
    onPress: () => void;
    text: any;
}) => {
    return (
        <View style={{ width: "100%", maxWidth: 400, position: "relative" }}>
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 55,
                    backgroundColor: disabled ? "#98BFC3" : "#118283",
                    borderRadius: 35,
                }}
            />
            <TouchableOpacity
                style={{
                    backgroundColor: disabled ? "#BCE6EA" : "#1AA7A9",
                    paddingVertical: 15,
                    paddingHorizontal: 60,
                    borderRadius: 35,
                    width: "100%",
                    alignItems: "center",
                    position: "relative",
                    top: -4,
                }}
                onPress={onPress}
                activeOpacity={0.8}
            >
                <Text
                    style={{
                        color: disabled ? "#535862" : "#fff",
                        fontSize: 16,
                        fontWeight: "500",
                        letterSpacing: 0.3,
                    }}
                >
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bg: { flex: 1 },
    container: { flex: 1, padding: 16 },
    title: { fontSize: 29, fontWeight: "600", color: "#000", marginBottom: 8 },
    subtitle: { fontSize: 14, color: "#414651", marginTop: 4 },
    errorRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
    errorText: { fontSize: 14, color: "red", marginLeft: 4 },
    forgotPasswordWrapper: { alignItems: "flex-end", marginTop: 8 },
    forgotPasswordText: { fontSize: 14, color: "#FF0000CC" },
});
