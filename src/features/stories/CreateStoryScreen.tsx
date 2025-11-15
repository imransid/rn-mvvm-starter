/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
    Image,
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Ionicons from "react-native-vector-icons/Ionicons";

import { colors, toasts } from "../../assets/lib";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";

// import { getMyChild } from "../../redux/slices/childSlice";
// import { createMyStory } from "../../redux/slices/storiesSlice";
import { avatar } from "../../features/quiz/QuizzesScreen";
import BottomSheet from "./BottomScreen";
import { RootState } from "../../app/store";
import { useCreateStoryMutation } from "../../api/magicApi";
import Spinner from "react-native-loading-spinner-overlay";

const StoryCreationScreen = () => {
    const navigation = useNavigation<any>();
    const selectedChild = useSelector((state: RootState) => state.root.home.selectedChild);

    const [createStory, { isLoading, data, error }] = useCreateStoryMutation();

    // ---- STATES ----
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [storyTheme, setStoryTheme] = useState<any>([]);
    const [interestSelected, setinterestSelected] = useState<any>([]);
    const [lifeLessons, setlifeLessons] = useState<any>([]);
    const [secondaryCharacter, setSecondaryCharacter] = useState("");

    const [showThemeModal, setshowThemeModal] = useState(false);
    const [showInterestModal, setshowInterestModal] = useState(false);
    const [showLessonModal, setshowLessonModal] = useState(false);

    // ---- STATIC DATA ----
    const theme = [
        { name: "Adventure", icon: require("../../assets/images/stories/pokemon.png") },
        { name: "Humorous", icon: require("../../assets/images/stories/stars.png") },
        { name: "Poetic", icon: require("../../assets/images/stories/crown.png") },
        { name: "Fantasy", icon: require("../../assets/images/stories/sword.png") },
        {
            name: "Educational",
            icon: require("../../assets/images/stories/paint-board.png"),
        },
        { name: "Emotional", icon: require("../../assets/images/stories/game.png") },
        {
            name: "Mystery",
            icon: require("../../assets/images/stories/natural-food.png"),
        },
        { name: "Realistic", icon: require("../../assets/images/stories/rocket.png") },
    ];

    const lessons = [
        { name: "Courage", icon: require("../../assets/images/stories/pokemon.png") },
        { name: "Friendship", icon: require("../../assets/images/stories/stars.png") },
        { name: "Respect", icon: require("../../assets/images/stories/crown.png") },
        { name: "Generosity", icon: require("../../assets/images/stories/sword.png") },
        {
            name: "Perseverance",
            icon: require("../../assets/images/stories/paint-board.png"),
        },
        { name: "Empathy", icon: require("../../assets/images/stories/game.png") },
        {
            name: "Creativity",
            icon: require("../../assets/images/stories/natural-food.png"),
        },
        { name: "Patience", icon: require("../../assets/images/stories/rocket.png") },
        {
            name: "Responsibility",
            icon: require("../../assets/images/stories/rocket.png"),
        },
    ];

    const interests = [
        { name: "Animals", icon: require("../../assets/images/stories/pokemon.png") },
        { name: "Magic", icon: require("../../assets/images/stories/stars.png") },
        { name: "Princesses", icon: require("../../assets/images/stories/crown.png") },
        { name: "Knights", icon: require("../../assets/images/stories/sword.png") },
        {
            name: "Dinosaurs",
            icon: require("../../assets/images/stories/paint-board.png"),
        },
        { name: "Robots", icon: require("../../assets/images/stories/game.png") },
        {
            name: "Forest",
            icon: require("../../assets/images/stories/natural-food.png"),
        },
        { name: "Space", icon: require("../../assets/images/stories/rocket.png") },
        { name: "Ocean", icon: require("../../assets/images/stories/beach.png") },
        { name: "Sports", icon: require("../../assets/images/stories/baseball.png") },
        {
            name: "Friendship",
            icon: require("../../assets/images/stories/favourite.png"),
        },
        { name: "School", icon: require("../../assets/images/stories/school.png") },
        { name: "Family", icon: require("../../assets/images/stories/user-group.png") },
        {
            name: "Nature",
            icon: require("../../assets/images/stories/natural-food.png"),
        },
        {
            name: "Adventure",
            icon: require("../../assets/images/stories/adventure.png"),
        },
    ];

    const emotions = [
        { label: "Happy", icon: "😀" },
        { label: "Excited", icon: "😵" },
        { label: "Sad", icon: "😔" },
        { label: "Angry", icon: "😡" },
        { label: "Scared", icon: "😨" },
        { label: "Tired", icon: "😴" },
        { label: "Anxious", icon: "😁" },
        { label: "Loved", icon: "😍" },
        { label: "Proud", icon: "🥲" },
        { label: "Disappointed", icon: "🫤" },
        { label: "Surprised", icon: "😲" },
        { label: "Calm", icon: "🙂‍↔️" },
    ];

    // ---- HELPERS ----
    const getTheRightIcon = (name: any) => theme.find((t) => t.name === name)?.icon;
    const getTheRightIconInterest = (name: any) =>
        interests.find((t) => t.name === name)?.icon;



    const handleCreateStory = async () => {
        // CHILD VALIDATION
        if (!selectedChild?.child_id) {
            toasts("Please select a child before creating a story", "error");
            return;
        }

        // EMOTION VALIDATION
        if (!selectedEmotion) {
            toasts("Please select an emotion", "error");
            return;
        }

        // THEME VALIDATION
        if (!storyTheme || storyTheme.length < 1) {
            toasts("Please select a story theme", "error");
            return;
        }

        // LIFE LESSONS VALIDATION (optional, can skip if not selected)
        const validLifeLessons = lifeLessons?.filter((lesson: any) => lesson) || [];

        // SECONDARY CHARACTER (optional)
        const characters = secondaryCharacter ? [secondaryCharacter] : [];

        const storyData = {
            child_id: selectedChild.child_id,
            in_emotions: [selectedEmotion], // guaranteed string
            in_story_type: storyTheme[0] as string,
            in_story_values: validLifeLessons as string[],
            in_story_characters: characters,
        };

        try {
            const response = await createStory(storyData).unwrap();
            console.log("response", response);
            toasts("Story created successfully!", "success");
            navigation.navigate("PlayStoryScreen", {
                story_id: response.story_id,
            });


        } catch (err) {
            console.error(err);
            toasts("Failed to create story", "error");
        }
    };



    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <Header
                title=""
                rightImage={
                    avatar?.filter((item: any) => item?.name === selectedChild?.avatar_url)[0]
                        ?.image
                }
            />

            <Spinner
                visible={isLoading}
                // textContent="Loading..."
                textStyle={{ color: "#fff" }}
            />

            <ScrollView style={styles.container}>
                {/* HEADER */}
                <Text style={styles.headerTitle}>Let's Choose the Adventure!</Text>
                <Text style={styles.headerSubtitle}>
                    Pick the elements for your magical story.
                </Text>

                {/* EMOTIONS */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>How is Emily feeling today?</Text>

                    <View style={styles.wrapRow}>
                        {emotions.map((emotion: any, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedEmotion(emotion.label)}
                                style={styles.emotionWrapper}
                            >
                                <View
                                    style={[
                                        styles.emotionCircle,
                                        selectedEmotion === emotion.label && styles.emotionSelected,
                                    ]}
                                >
                                    <Text style={styles.emoji}>{emotion.icon}</Text>
                                </View>
                                <Text style={styles.emotionLabel}>{emotion.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* THEME SELECT */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Choose a theme for your story</Text>

                    <TouchableOpacity
                        onPress={() => setshowThemeModal(true)}
                        style={styles.selectBox}
                    >
                        {storyTheme.length < 1 ? (
                            <Text style={styles.placeholderText}>
                                Select a theme for your story
                            </Text>
                        ) : (
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={styles.horizontalScroll}
                            >
                                {storyTheme?.map((theme: any, index: any) => (
                                    <View key={index} style={styles.selectedTag}>
                                        <Image source={getTheRightIcon(theme)} style={styles.tagIcon} />
                                        <Text style={styles.tagLabel}>{theme}</Text>
                                    </View>
                                ))}
                            </ScrollView>
                        )}

                        <Ionicons name="chevron-down-outline" size={20} color="#999" />
                    </TouchableOpacity>
                </View>

                {/* INTERESTS */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        What interests Saria's right now?
                    </Text>

                    <TouchableOpacity
                        onPress={() => setshowInterestModal(true)}
                        style={styles.selectBox}
                    >
                        {interestSelected.length < 1 ? (
                            <Text style={styles.placeholderText}>Select interests</Text>
                        ) : (
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={styles.horizontalScroll}
                            >
                                {interestSelected.map((theme: any, index: any) => (
                                    <View key={index} style={styles.selectedTag}>
                                        <Image
                                            source={getTheRightIconInterest(theme)}
                                            style={styles.tagIcon}
                                        />
                                        <Text style={styles.tagLabel}>{theme}</Text>
                                    </View>
                                ))}
                            </ScrollView>
                        )}

                        <Ionicons name="chevron-down-outline" size={20} color="#999" />
                    </TouchableOpacity>
                </View>

                {/* LIFE LESSON */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Add a Special Lesson</Text>

                    <TouchableOpacity
                        onPress={() => setshowLessonModal(true)}
                        style={styles.selectBox}
                    >
                        {lifeLessons.length < 1 ? (
                            <Text style={styles.placeholderText}>Choose a life lesson</Text>
                        ) : (
                            <ScrollView horizontal style={styles.horizontalScroll}>
                                {lifeLessons.map((item: any, index: any) => (
                                    <View key={index} style={styles.selectedTag}>
                                        <Text style={styles.tagLabel}>{item}</Text>
                                    </View>
                                ))}
                            </ScrollView>
                        )}

                        <Ionicons name="chevron-down-outline" size={20} color="#999" />
                    </TouchableOpacity>
                </View>

                {/* SECONDARY CHARACTER */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Add a Secondary Character</Text>
                    <Text style={styles.secondarySubtitle}>
                        Would you like to include someone in the story?
                    </Text>

                    <Input
                        label="e.g., Uncle Sam, Teddy, best friend..."
                        setInput={setSecondaryCharacter}
                        inputvalue={secondaryCharacter}
                        ispassword={false}
                    />
                </View>

                {/* NEXT BUTTON */}
                <Button
                    name="Next"
                    bgColor={colors.primaryButton}
                    onclick={handleCreateStory}
                />

                <View style={{ height: 100 }} />

                {/* BOTTOM SHEETS */}
                {/* THEME */}
                <BottomSheet
                    setValue={setStoryTheme}   // allow BottomSheet to manage array
                    selectedValue={storyTheme}
                    setShowModal={setshowThemeModal}
                    showModal={showThemeModal}
                    data={theme}
                    icon={true}                // show icons for theme
                />

                {/* INTERESTS */}
                <BottomSheet
                    setValue={setinterestSelected}
                    selectedValue={interestSelected}
                    setShowModal={setshowInterestModal}
                    showModal={showInterestModal}
                    data={interests}
                    icon={true}                // show icons for interests
                />

                {/* LIFE LESSONS */}
                <BottomSheet
                    setValue={setlifeLessons}
                    selectedValue={lifeLessons}
                    setShowModal={setshowLessonModal}
                    showModal={showLessonModal}
                    data={lessons}
                    icon={true}                // optional, if you want icons
                />
            </ScrollView>
        </ImageBackground>
    );
};

export default StoryCreationScreen;

//----------------------//
//       STYLES         //
//----------------------//

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 4,
    },
    headerSubtitle: {
        color: "#555",
        marginBottom: 16,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
    },
    wrapRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    emotionWrapper: {
        width: "24%",
        alignItems: "center",
        marginBottom: 12,
    },
    emotionCircle: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    emotionSelected: {
        borderWidth: 2,
        borderColor: "#00b3ad",
    },
    emoji: {
        fontSize: 38,
    },
    emotionLabel: {
        marginTop: 4,
        fontSize: 12,
        textAlign: "center",
    },
    selectBox: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 50,
        marginTop: 6,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    placeholderText: {
        color: "#777",
    },
    horizontalScroll: {
        maxWidth: 160,
    },
    selectedTag: {
        flexDirection: "row",
        paddingHorizontal: 12,
        height: 46,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#adcda3",
        backgroundColor: "#85b1763b",
        alignItems: "center",
        marginRight: 8,
    },
    tagIcon: {
        width: 20,
        height: 20,
        marginRight: 6,
    },
    tagLabel: {
        color: "#444",
    },
    secondarySubtitle: {
        color: "#666",
        marginBottom: 8,
    },
});
