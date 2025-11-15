import React, { useEffect, useMemo } from "react";
import {
    View,
    Text,
    SectionList,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import { getMyJournal } from "@/redux/slices/journalSlice";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useGetJournalsQuery } from "../../api/journalApi";

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

// Group activities by date
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

const PostCard = ({ activity }: { activity: Journal }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <View style={styles.emotionsContainer}>
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
                <MaterialIcons name="arrow-outward" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
        <Text style={styles.descriptionText}>{activity.description}</Text>
    </View>
);

const JournalScreen = () => {
    const { data: journals, isLoading, isError } = useGetJournalsQuery();

    const sections = useMemo(() => groupByDate(journals || []), [journals]);
    const dispatch = useDispatch<any>();
    const navigation = useNavigation<any>();



    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            style={styles.background}
            resizeMode="cover"
        >
            <Header
                title="Journal"
                rightImage={require("../../assets/images/imoji/animoji.png")}
            />

            <View style={{ flex: 1 }}>
                {/* Header Buttons */}
                <View style={styles.buttonRow}>
                    <Button
                        styles={{ fontSize: 12 }}
                        icon={<Ionicons name="add-outline" size={20} color="#679698" />}
                        name="Filter"
                        textColor="#679698"
                        bgColor="#E6FBFB"
                    />
                    <Button
                        icon={<Ionicons name="add-outline" size={20} color="#fff" />}
                        name="Add Event"
                        onclick={() => navigation.navigate("AddJournal")}
                        bgColor="#679698"
                    />
                </View>

                {/* Sectioned Activity List */}
                <SectionList
                    sections={sections}
                    keyExtractor={(item, index) => `${item.journal_id}-${index}`}
                    renderItem={({ item }) => <PostCard activity={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                    contentContainerStyle={{ paddingBottom: 80 }}
                />
            </View>
        </ImageBackground>
    );
};

export default JournalScreen;

const styles = StyleSheet.create({
    background: { flex: 1 },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        paddingHorizontal: 140,
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 16,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    emotionsContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
    emotionText: { fontSize: 20 },
    categoryText: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        fontSize: 14,
        textTransform: "lowercase",
    },
    tagText: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        fontSize: 12,
        textTransform: "lowercase",
    },
    arrowButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#679698",
        justifyContent: "center",
        alignItems: "center",
    },
    descriptionText: { color: "#4B5563", fontSize: 14, marginTop: 12 },
    sectionHeader: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#374151",
        marginVertical: 8,
        marginHorizontal: 16,
    },
});
