import React, { useState } from "react";
import {
    ImageBackground,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Header from "../../components/Header/"; // Adjust path if needed
import Input from "../../components/Input/";
import Button from "../../components/Button";
import PopUpModal from "../../components/PopUpModal";
import { colors, toasts } from "../../assets/lib";
import { OtpInput } from "react-native-otp-entry";
interface Props {
    navigation: any;
}

const PasswordChangeScreen: React.FC<Props> = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => {
        setShowModal(false);
        navigation.navigate("AllSet"); // Replace with your screen name
    };

    const handleSubmit = () => {
        Keyboard.dismiss();


        if (!(confirmPassword && newPassword)) {
            return toasts("Please enter your new password");
        }

        if (confirmPassword !== newPassword) {
            return toasts("Passwords do not match.");
        }

        // ✅ Password strength validation
        const passwordRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|\\:;"'<>,.?/]).{6,}$/;

        if (!passwordRegex.test(newPassword)) {
            return toasts(
                "Password must be at least 6 characters long and include letters, numbers, and special characters like !$@%."
            );

        }
        // Add API call to update password here
        setShowModal(true);
    };

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            style={styles.bg}
            resizeMode="cover"
        >
            <Header title="Password Change" />
            <ScrollView contentContainerStyle={styles.container}>
                <View>
                    <Text style={styles.title}>Change Password</Text>
                    <Text style={styles.subtitle}>
                        Your password should be at least 6 characters long and include a
                        mix of letters, numbers, and special characters like !$@%.
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <Input
                        label="Current Password"
                        setInput={setCurrentPassword}
                        inputvalue={currentPassword}
                        ispassword={true}
                    />
                    <Input
                        label="New Password"
                        setInput={setNewPassword}
                        inputvalue={newPassword}
                        ispassword={true}
                    />
                    <Input
                        label="Retype Your Password"
                        setInput={setConfirmPassword}
                        inputvalue={confirmPassword}
                        ispassword={true}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    {!newPassword || !confirmPassword ? (
                        <Button
                            name="Continue"
                            textColor="#535862"
                            bgColor={colors.disabledButton}
                            onclick={() => toasts("Please enter your new password")}
                        />
                    ) : (
                        <Button
                            name="Continue"
                            textColor="#fff"
                            bgColor={colors.primaryButton}
                            onclick={handleSubmit}
                        />
                    )}
                </View>
            </ScrollView>

            {showModal && (
                <PopUpModal
                    controller={handleModalClose}
                    title="Password updated successfully!"
                    description="Your password has been updated"
                />
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
    container: {
        padding: 16,
        flexGrow: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: "600",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: "#6b7280",
        marginVertical: 8,
    },
    inputContainer: {
        marginTop: 32,
    },
    buttonContainer: {
        marginTop: 48,
    },
});

export default PasswordChangeScreen;
