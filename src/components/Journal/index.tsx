/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo } from "react";
import {
    SectionList,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import Button from "../Button";
import Header from "../Header";
import { colors } from "../../assets/lib";
// import { getMyJournal } from "@/redux/slices/journalSlice";

// ------------------------
// Type Definitions
// ------------------------
type Journal = {
    journal_id: number;
    family_id: number;
    child_id: number;
    event_date: string;
    category: string;
    description: string;
    emotions_child: string[];
    emotions_parent: string[];
    comments: string;
    tags: string[];
    cre_date: string;
    mod_date: string;
    del_date: string | null;
    last_mod_by: string;
};

// ------------------------
// Group Journal by Date
// ------------------------
const groupByDate = (data: Journal[]) => {
    const grouped: { [key: string]: Journal[] } = {};
    data.forEach((item) => {
        const date = new Date(item.event_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(item);
    });

    return Object.keys(grouped).map((date) => ({
        title: date,
        data: grouped[date],
    }));
};

// ------------------------
// PostCard Component
// ------------------------
const PostCard = ({ activity }: { activity: Journal }) => (
    <View style={styles.postCard}>
        <View style={styles.postCardHeader}>
            <View style={styles.postCardHeaderLeft}>
                <Text style={styles.emotionText}>
                    {activity.emotions_child[0] || ""}
                </Text>
                <Text style={styles.categoryText}>{activity.category}</Text>
                {activity.tags.slice(0, 1).map((tag) => (
                    <Text key={tag} style={styles.tagText}>
                        {tag}
                    </Text>
                ))}
            </View>

            <TouchableOpacity style={styles.arrowButton}>
                <MaterialIcons name="arrow-outward" size={20} color="#ffffff" />
            </TouchableOpacity>
        </View>

        <Text style={styles.descriptionText}>{activity.description}</Text>
    </View>
);

// ------------------------
// Main Journal Screen
// ------------------------
const JournalScreen = () => {
    const dispatch = useDispatch<any>();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    // const { loading, journals } = useSelector((state: any) => state.journals);
    const loading = false
    const journals: any = []
    const sections = useMemo(() => groupByDate(journals || []), [journals]);

    // Fetch journals on mount
    useEffect(() => {
        // dispatch(getMyJournal());
    }, [dispatch]);

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.container}
        >
            <Header
                title="Journal"
                rightImage={require("../../assets/images/imoji/animoji.png")}
            />

            <View style={styles.content}>
                {/* Top Buttons */}
                <View style={styles.topButtonsContainer}>
                    <View style={styles.filterButton}>
                        <Button
                            styles={{ fontSize: 12 }}
                            icon={<Ionicons name="filter-outline" size={20} color="#679698" />}
                            name="Filter"
                            textColor="#679698"
                            bgColor="#E6FBFB"
                        // onclick={() => alert("Filter pressed")}
                        />
                    </View>
                    <View style={styles.addButton}>
                        <Button
                            icon={<Ionicons name="add-outline" size={20} color="#fff" />}
                            name="Add Event"
                            onclick={() => navigation.navigate("JournalCreate")}
                            bgColor={colors.primaryButton}
                        />
                    </View>
                </View>

                {/* Loading Indicator */}
                {loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.primaryButton} />
                    </View>
                )}

                {/* Sectioned Journal List */}
                <SectionList
                    sections={sections}
                    keyExtractor={(item, index) => `${item.journal_id}-${index}`}
                    renderItem={({ item }) => <PostCard activity={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                    contentContainerStyle={{ paddingBottom: 80 }}
                    ListEmptyComponent={() => (
                        <View style={{ padding: 16 }}>
                            <Text style={{ textAlign: "center", color: "#A0A0A0" }}>
                                No journal entries yet.
                            </Text>
                        </View>
                    )}
                />
            </View>
        </ImageBackground>
    );
};

export default JournalScreen;

// ------------------------
// Styles
// ------------------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    topButtonsContainer: {
        marginTop: 8,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    filterButton: {
        width: "30%",
    },
    addButton: {
        width: "40%",
    },
    loadingContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginLeft: -18,
        marginTop: -18,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: "700",
        color: "#4B5563",
        marginBottom: 8,
        marginTop: 12,
        marginHorizontal: 16,
    },
    postCard: {
        backgroundColor: "#FFFFFF",
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 16,
    },
    postCardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    postCardHeaderLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    emotionText: {
        fontSize: 20,
        marginRight: 8,
    },
    categoryText: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 999,
        fontSize: 14,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        textAlign: "center",
        textTransform: "lowercase",
        marginRight: 4,
    },
    tagText: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 999,
        fontSize: 12,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        textAlign: "center",
        textTransform: "lowercase",
        marginRight: 4,
    },
    arrowButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#3B82F6",
        alignItems: "center",
        justifyContent: "center",
    },
    descriptionText: {
        color: "#4B5563",
        fontSize: 14,
        marginTop: 12,
    },
});
