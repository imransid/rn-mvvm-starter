/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from "react";
import {
    ImageBackground,
    SectionList,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useIsFocused, useNavigation } from "@react-navigation/native";

// import { listMyStories } from "../../redux/slices/storiesSlice";
import { avatar } from "../quiz/QuizzesScreen";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { colors } from "../../assets/lib";
import { RootState } from "../../app/store";
import { useGetMagicStoriesQuery } from "../../api/magicApi";

type Activity = {
    date: string;
    title: string;
    description: string;
    actions: string[];
    icon?: React.ReactNode;
    story_id: number;
};

const getButtonColor = (action: string) => {
    switch (action) {
        case "Play":
            return colors.primaryButton;
        case "View":
            return "#8dbfaa";
        case "Share":
            return colors.secondaryTextColor;
        default:
            return "gray";
    }
};

const getButtonIcon = (action: string) => {
    switch (action) {
        case "Play":
            return <Ionicons name="play-outline" size={20} color="#fff" />;
        case "View":
            return <Ionicons name="eye-outline" size={20} color="#fff" />;
        case "Share":
            return <Ionicons name="share-social-outline" size={20} color="#fff" />;
        default:
            return <Ionicons name="share-social-outline" size={20} color="#fff" />;
    }
};

const groupByDate = (data: Activity[]) => {
    const grouped: { [key: string]: Activity[] } = {};
    data.forEach((item) => {
        if (!grouped[item.date]) grouped[item.date] = [];
        grouped[item.date].push(item);
    });

    return Object.keys(grouped).map((date) => ({
        title: date,
        data: grouped[date],
    }));
};

const PostCard = ({ activity }: { activity: Activity }) => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.postCard}>
            <Text style={styles.title}>{activity.title}</Text>
            <Text style={styles.description}>{activity.description}</Text>

            <View style={styles.buttonRow}>
                {activity.actions.map((action, idx) => (
                    <TouchableOpacity
                        key={idx}
                        onPress={() => {
                            navigation.navigate("PlayStoryScreen", { story_id: activity.story_id })
                        }
                        }
                        style={[
                            styles.actionButton,
                            { backgroundColor: getButtonColor(action) },
                        ]}
                    >
                        {getButtonIcon(action)}
                        <Text style={styles.actionText}>{action}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const Index = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch<any>();


    const selectedChild = useSelector((state: RootState) => state.root.home.selectedChild);

    const isFocused = useIsFocused();

    const { data: stories, refetch, isLoading: loading, error } = useGetMagicStoriesQuery({
        skip: 0,
        limit: 10,
    });

    // 🔄 Refetch when screen becomes focused
    useEffect(() => {
        if (isFocused) {
            refetch();
        }
    }, [isFocused]);

    const sections = useMemo(() => {
        if (stories && stories.length > 0) {
            const activities: Activity[] = stories.map((story: any) => ({
                date: new Date(story.cre_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
                title: `A ${story.in_story_type} story for ${story.child_first_name}`,
                description: `A story about ${story.in_story_characters.join(
                    ", "
                )} with values of ${story.in_story_values.join(", ")}.`,
                actions: ["Play", "View", "Share"],
                story_id: story.story_id,
            }));
            return groupByDate(activities);
        }
        return [];
    }, [stories]);

    if (loading) {
        return (
            <ImageBackground
                source={require("../../assets/images/bg/greenshadow.png")}
                resizeMode="cover"
                style={styles.container}
            >
                <View style={styles.center}>
                    <Text>Loading stories...</Text>
                </View>
            </ImageBackground>
        );
    }

    if (error) {
        return (
            <ImageBackground
                source={require("../../assets/images/bg/greenshadow.png")}
                resizeMode="cover"
                style={styles.container}
            >
                <View style={styles.center}>
                    <Text>Error fetching stories</Text>
                </View>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.container}
        >
            <Header
                title="Stories"
                rightImage={
                    avatar?.filter(
                        (item: any) => item?.name === selectedChild?.avatar_url
                    )[0]?.image
                }
            />

            <View style={{ flex: 1 }}>
                <View style={styles.headerButton}>
                    <Button
                        icon={<Ionicons name="add-outline" size={20} color="#fff" />}
                        name="Generate New Story"
                        onclick={() => navigation.navigate("CreateStoryScreen" as never)}
                        bgColor={colors.primaryButton}
                    />
                </View>

                <SectionList
                    sections={sections}
                    keyExtractor={(item, index) => `${item.title}-${index}`}
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

const styles = StyleSheet.create({
    container: { flex: 1 },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    headerButton: { marginTop: 10, width: "60%", padding: 16 },
    sectionHeader: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555",
        marginVertical: 6,
        marginHorizontal: 16,
    },

    postCard: {
        backgroundColor: "#fff",
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 12,
        elevation: 2,
    },
    title: { fontSize: 18, fontWeight: "600" },
    description: { fontSize: 14, color: "gray", marginTop: 6 },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 30,
        height: 42,
        gap: 6,
    },
    actionText: { color: "#fff", fontWeight: "bold" },
});

export default Index;
