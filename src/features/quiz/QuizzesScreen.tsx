import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    ImageBackground,
    Modal,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { colors, toasts } from "../../assets/lib";
import Button from "../../components/Button";
// import { getQuestions, getQuizzes, startQuiz } from "@/redux/slices/quizSlice";
// import { avatar } from "../profile/childrens";
import Header from "./CustomHeader";
import { useGetQuizzesQuery } from "../../api/quizApi";
import { RootState } from "../../app/store";
import { BlurView } from "@react-native-community/blur";
import PopUpModal from "../../components/PopUpModal";
import axios from "axios";


import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { nextQuestion, setQuestions, setSession } from "./quizSlice";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const avatar = [
    { name: "avatar1", image: require("../../assets/images/imoji/animoji.png") },
    { name: "avatar2", image: require("../../assets/images/imoji/animoji(1).png") },
    { name: "avatar3", image: require("../../assets/images/imoji/animoji(2).png") },
    { name: "avatar4", image: require("../../assets/images/imoji/animoji(3).png") },
    { name: "avatar5", image: require("../../assets/images/imoji/animoji(4).png") },
    { name: "avatar6", image: require("../../assets/images/imoji/animoji(5).png") },
    { name: "avatar7", image: require("../../assets/images/imoji/animoji(6).png") },
    { name: "avatar8", image: require("../../assets/images/imoji/animoji(7).png") },
];


const QuizzesScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [showCatDropdown, setshowCatDropdown] = useState(false);
    const [showModal, setshowModal] = useState(false);
    const [selectFilterAge, setselectFilterAge] = useState<any>();
    const [selectedcats, setselectedcats] = useState("All Questionaries");
    const [showBackModal, setShowBackModal] = useState(false);
    const allcats = [
        "All Questionaries",
        "Understanding Strengths",
        "Recognizing Feelings",
        "Problem Solving Skills",
        "Emotional Reactions",
        "Sibling Relationships",
        "Conflict Resolution",
        "Focus and Attention",
        "Motivation and Goals",
    ];

    const dispatch = useDispatch<any>();
    const token = useSelector((state: RootState) => state.root.auth.access_token)
    const selectedChild = useSelector((state: RootState) => state.root.home.selectedChild)
    const loading = false

    useEffect(() => {
        if (!selectedChild) {
            setShowBackModal(true); // show modal
            return;
        }
    }, [selectedChild])

    const handleStartQuiz = async (item: any) => {


        if (item.quiz_id === undefined) {
            toasts("Quiz ID is undefined. Cannot start quiz");
            return
        }


        const payload = {
            child_id: selectedChild?.child_id,
            family_id: selectedChild?.family_id,
            id: item.quiz_id,
        };

        let url = `https://api.zenfamy.ai/api/v1/quizzes/${payload.id}/start`


        const response = await axios.post(
            url,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );



        if (response.data) {
            // get question

            const nextQuestionResponse = await axios.get(
                `https://api.zenfamy.ai/api/v1/quizzes/sessions/${response.data.session_id}/next-question`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            dispatch(setSession(response.data))
            dispatch(setQuestions(nextQuestionResponse.data))

            navigation.navigate("SurveyQuestion", {
                session: response.data,
            });
        }

        // Continue if child is selected
        // navigation.navigate("QuizScreen" as never);


    }

    const handleGoBack = () => {
        setShowBackModal(false);
        navigation.goBack();
    };



    const { data: allQuizzes, isLoading, error } = useGetQuizzesQuery({
        language_code: "fr",
        limit: 10,
        offset: 0,
    });


    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>Error loading quizzes</Text>;



    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={{ flex: 1 }}
        >


            {showBackModal && (
                <BlurView
                    style={{
                        ...styles.blurContainer,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    }}
                    blurType="dark"
                    blurAmount={4}
                    reducedTransparencyFallbackColor="black"
                >
                    <PopUpModal
                        image={require("../../assets/images/home/logout.png")}
                        title="No Child Selected"
                        description="Please select a child before starting the quiz."
                        style={{ backgroundColor: "transparent" }}
                        button1={
                            <Button
                                onclick={handleGoBack}
                                name="Go Back"
                                textColor="#ffffff"
                                bgColor={colors.secondaryTextColor}
                                loading={false}
                            />
                        }
                    />
                </BlurView>
            )}

            <Header
                title=""
                home={true}
                rightImage={
                    avatar?.filter((item: any) => item?.name === selectedChild?.avatar_url)[0]?.image
                }
            />

            <View style={styles.container}>
                {/* Title + Description */}
                <View style={styles.header}>
                    <Text style={styles.title}>Explore with Quizzes</Text>
                    <Text style={styles.subtitle}>
                        Take these short quizzes to learn more about your child’s development,
                        family dynamics, and get personalized tips.
                    </Text>
                </View>

                {/* Filters */}
                <View style={styles.filterRow}>
                    <TouchableOpacity
                        onPress={() => setshowCatDropdown(!showCatDropdown)}
                        style={[
                            styles.categoryBtn,
                            { backgroundColor: colors.secondaryTextColor },
                            showCatDropdown ? styles.catOpen : styles.catClosed,
                        ]}
                    >
                        <Text style={styles.categoryText}>{selectedcats}</Text>
                        <Ionicons name="chevron-down" size={20} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setshowModal(true)}
                        style={styles.filterBtn}
                    >
                        <Ionicons name="filter" size={20} color="#858585" />
                        <Text style={styles.filterText}>Filter</Text>
                    </TouchableOpacity>

                    {showCatDropdown && (
                        <View style={styles.dropdownBox}>
                            {allcats.map((quiz, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setselectedcats(quiz);
                                        setshowCatDropdown(false);
                                    }}
                                    style={styles.dropdownItem}
                                >
                                    <Text>{quiz}</Text>
                                    <Ionicons
                                        name={selectedcats === quiz ? "checkmark-circle" : "checkmark-circle-outline"}
                                        size={22}
                                        color={selectedcats === quiz ? colors.primaryButton : "#ccc"}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Quiz List */}
                {loading && <ActivityIndicator color="#9f9" />}

                <FlatList
                    data={allQuizzes}
                    keyExtractor={(item) => item.quiz_id}
                    renderItem={({ item: quiz }) => (
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.quizType}>{quiz.quiz_type}</Text>
                            </View>

                            <Text style={styles.quizName}>{quiz.name}</Text>
                            <Text style={styles.quizDesc}>{quiz.description}</Text>

                            <Text style={styles.baseText}>
                                Based on your child's interests and values
                            </Text>

                            <View style={styles.timeRow}>
                                <Ionicons name="time-outline" size={22} color={colors.primaryButton} />
                                <Text style={styles.timeText}> 30 mins</Text>
                            </View>

                            {quiz.status === "Completed" ? (
                                <View style={styles.completedBtn}>
                                    <Ionicons name="checkmark" size={20} color="#fff" />
                                    <Text style={styles.completedText}>Completed</Text>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => handleStartQuiz(quiz)}
                                    style={styles.startBtn}
                                >
                                    <Text style={styles.startText}>Start Quiz</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                />

                {/* Filter Modal */}
                <Modal animationType="fade" transparent visible={showModal}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalBox}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Filter Categories</Text>
                                <TouchableOpacity
                                    onPress={() => setselectFilterAge("")}
                                >
                                    <Ionicons name="reload-outline" size={26} color="black" />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.modalLabel}>Select your age range:</Text>

                            <View style={styles.rowWrap}>
                                <TouchableOpacity style={styles.modalTag}>
                                    <Text>All</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.modalTag}>
                                    <Text>Completed</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.modalLabel}>Select Age:</Text>

                            <View style={styles.ageGrid}>
                                {["0-3", "3-6", "6-12", "12-18"].map((age, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => setselectFilterAge(age)}
                                        style={[
                                            styles.ageBox,
                                            { backgroundColor: selectFilterAge === age ? "#E9F6E5" : "#fff" },
                                        ]}
                                    >
                                        <Text style={styles.ageNumber}>{age}</Text>
                                        <Text style={styles.ageText}>Years</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Button
                                name="Search Result"
                                onclick={() => setshowModal(false)}
                                bgColor={colors.primaryButton}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </ImageBackground>
    );
};

export default QuizzesScreen;

/* ----------------------------------------------------- */
/*                     STYLESHEET                        */
/* ----------------------------------------------------- */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },

    header: { marginBottom: 16 },
    title: { fontSize: 32, fontWeight: "bold" },
    subtitle: { fontSize: 14, color: "#666", marginTop: 8 },

    filterRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
        alignItems: "center",
    },

    categoryBtn: {
        flexDirection: "row",
        width: "70%",
        paddingVertical: 14,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        borderRadius: 30,
        alignItems: "center",
    },

    catOpen: { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    catClosed: { borderRadius: 100 },

    categoryText: { color: "#fff", fontSize: 14 },

    filterBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 30,
    },

    filterText: { fontSize: 14, color: "#858585" },

    dropdownBox: {
        position: "absolute",
        top: 55,
        left: 0,
        width: "70%",
        backgroundColor: "#fff",
        padding: 14,
        borderWidth: 1,
        borderColor: "#ddd",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        zIndex: 50,
    },

    dropdownItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#eee",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    card: {
        backgroundColor: "#fff",
        marginBottom: 16,
        padding: 16,
        borderRadius: 14,
        elevation: 1,
    },

    cardHeader: {
        flexDirection: "row",
        marginBottom: 12,
    },

    quizType: {
        color: "#666",
        borderColor: "#ddd",
        borderWidth: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },

    quizName: { fontSize: 22, fontWeight: "600", marginBottom: 6 },
    quizDesc: { color: "#666", marginBottom: 6 },

    baseText: { color: "#666", marginBottom: 14 },

    timeRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
    timeText: { color: "#666", fontSize: 16 },

    completedBtn: {
        backgroundColor: "#8dbfaa",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 20,
        width: "45%",
        borderRadius: 30,
        justifyContent: "center",
    },

    completedText: { color: "#fff", fontWeight: "600", marginLeft: 6 },

    startBtn: {
        backgroundColor: colors.primaryButton,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignItems: "center",
    },

    startText: { color: "#fff", fontWeight: "600" },

    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },

    modalBox: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
    },

    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 12,
    },

    modalTitle: { fontSize: 22, fontWeight: "600" },

    modalLabel: { fontSize: 18, fontWeight: "600", marginVertical: 8 },

    rowWrap: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 12 },

    modalTag: {
        borderColor: "#ddd",
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
    },

    ageGrid: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginBottom: 20,
    },

    ageBox: {
        width: "48%",
        paddingVertical: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        alignItems: "center",
        marginBottom: 12,
    },

    ageNumber: {
        fontSize: 26,
        fontWeight: "600",
    },

    ageText: { color: "#777" },
});
