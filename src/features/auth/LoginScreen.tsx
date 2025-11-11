import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    Alert,
} from "react-native";

const Login: React.FC = () => {
    // -----------------------------
    // Local state
    // -----------------------------
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ msg: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // -----------------------------
    // Reset errors on input change
    // -----------------------------
    useEffect(() => {
        setErrors([]);
    }, [email, password]);

    // -----------------------------
    // Handle login
    // -----------------------------
    const handleSubmit = () => {
        if (!email || !password) {
            setErrors([{ msg: "Please enter email and password" }]);
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);

            // Dummy validation
            if (email === "test@example.com" && password === "123456") {
                Alert.alert("Success", "Login successful!");
                // Navigate to Home screen here
            } else {
                setErrors([{ msg: "Invalid email or password" }]);
            }
        }, 1500);
    };

    return (

        <View style={styles.innerContainer}>
            {/* Header Text */}
            <Text style={styles.title}>Glad to see you again ✋🏻</Text>
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

                {/* Error messages */}
                {errors.map((err, i) => (
                    <Text key={i} style={styles.errorText}>
                        {err.msg}
                    </Text>
                ))}

                {/* Forgot Password */}
                <TouchableOpacity onPress={() => Alert.alert("Forgot Password")}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? "Loading..." : "Continue"}
                </Text>
            </TouchableOpacity>
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
