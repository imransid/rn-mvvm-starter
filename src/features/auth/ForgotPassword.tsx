import React, { useEffect, useState } from "react";
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import Input from "../../components/Input";
import Header from "../../components/Header";
import { CustomButton } from "./LoginScreen";
import { toasts } from "../../assets/lib";
import Spinner from "react-native-loading-spinner-overlay";
import { RootState } from "../../app/store";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { forgotPasswordRequest } from "./authSlice";

// -----------------------------
// Define Stack Param List
// -----------------------------
export type AuthStackParamList = {
    ForgotPassword: undefined;
    Verify: { email: string };
    ResetPassword: undefined;
};

type ForgotPasswordScreenProp = NativeStackNavigationProp<
    AuthStackParamList,
    "ForgotPassword"
>;

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [allErrors, setAllErrors] = useState<any>([]);
    const dispatch = useDispatch<any>();
    const navigation = useNavigation<ForgotPasswordScreenProp>();

    // Loading from Redux state
    const _loading = useSelector((state: RootState) => state.root.auth.loading);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (typeof _loading === "boolean") {
            setLoading(_loading);
        } else {
            setLoading(false);
        }
    }, [_loading]);

    const handleSubmit = async () => {
        if (!email) {
            toasts("Please enter your email address");
            return;
        }

        try {

            let parm = {
                email: email,
                navigation: navigation
            }

            dispatch(forgotPasswordRequest(parm))

        } catch (error: any) {
            setAllErrors(
                typeof error?.detail === "string"
                    ? [{ msg: error?.detail }]
                    : error?.detail
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
            <Spinner
                visible={loading}
                textContent="Loading..."
                textStyle={{ color: "#fff" }}
            />
            <ScrollView contentContainerStyle={styles.container}>
                <View>
                    <Text style={styles.title}>Forgot Password?</Text>
                    <Text style={styles.subtitle}>
                        It happens with everyone! Please provide your email to reset your
                        password.
                    </Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Enter your email address"
                        setInput={setEmail}
                        inputvalue={email}
                        ispassword={false}
                    />

                    {allErrors.length > 0 &&
                        allErrors.map((error: any, i: number) => (
                            <View key={i} style={styles.errorRow}>
                                <Ionicons name="close-circle-outline" size={18} color="red" />
                                <Text style={styles.errorMessage}> {error.msg}</Text>
                            </View>
                        ))}
                </View>

                <View style={styles.buttonWrapper}>
                    <CustomButton
                        text={loading ? "Please wait..." : "Continue"}
                        disabled={!email || loading}
                        onPress={handleSubmit}
                    />
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default ForgotPassword;

// -----------------
// Styles
// -----------------
const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
    container: {
        padding: 16,
        flexGrow: 1,
    },
    title: {
        fontSize: 29,
        fontWeight: "600",
    },
    subtitle: {
        fontSize: 14,
        color: "#535862",
        marginVertical: 8,
    },
    form: {
        marginTop: 32,
    },
    errorRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    errorMessage: {
        fontSize: 14,
        color: "red",
        marginLeft: 4,
    },
    buttonWrapper: {
        marginTop: 32,
    },
});
