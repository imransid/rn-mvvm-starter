import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "./authSlice";
import { RootState } from "../../app/store";

const Login: React.FC = () => {
    // -----------------------------
    // Local state
    // -----------------------------
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ msg: string }[]>([]);

    const dispatch = useDispatch();
    const { loading, error, access_token } = useSelector(
        (state: RootState) => state.auth
    );

    // -----------------------------
    // Reset errors when user types
    // -----------------------------
    useEffect(() => {
        setErrors([]);
    }, [email, password]);

    // -----------------------------
    // Watch for login success
    // -----------------------------
    useEffect(() => {
        if (access_token) {
            console.log("Login Success! Token:", access_token);
            Alert.alert("Success", "Login successful!");
            // TODO: Navigate to home screen
            // navigation.replace("Home");
        }
    }, [access_token]);

    // -----------------------------
    // Handle login submit
    // -----------------------------
    const handleSubmit = () => {
        console.log("Submitting Login:", { email, password });

        if (!email || !password) {
            setErrors([{ msg: "Please enter email and password" }]);
            return;
        }

        // Dispatch login request to Redux Saga
        dispatch(loginRequest({ email: email, password: password }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                {/* Header Text */}
                <Text style={styles.title}>Glad to see you again ✋🏻 MMK</Text>
                <Text style={styles.subtitle}>
                    Log in to access your saved preferences, continue where you stopped.
                </Text>

                {/* Input Fields */}
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                    />

                    {/* Error Messages */}
                    {errors.map((err, i) => (
                        <Text key={i} style={styles.errorText}>
                            {err.msg}
                        </Text>
                    ))}
                    {error && <Text style={styles.errorText}>{error}</Text>}

                    {/* Forgot Password */}
                    <TouchableOpacity onPress={() => Alert.alert("Forgot Password")}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleSubmit} // <-- fixed
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Continue</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;

// -----------------------------
// Styles
// -----------------------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F9F9",
    },
    innerContainer: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "600",
        marginBottom: 8,
        color: "#000",
    },
    subtitle: {
        fontSize: 14,
        color: "#414651",
        marginBottom: 40,
    },
    inputContainer: {
        marginBottom: 30,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 5,
    },
    forgotText: {
        color: "#FF0000CC",
        fontSize: 14,
        textAlign: "right",
    },
    button: {
        backgroundColor: "#1AA7A9",
        paddingVertical: 15,
        borderRadius: 35,
        alignItems: "center",
    },
    buttonDisabled: {
        backgroundColor: "#BCE6EA",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
});
