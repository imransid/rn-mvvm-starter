import React, { useState } from "react";
import {
    ImageBackground,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
// import { createJournal } from "@/redux/slices/journalSlice";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { colors, toasts } from "../../assets/lib";
import Header from "../../components/Header";
import Button from "../../components/Button";
import PopUpModal from "../../components/PopUpModal";
import { RootState } from "../../app/store";
import api from "../../api/api";
import Spinner from "react-native-loading-spinner-overlay";

const StoryCreationScreen = () => {
    const dispatch = useDispatch<any>();
    const navigation = useNavigation<any>();

    const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<any>(null);
    const [showSuccesModal, setshowSuccesModal] = useState(false);
    const [description, setDescription] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const selectedChild = useSelector((state: RootState) => state.root.home.selectedChild);
    const token = useSelector((state: RootState) => state.root.auth.access_token)

    const controller = (data?: boolean) => {
        setshowSuccesModal(false);

        if (data) {
            navigation.navigate("journals");
        } else {
            setSelectedTopic(null)
            setSelectedEmotion(null)
            setSelectedDate(null)
            // navigation.navigate("AddJournal");
        }

    };

    const handleSave = async () => {
        try {
            // --- Validations ---
            if (!selectedDate) {
                toasts("Please select a date before continuing.");
                return;
            }

            if (!selectedChild?.child_id) {
                toasts("No child selected. Please choose a child to continue.");
                return;
            }

            if (!selectedTopic) {
                toasts("Please choose a topic before saving.");
                return;
            }

            if (!selectedEmotion) {
                toasts("Please select how your child felt.");
                return;
            }

            if (!description.trim()) {
                toasts("Please write something about what happened.");
                return;
            }

            const journalData = {
                child_id: selectedChild.child_id,
                event_date: selectedDate.toISOString(),
                category: selectedTopic,
                description,
                emotions_child: [selectedEmotion],
                emotions_parent: ["string"],
                comments: description,
                tags: [selectedTopic],
            };

            console.log("Journal Payload:", journalData);
            setLoading(true);

            // --- API CALL ---
            const response = await api.post("/journals/me", journalData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            console.log("API Response:", response.data);

            // --- Success Handling ---
            if (response?.data) {
                setLoading(false);
                setshowSuccesModal(true);
            } else {
                throw new Error("Unexpected server response!");
            }

        } catch (error: any) {
            setLoading(false);

            console.log("Journal Error:", error?.response?.data || error.message);

            // --- Friendly Error Toasts ---
            if (error?.response?.status === 400) {
                toasts("Invalid request. Please check your inputs.");
            } else if (error?.response?.status === 401) {
                toasts("Session expired. Please log in again.");
            } else if (error?.response?.status === 500) {
                toasts("Server error. Please try again later.");
            } else {
                toasts("Something went wrong. Please try again.");
            }
        }
    };


    const topics = [
        { name: "School" },
        { name: "SOCIAL" },
        { name: "Bedtime" },
        { name: "Homework" },
        { name: "Conflict" },
        { name: "Friends" },
        { name: "Anger" },
        { name: "Anxiety" },
        { name: "Play" },
        { name: "Screen Time" },
        { name: "Physical Activity" },
        { name: "Special Event" },
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

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleDateConfirm = (date: Date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.bg}
        >
            <Header
                title="New Journal Entry"
                rightImage={require("../../assets/images/imoji/animoji.png")}
            />


            <Spinner
                visible={loading}
                // textContent="Loading..."
                textStyle={{ color: "#fff" }}
            />

            <ScrollView style={styles.container}>
                {/* Date */}
                <View style={styles.block}>
                    <Text style={styles.title}>When did this happen?</Text>

                    <TouchableOpacity style={styles.dateBox} onPress={showDatePicker}>
                        <Ionicons name="calendar-outline" size={20} color="#5c5c5c" />
                        <Text style={styles.dateText}>
                            {selectedDate
                                ? selectedDate.toLocaleDateString()
                                : "Select date"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Emotions */}
                <View style={styles.block}>
                    <Text style={styles.title}>How is Emily feeling today?</Text>

                    <View style={styles.emotionWrap}>
                        {emotions.map((emotion, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.emotionItem}
                                onPress={() => {

                                    if (emotion.label !== null) {
                                        setSelectedEmotion(emotion.label)
                                    }

                                }


                                }
                            >
                                <View
                                    style={[
                                        styles.emotionCircle,
                                        selectedEmotion === emotion.label && styles.selectedEmotion,
                                    ]}
                                >
                                    <Text style={styles.emoji}>{emotion.icon}</Text>
                                </View>

                                <Text style={styles.emotionLabel}>{emotion.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Topics */}
                <View style={styles.block}>
                    <Text style={styles.title}>What was this about?</Text>

                    <View style={styles.topicWrap}>
                        {topics.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedTopic(item.name)}
                                style={[
                                    styles.topicBtn,
                                    selectedTopic === item.name && styles.topicSelected,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.topicText,
                                        selectedTopic === item.name && styles.topicTextSelected,
                                    ]}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Description */}
                <View style={styles.block}>
                    <Text style={styles.title}>Tell me what happened...</Text>

                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Write your thoughts here..."
                        multiline
                        style={styles.textArea}
                    />
                </View>

                {/* Personalized Tip */}
                <View style={styles.tipBox}>
                    <Text style={styles.title}>
                        Would you like a personalized tip for this situation?
                    </Text>

                    <View style={styles.rowBetween}>
                        <View style={styles.half}>
                            <Button
                                icon={
                                    <Ionicons name="add-outline" size={20} color="#679698" />
                                }
                                name="No, Thanks"
                                textColor="#679698"
                                bgColor="#E6FBFB"
                                onclick={() => navigation.navigate("Create")}
                            />
                        </View>

                        <View style={styles.half}>
                            <Button
                                icon={<Ionicons name="add-outline" size={20} color="#fff" />}
                                name="Yes, Help me"
                                bgColor={colors.primaryButton}
                            />
                        </View>
                    </View>
                </View>

                {/* Save Button */}
                <Button
                    name="Save Journal Entry"
                    bgColor={colors.primaryButton}
                    onclick={handleSave}
                />

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Date Picker */}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
                display={Platform.OS === "ios" ? "spinner" : "default"}
            />

            {
                showSuccesModal && (
                    <PopUpModal
                        controller={controller}
                        title="Journal Added Successfully"
                        description="Thanks for sharing. Keep writing — I’m here with you."
                        image={require("../../assets/images/login/done.png")}
                        button1={
                            <Button
                                name="Add Another"
                                icon={<Ionicons name="add-outline" size={20} color="#fff" />}
                                onclick={() => controller(false)}
                                textColor="#fff"
                                bgColor={colors.secondaryTextColor}
                            />
                        }
                        button2={
                            <Button
                                name="View Entry"
                                onclick={() => controller(true)}
                                textColor="#fff"
                                bgColor={colors.primaryButton}
                            />
                        }
                    />
                )
            }
        </ImageBackground >
    );
};

export default StoryCreationScreen;

const styles = StyleSheet.create({
    bg: { flex: 1 },
    container: { padding: 16 },
    block: { marginBottom: 20 },
    title: { fontSize: 18, fontWeight: "600", marginBottom: 8 },

    dateBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 16,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#D1D1D6",
    },
    dateText: { marginLeft: 8, color: "#1a1a1a" },

    emotionWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    emotionItem: {
        width: "25%",
        alignItems: "center",
        marginBottom: 12,
    },

    emotionCircle: {
        width: 68,
        height: 68,
        backgroundColor: "#FDFDFD",
        borderRadius: 999,
        justifyContent: "center",
        alignItems: "center",
    },
    selectedEmotion: {
        borderWidth: 2,
        borderColor: "#00b3ad",
    },

    emoji: { fontSize: 36 },
    emotionLabel: { marginTop: 4, fontSize: 13, textAlign: "center" },

    topicWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    topicBtn: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#d4d4d4",
        backgroundColor: "white",
        marginRight: 8,
        marginBottom: 10,
    },

    topicSelected: {
        backgroundColor: "#85b17625",
        borderColor: "#adcda3",
    },

    topicText: { fontSize: 14, color: "#333" },
    topicTextSelected: { color: "#4c7d4c" },

    textArea: {
        backgroundColor: "white",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#d4d4d4",
        padding: 12,
        minHeight: 100,
        textAlignVertical: "top",
    },

    tipBox: {
        borderWidth: 1,
        borderColor: "#d4d4d4",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },

    half: { width: "48%" },
});
