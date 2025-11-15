import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface SwitchProps {
    value: boolean;
    setvalue: (val: boolean | ((prev: boolean) => boolean)) => void;
}

const Switch: React.FC<SwitchProps> = ({ value, setvalue }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setvalue((prev) => !prev)}
            style={[
                styles.container,
                value ? styles.containerActive : styles.containerInactive,
            ]}
        >
            <View style={[styles.circle, value ? styles.circleRight : styles.circleLeft]} />
        </TouchableOpacity>
    );
};

export default Switch;

const styles = StyleSheet.create({
    container: {
        width: 56,
        height: 30,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#ccc",
        justifyContent: "flex-start",
        padding: 1,
    },
    containerActive: {
        backgroundColor: "#0055FF", // estonBlue
        justifyContent: "flex-end",
    },
    containerInactive: {
        backgroundColor: "#ccc", // gray
        justifyContent: "flex-start",
    },
    circle: {
        width: 23,
        height: 23,
        borderRadius: 23 / 2,
        backgroundColor: "#fff",
    },
    circleLeft: {
        alignSelf: "flex-start",
    },
    circleRight: {
        alignSelf: "flex-end",
    },
});
