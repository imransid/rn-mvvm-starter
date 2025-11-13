import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Input from "../../components/Input";
import PopUpModal from "../../components/PopUpModal";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { CustomButton } from "./LoginScreen";
import Header from "../../components/Header";
import { toasts } from "../../assets/lib";
import Spinner from "react-native-loading-spinner-overlay";
import { RootState } from "../../app/store";
import { resetPassword } from "../../api/resetPassword"
import { AuthStackParamList } from "../../navigation/types";

type VerifyRouteProp = RouteProp<AuthStackParamList, "ResetPassword">;

const ResetPassword = () => {
    const route = useRoute<VerifyRouteProp>();
    const { email, otp } = route.params;
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [passwordError, setPasswordError] = useState<null | string>(null);

    const navigation = useNavigation<any>();
    const reduxLoading = useSelector(
        (state: RootState) => state.root.auth.loading
    );
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(!!reduxLoading);
    }, [reduxLoading]);

    const handleSubmit = async () => {
        if (!(confirmPassword && password)) {
            return toasts("Please enter your new password");
        }

        if (confirmPassword !== password) {
            return toasts("Passwords do not match.");
        }

        // ✅ Password strength validation
        const passwordRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|\\:;"'<>,.?/]).{6,}$/;

        if (!passwordRegex.test(password)) {
            return toasts(
                "Password must be at least 6 characters long and include letters, numbers, and special characters like !$@%."
            );
        }

        if (passwordError) return;

        try {
            setLoading(true);


            const otp_code = otp;

            const response = await resetPassword(email, otp_code, password);

            toasts("Password reset successful!", "success");
            setShowModal(true);

            console.log("✅ API Response:", response);
        } catch (error: any) {
            console.error("❌ Reset Password Error:", error);
            toasts(error.message || "Failed to reset password");
        } finally {
            setLoading(false);
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
                // textContent="Loading..."
                textStyle={{ color: "#fff" }}
            />

            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Reset Password</Text>
                    <Text style={styles.subtitle}>
                        Your password should be at least 6 characters long and include a mix
                        of letters, numbers, and special characters like !$@%.
                    </Text>
                </View>

                <View style={styles.inputWrapper}>
                    <Input
                        label="New password"
                        setInput={setConfirmPassword}
                        inputvalue={confirmPassword}
                        ispassword={true}
                    />
                    <Input
                        label="Retype your password"
                        setInput={setPassword}
                        inputvalue={password}
                        ispassword={true}
                    />
                    {passwordError && (
                        <Text style={styles.errorText}>{passwordError}</Text>
                    )}
                </View>

                <View style={styles.buttonWrapper}>
                    <CustomButton
                        onPress={handleSubmit}
                        text="Continue"
                        disabled={!(confirmPassword && password)}
                    />
                </View>
            </View>

            {showModal && (
                <PopUpModal
                    title="Password updated successfully!"
                    description="Your password has been created"
                    controller={() => {
                        setShowModal(false)
                        navigation.navigate('EmptyScreen', {
                            nav: 'Login'
                        })
                    }}
                />
            )}
        </ImageBackground>
    );
};

export default ResetPassword;

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
    container: {
        flex: 1,
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
    inputWrapper: {
        marginTop: 32,
    },
    errorText: {
        fontSize: 14,
        color: "red",
        marginTop: 4,
    },
    buttonWrapper: {
        marginTop: 48,
    },
});
