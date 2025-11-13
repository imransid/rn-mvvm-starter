import React, { useEffect, useState } from "react";
import {
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { CustomButton } from "./LoginScreen";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { toasts } from "../../assets/lib";
import { AuthStackParamList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { forgotPasswordRequest } from "./authSlice";

type VerifyScreenProp = NativeStackNavigationProp<AuthStackParamList, "Verify">;
type VerifyRouteProp = RouteProp<AuthStackParamList, "Verify">;

const Verify = () => {
    const [text, setText] = useState("");
    const navigation = useNavigation<VerifyScreenProp>();
    const route = useRoute<VerifyRouteProp>();
    const { email } = route.params;
    const [secondsLeft, setSecondsLeft] = useState(32 * 60);

    const dispatch = useDispatch<any>();

    // Countdown effect
    useEffect(() => {
        if (secondsLeft === 0) return;

        const timer = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer); // cleanup
    }, [secondsLeft]);

    // Format minutes:seconds
    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
    };




    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.bg}
        >
            <Header />
            <ScrollView contentContainerStyle={styles.container}>
                <View>
                    <Text style={styles.title}>Enter Verification Code</Text>
                    <Text style={styles.subtitle}>
                        We sent a verification code to {email}. Please check your mobile
                        device and enter the code.
                    </Text>
                </View>

                <View style={styles.otpWrapper}>
                    <OtpInput
                        numberOfDigits={6}
                        focusColor="green"
                        autoFocus={false}
                        hideStick={true}
                        placeholder=""
                        blurOnFilled={true}
                        disabled={false}
                        type="numeric"
                        secureTextEntry={false}
                        focusStickBlinkingDuration={500}
                        onTextChange={(text: string) => setText(text)}
                        textInputProps={{
                            accessibilityLabel: "One-Time Password",
                        }}
                        textProps={{
                            accessibilityRole: "text",
                            accessibilityLabel: "OTP digit",
                            allowFontScaling: false,
                        }}
                        theme={{
                            pinCodeContainerStyle: {
                                height: 60,
                                width: 60,
                                paddingTop: 3,
                                backgroundColor: "#fff",
                                elevation: 2,
                                borderWidth: 0,
                            },
                        }}
                    />

                    <TouchableOpacity
                        style={styles.timerWrapper}
                        onPress={() => navigation.navigate("ForgotPassword")}
                    >
                        <Text style={styles.timerText}>Your code will expire in - </Text>
                        <Text style={[styles.timerText, styles.timerBold]}>{formatTime(secondsLeft)} minutes</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonWrapper}>
                    <CustomButton
                        onPress={() => {
                            if (text.length !== 6)
                                return toasts("Please enter OTP code to continue");
                            navigation.navigate("ResetPassword", {
                                otp: text,
                                email: email
                            });
                        }}
                        text="Continue"
                        disabled={text.length !== 6}
                    />

                    <Button
                        name="Resend Code"
                        textColor="#b1b1b1"
                        bgColor="#fff"
                        onclick={() => {
                            let parm = {
                                email: email,
                                navigation: navigation
                            }

                            dispatch(forgotPasswordRequest(parm))
                        }}
                    />
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default Verify;

// -----------------
// Styles
// -----------------
const styles = StyleSheet.create({
    bg: { flex: 1 },
    container: { padding: 16, flexGrow: 1 },
    title: { fontSize: 28, fontWeight: "600" },
    subtitle: { fontSize: 14, color: "#535862", marginVertical: 8 },
    otpWrapper: { marginTop: 32, alignItems: "center" },
    timerWrapper: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
    timerText: { fontSize: 14, color: "#535862" },
    timerBold: { fontWeight: "600", marginLeft: 4 },
    buttonWrapper: { marginTop: 48, gap: 12 },
});
