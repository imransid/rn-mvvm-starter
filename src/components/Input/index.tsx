import React, { useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    TextInputProps,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

type InputProps = {
    label?: string;
    inputvalue: string;
    setInput: (text: string) => void;
    ispassword?: boolean;
} & TextInputProps;

const Input: React.FC<InputProps> = ({
    label = "Enter value",
    inputvalue,
    setInput,
    ispassword = false,
    ...rest
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(true);

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    isFocused && { borderColor: "#1AA7A9", shadowOpacity: 0.15 },
                ]}
                placeholder={label}
                placeholderTextColor="#535862"
                secureTextEntry={ispassword && showPassword}
                value={inputvalue}
                onChangeText={setInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...rest}
            />

            {ispassword && (
                <TouchableOpacity
                    onPress={() => setShowPassword((prev) => !prev)}
                    style={styles.iconButton}
                    activeOpacity={0.7}
                >
                    <Feather
                        name={showPassword ? "eye-off" : "eye"}
                        size={22}
                        color="#979797"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    container: {
        position: "relative",
        marginBottom: 16,
    },
    input: {
        width: "100%",
        height: 56,
        backgroundColor: "#FFFFFF",
        color: "#000000",
        borderWidth: 1,
        borderColor: "#E9EAEB",
        borderRadius: 28,
        paddingVertical: 12,
        paddingHorizontal: 20,
        fontSize: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
    },
    iconButton: {
        position: "absolute",
        right: 20,
        top: 16,
    },
});
