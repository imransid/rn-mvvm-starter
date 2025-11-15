import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useGetJournalsQuery } from '../../api/journalApi';
import { CustomButton } from "../auth/LoginScreen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Journal: React.FC = () => {
    const { data: journals, isLoading, isError } = useGetJournalsQuery();
    const navigation = useNavigation<NavigationProp>();

    // -----------------------------
    // Loading state
    // -----------------------------
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#008c96" />
                <Text style={{ marginTop: 10 }}>Loading journals...</Text>
            </View>
        );
    }

    // -----------------------------
    // Error state
    // -----------------------------
    if (isError) {
        return (
            <View style={styles.centered}>
                <Text style={{ color: 'red', fontSize: 16, textAlign: 'center' }}>
                    Failed to load journals. Please try again.
                </Text>
                <CustomButton
                    text="Retry"
                    onPress={() => {
                        // RTK Query automatically refetches if component re-renders
                        // Optionally, force refetch via useLazyQuery or invalidate cache
                    }}
                />
            </View>
        );
    }

    // -----------------------------
    // Normal state (journals loaded)
    // -----------------------------
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {journals && journals.length > 0 ? (
                journals.slice(0, 5).map((journal: any, index: number) => (
                    <TouchableOpacity key={index} style={styles.journalItem}>
                        <View style={styles.iconWrapper}>
                            <Ionicons name="book-outline" size={24} color="#008c96" />
                        </View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.comments}>{journal?.comments}</Text>
                            <Text style={styles.time}>{journal?.time || "No Time"}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            ) : (
                <View style={styles.emptyWrapper}>
                    <Image
                        source={require("../../assets/images/imoji/Group.png")}
                        resizeMode="contain"
                        style={styles.emptyImage}
                    />
                    <Text style={styles.emptyText}>No journals found!</Text>
                </View>
            )}

            <CustomButton
                text="+ Add Event"
                onPress={() => navigation.navigate("AddJournal" as any)}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
        flexGrow: 1,
    },
    journalItem: {
        flexDirection: "row",
        paddingBottom: 12,
        alignItems: "center",
    },
    iconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "rgba(26,167,169,0.35)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    textWrapper: {
        flex: 1,
        marginLeft: 12,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(217,217,217,0.49)",
        paddingBottom: 8,
    },
    comments: {
        fontSize: 16,
        fontWeight: "500",
    },
    time: {
        color: "#898989",
        fontSize: 14,
    },
    emptyWrapper: {
        alignItems: "center",
        marginVertical: 20,
    },
    emptyImage: {
        width: 100,
        height: 100,
        marginBottom: 12,
    },
    emptyText: {
        fontSize: 18,
        textAlign: "center",
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});

export default Journal;
