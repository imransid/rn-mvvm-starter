/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import {
    ImageBackground,
    ScrollView,
    Text,
    View,
    StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons"; // ✅ Use RN CLI version
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Input";
import { CustomButton } from "./LoginScreen";
import Header from "../../components/Header";
// import { clearError, createUser } from "../../redux/slices/userSlices";
import { toasts } from "../../assets/lib";
import { RootState } from "../../app/store";
import Spinner from 'react-native-loading-spinner-overlay';
import { registerRequest } from "./authSlice";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState<null | string>(null);
    const [allErrors, setAllErrors] = useState<any>([]);
    const navigation = useNavigation();
    const dispatch = useDispatch<any>();

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
        try {
            if (!(email && password && confirmPassword && fullName)) {
                toasts("Please enter all required information");
                return;
            }

            if (confirmPassword !== password) {
                toasts("Password not match..");
                return;
            }


            dispatch(registerRequest({
                first_name: fullName,
                last_name: "",
                email: email,
                password: password,
                avatar_url: "string",
                onboarding_step: 3,
                gender: "undisclosed",
                birth_date: "1990-01-01T00:00:00Z",
                preferred_language: "fr",
                country: "France",
                role: "parent",
                navigation: navigation
            }));



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
            <ScrollView contentContainerStyle={styles.scroll}>
                <View>
                    <Text style={styles.title}>Let’s get Started</Text>
                    <Text style={styles.subtitle}>
                        Create your Zenfamy account today and start your calm 🌿 parenting
                        journey.
                    </Text>
                </View>


                <View style={styles.form}>
                    <Input
                        label="Full Name"
                        setInput={setFullName}
                        inputvalue={fullName}
                        ispassword={false}
                    />

                    <Input
                        label="Email address"
                        setInput={setEmail}
                        inputvalue={email}
                        ispassword={false}
                    />

                    <Input
                        label="Create Password"
                        setInput={setPassword}
                        inputvalue={password}
                        ispassword={true}
                    />

                    <Input
                        label="Confirm Password"
                        setInput={setConfirmPassword}
                        inputvalue={confirmPassword}
                        ispassword={true}
                    />

                    {passwordError && (
                        <Text style={styles.errorText}>{passwordError}</Text>
                    )}

                    {allErrors?.length > 0 &&
                        allErrors.map((error: any, i: number) => (
                            <View key={i} style={styles.errorRow}>
                                <Ionicons name="close-circle-outline" size={18} color="red" />
                                <Text style={styles.errorMessage}> {error.msg}</Text>
                            </View>
                        ))}
                </View>

                <View style={styles.submitWrapper}>
                    <CustomButton
                        onPress={handleSubmit}
                        disabled={!(email && password && confirmPassword && fullName) || loading}
                        text={loading ? "Please wait..." : "Next"}
                    />
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    By using this application, you agree to our{" "}
                    <Text style={styles.link}>Terms</Text> and{" "}
                    <Text style={styles.link}>Privacy Policy</Text>.
                </Text>
            </View>
        </ImageBackground>
    );
};

export default Signup;

// --------------------
// Styles
// --------------------
const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
    scroll: {
        flexGrow: 1,
        padding: 16,
    },
    title: {
        fontSize: 28,
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
    errorText: {
        fontSize: 12,
        color: "red",
        marginTop: 4,
    },
    errorRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    errorMessage: {
        fontSize: 14,
        color: "red",
    },
    submitWrapper: {
        marginTop: 48,
    },
    footer: {
        padding: 56,
    },
    footerText: {
        fontSize: 12,
        color: "#535862",
        textAlign: "center",
    },
    link: {
        color: "#007AFF",
    },
});
