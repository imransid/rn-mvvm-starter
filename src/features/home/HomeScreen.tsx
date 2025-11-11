import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../features/auth/authSlice";
// import { RootState } from "../app/store";

const HomeScreen: React.FC = () => {
    const dispatch = useDispatch();
    // const user = useSelector((state: RootState) => state.auth.user);

    // const handleLogout = () => {
    //     dispatch(logout());
    // };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.welcomeText}>
                Welcome, {user?.name || "User"}!
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity> */}
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 30,
        color: "#1AA7A9",
    },
    button: {
        backgroundColor: "#1AA7A9",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
});
