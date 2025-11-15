import React, { memo, useEffect, useState } from "react";
import {
    FlatList,
    Modal,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions,
} from "react-native";

interface CountryModalProps {
    setvalue: any;
    selectedvalue: any;
    setshowmodal: any
    showmodal: boolean;
    datatype?: "language" | "country";
    setlanguageCode?: (code: string) => void;
}

interface CountryItem {
    name: string;
    emoji: string;
    code?: string;
}

const CountryModal: React.FC<CountryModalProps> = ({
    setvalue,
    selectedvalue,
    setshowmodal,
    showmodal,
    datatype = "language",
    setlanguageCode,
}) => {
    const [countries, setcountries] = useState<CountryItem[]>([]);

    useEffect(() => {
        fetch(
            "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json"
        )
            .then((response) => response.json())
            .then((json) => setcountries(json))
            .catch((err) => console.log("Error fetching countries:", err));
    }, []);

    const handleSelect = (item: CountryItem) => {
        setvalue(item.name);
        if (setlanguageCode && item.code) setlanguageCode(item.code);
    };

    const handleContinue = () => {
        setshowmodal(false);
    };

    return (
        <Modal visible={showmodal} transparent animationType="slide" statusBarTranslucent>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>
                        {datatype === "language" ? "Select Language" : "Select Country"}
                    </Text>

                    <FlatList
                        data={countries}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => handleSelect(item)}
                            >
                                <View style={styles.flagCircle}>
                                    <Text style={styles.flagEmoji}>{item.emoji}</Text>
                                </View>
                                <Text style={styles.itemText}>{item.name}</Text>
                                <View style={styles.checkContainer}>
                                    {selectedvalue === item.name ? (
                                        <Text style={styles.checkMark}>✔</Text>
                                    ) : null}
                                </View>
                            </TouchableOpacity>
                        )}
                    />

                    <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
                        <Text style={styles.continueText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default memo(CountryModal);

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    modalContainer: {
        height: height * 0.85,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#333",
        textAlign: "center",
        marginBottom: 16,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
    },
    flagCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        backgroundColor: "#fff",
    },
    flagEmoji: {
        fontSize: 20,
    },
    itemText: {
        flex: 1,
        fontSize: 16,
        color: "#333",
        fontWeight: "500",
    },
    checkContainer: {
        width: 24,
        alignItems: "center",
    },
    checkMark: {
        fontSize: 18,
        color: "#053b29", // Dark green like your original design
    },
    continueBtn: {
        backgroundColor: "#0055FF", // estonBlue
        borderRadius: 30,
        paddingVertical: 14,
        marginTop: 16,
        alignItems: "center",
    },
    continueText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});
