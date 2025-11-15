import React, { useEffect } from "react";
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { useRoute } from "@react-navigation/native";
import { useGetMagicStoryByIdQuery } from "../../api/magicApi";
// import { retrieveMyStory } from "../../redux/slices/storiesSlice";

interface Props {
    route: {
        params: {
            story_id: string;
        };
    };
    navigation: any;
}

const PlayStoryScreen = () => {
    const route = useRoute();
    const { story_id } = route.params as any;

    console.log('story_id', story_id)

    const { data: currentStory, error, isLoading: loading } = useGetMagicStoryByIdQuery(story_id);


    if (loading) {
        return (
            <ImageBackground
                source={require("../../assets/images/bg/greenshadow.png")}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.center}>
                    <Text>Loading story...</Text>
                </View>
            </ImageBackground>
        );
    }

    if (error) {
        return (
            <ImageBackground
                source={require("../../assets/images/bg/greenshadow.png")}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.center}>
                    <Text>Error fetching story</Text>
                </View>
            </ImageBackground>
        );
    }

    if (!currentStory) {
        return (
            <ImageBackground
                source={require("../../assets/images/bg/greenshadow.png")}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.center}>
                    <Text>No story found.</Text>
                </View>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.background}
        >
            <Header title="Story" />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Notification Header */}
                <View style={styles.notificationContainer}>
                    <Image
                        source={require("../../assets/images/login/notifi.png")}
                        style={styles.notificationImage}
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.notificationTitle}>Your story is ready!</Text>
                        <Text style={styles.notificationSubtitle}>
                            {"Let's enjoy this adventure together."}
                        </Text>
                    </View>
                </View>

                {/* Story Content */}
                <View style={styles.storyContainer}>
                    <View style={{ marginBottom: 16 }}>
                        <Text style={styles.storyTitle}>{`A ${currentStory.in_story_type} story for ${currentStory.child_first_name}`}</Text>
                        <Text style={styles.storyMeta}>
                            5 min read • Generated on{" "}
                            {new Date(currentStory.cre_date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </Text>
                    </View>
                    <Text style={styles.storyBody}>
                        {currentStory.out_story_body ||
                            "This story is still being written..."}
                    </Text>
                </View>

                {/* Interactive Options */}
                <View style={styles.row}>
                    <TouchableOpacity style={styles.optionButton}>
                        <Ionicons name="volume-high-outline" size={24} color="black" />
                        <Text style={styles.optionText}>Read Aloud</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton}>
                        <Ionicons name="download" size={24} color="black" />
                        <Text style={styles.optionText}>Download PDF</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.optionButton}>
                        <Ionicons name="checkmark-sharp" size={24} color="black" />
                        <Text style={styles.optionText}>Mark as Read</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton}>
                        <Ionicons name="trash-outline" size={24} color="black" />
                        <Text style={styles.optionText}>Delete</Text>
                    </TouchableOpacity>
                </View>

                {/* Rating */}
                <Text style={styles.ratingTitle}>Rate this story</Text>
                <View style={styles.ratingRow}>
                    <Ionicons name="star" size={24} color="gold" />
                    <Ionicons name="star" size={24} color="gold" />
                    <Ionicons name="star" size={24} color="gold" />
                    <Ionicons name="star" size={24} color="gold" />
                    <Ionicons name="star" size={24} color="gold" />
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    scrollContainer: {
        padding: 16,
    },
    notificationContainer: {
        backgroundColor: "#D8B4FE",
        padding: 8,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        gap: 8,
    },
    notificationImage: {
        width: 60,
        height: 60,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    notificationSubtitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    storyContainer: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    storyTitle: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 4,
    },
    storyMeta: {
        fontSize: 16,
        fontWeight: "600",
        color: "#3b3b3b",
    },
    storyBody: {
        fontSize: 16,
        color: "#4B5563",
        lineHeight: 23,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    optionButton: {
        flex: 0.48,
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 12,
        alignItems: "center",
    },
    optionText: {
        fontWeight: "600",
        marginTop: 8,
        color: "black",
    },
    ratingTitle: {
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
        marginVertical: 16,
    },
    ratingRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 12,
        marginBottom: 16,
    },
});

export default PlayStoryScreen;
