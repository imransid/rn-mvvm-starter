import React from "react";
import {
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
} from "react-native";
import AppleLogin from "./AppleLogin";
import EmailLogin from "./EmailLogin";
import FacebookLogin from "./FacebookLogin";
import GoogleLogin from "./GoogleLogin";
import { CustomButton } from "./LoginScreen";
import { useNavigation } from "@react-navigation/native";

const Index = () => {
    const navigation = useNavigation<any>();

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>
                        Welcome to {"\n"}
                        ZenFamy
                    </Text>
                    <Text style={styles.subtitle}>
                        Parenting isn’t easy. We're here to help you understand and support
                        your child with calm, clarity, and confidence.
                    </Text>
                </View>

                <View style={styles.authButtons}>
                    <AppleLogin />
                    <GoogleLogin />
                    <FacebookLogin />
                    <EmailLogin />
                </View>

                <View style={styles.orSection}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>Or</Text>
                    <View style={styles.line} />
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                    style={styles.signupRow}
                >
                    <Text style={styles.signupText}>
                        Don’t have an account?{" "}
                        <Text style={styles.signupHighlight}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>

                <View style={styles.loginButton}>
                    <CustomButton
                        text="Login"
                        onPress={() => navigation.navigate("Login")}
                    />
                </View>
            </View>
        </ImageBackground>
    );
};

export default Index;

// -------------------------
// AuthButton (Reused Component)
// -------------------------
export const AuthButton = ({
    disabled = false,
    onPress,
    text,
}: {
    disabled?: boolean;
    onPress: () => void;
    text: any;
}) => {
    return (
        <View style={styles.authButtonWrapper}>
            <View
                style={[
                    styles.authButtonShadow,
                    { backgroundColor: disabled ? "#98BFC3" : "#D1DEE0" },
                ]}
            />
            <TouchableOpacity
                style={[
                    styles.authButton,
                    { backgroundColor: disabled ? "#BCE6EA" : "#fff" },
                ]}
                onPress={onPress}
                activeOpacity={0.8}
            >
                <View style={styles.authButtonInner}>{text}</View>
            </TouchableOpacity>
        </View>
    );
};

// -------------------------
// Styles
// -------------------------
const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },
    title: {
        fontSize: 38,
        textAlign: "center",
        fontWeight: "600",
        lineHeight: 44,
    },
    subtitle: {
        fontSize: 14,
        textAlign: "center",
        color: "#414651",
        marginVertical: 16,
    },
    authButtons: {
        width: "100%",
        marginVertical: 32,
        gap: 10,
    },
    orSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginVertical: 8,
    },
    line: {
        width: "45%",
        height: 1,
        backgroundColor: "#E9EAEB",
    },
    orText: {
        color: "#000",
    },
    signupRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 24,
    },
    signupText: {
        color: "#111",
        textAlign: "center",
    },
    signupHighlight: {
        color: "#2D9CDB",
        fontWeight: "600",
    },
    loginButton: {
        flexDirection: "row",
        justifyContent: "center",
    },
    authButtonWrapper: {
        width: "100%",
        maxWidth: 400,
        position: "relative",
    },
    authButtonShadow: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 58,
        borderRadius: 35,
    },
    authButton: {
        height: 58,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 60,
        borderRadius: 35,
        width: "100%",
        position: "relative",
        top: -4,
    },
    authButtonInner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
    },
});
