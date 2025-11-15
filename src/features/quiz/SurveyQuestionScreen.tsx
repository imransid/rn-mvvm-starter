/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

import { colors, toasts } from "../../assets/lib";
import Button from "../../components/Button";
// import {
//     completeQuizSession,
//     submitQuizAnswer,
// } from "@/redux/slices/quizSlice";
import { avatar } from "./QuizzesScreen";
import Header from "./QuizHeader";
import { RootState } from "../../app/store";
import { useRoute } from "@react-navigation/native";
import QuizProgress from "./ProgressBar";
import { getNextQuestionRequest } from "./quizSlice";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";

const SurveyQuestionScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch<any>();
    const route = useRoute<any>();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const question = useSelector((state: RootState) => state.root.quiz.questions)
    const indexIs = useSelector((state: RootState) => state.root.quiz.currentQuestionIndex)
    const session = useSelector((state: RootState) => state.root.quiz.session)
    const loading = useSelector((state: RootState) => state.root.quiz.loading)
    const token = useSelector((state: RootState) => state.root.auth.access_token)

    // const { session, question } = useSelector((state: any) => state.quizzes);
    const selectedChild = useSelector((state: RootState) => state.root.home.selectedChild);

    const questionData = {
        totalQuestions: 11,
        questions: [
            { id: 1, text: "How often do you feel happy?", options: ["1", "2", "3", "4", "5"] },
            { id: 2, text: "How often do you feel stressed?", options: ["1", "2", "3", "4", "5"] },
        ],
    };

    /** SELECT OPTION */
    const handleOptionSelect = (option: string) => {
        setSelectedOptions((prev) =>
            prev.includes(option)
                ? prev.filter((x) => x !== option)
                : [...prev, option]
        );
    };

    /** NEXT */
    const handleNext = async () => {

        let _prams = {
            sessionId: session?.session_id,
            question_id: question?.question_id,
            response_value: selectedOptions.map((option) => Number(option)),
            navigation: navigation
        }


        console.log('indexIs', indexIs, _prams, question.question_id)


        // if (indexIs < 12) {
        dispatch(getNextQuestionRequest(_prams))
        setSelectedOptions([])
        // } else {



        //     const url = `https://api.zenfamy.ai/api/v1/quizzes/sessions/${session?.session_id}/complete`;




        //     const response = await axios.post(
        //         url,
        //         null, // no payload
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //                 Accept: 'application/json',
        //             },
        //         }
        //     );

        //     console.log('response', response)

        // navigation.navigate("QuizResult" as never)
        // }

    };




    /** PREV */
    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
            setSelectedOptions([]);
        }
    };

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            style={styles.bg}
        >
            <Header
                title="Quiz"
                home
                rightImage={
                    avatar.find((x: any) => x.name === selectedChild?.avatar_url)?.image
                }
            />

            <Spinner
                visible={loading}
                // textContent="Loading..."
                textStyle={{ color: "#fff" }}
            />

            <ScrollView contentContainerStyle={styles.scroll}>

                {/* Progress Bar */}

                <QuizProgress
                    totalQuestions={questionData.totalQuestions}
                    currentIndex={indexIs}
                />

                {/* Question */}
                <View style={styles.questionBox}>
                    <Text style={styles.questionNumber}>{indexIs + 1}</Text>
                    <Text style={styles.questionText}>{question?.question_text}</Text>
                </View>

                {/* Options */}
                <View style={{ marginBottom: 20 }}>
                    {question?.options?.map((option: any, index: number) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleOptionSelect(option)}
                            style={styles.option}
                        >
                            <Text style={styles.optionText}>{option}</Text>

                            <FontAwesome
                                name={selectedOptions.includes(option) ? "check-circle" : "circle-o"}
                                size={25}
                                color={
                                    selectedOptions.includes(option)
                                        ? colors.primaryButton
                                        : "#ddd"
                                }
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.helperText}>Take your time — you're doing great!</Text>

                <Image
                    source={require("../../assets/images/profile/bottom1.png")}
                    style={styles.bottomImage}
                />
            </ScrollView>




            {/* Bottom Buttons */}
            <View style={styles.bottomBar}>
                {currentQuestionIndex > 0 && (
                    <View style={styles.half}>
                        <Button
                            name="Previous"
                            textColor="#00adc0"
                            bgColor="#ffffff"
                            onclick={handlePrev}
                        />
                    </View>
                )}

                <View style={currentQuestionIndex === 0 ? styles.full : styles.half}>
                    <Button
                        name={currentQuestionIndex === 11 ? "Result" : "Next"}
                        textColor="#fff"
                        bgColor={
                            selectedOptions.length === 0 && currentQuestionIndex !== 11
                                ? "#BCE6EA"
                                : colors.primaryButton
                        }
                        onclick={handleNext}
                    />
                </View>
            </View>
        </ImageBackground>
    );
};

export default SurveyQuestionScreen;

const styles = StyleSheet.create({
    bg: { flex: 1 },
    scroll: { padding: 16, paddingBottom: 120 },

    progressRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    progressItem: {
        height: 6,
        flex: 1,
        marginRight: 4,
        borderRadius: 10,
    },
    progressText: {
        marginLeft: 8,
        fontSize: 14,
    },

    questionBox: {
        marginVertical: 20,
    },
    questionNumber: {
        fontSize: 32,
        fontWeight: "bold",
    },
    questionText: {
        marginTop: 6,
        fontSize: 20,
        color: "#333",
        fontWeight: "600",
    },

    option: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 14,
        marginBottom: 10,
        borderRadius: 30,
        justifyContent: "space-between",
    },
    optionText: {
        fontSize: 16,
        color: "#555",
    },

    helperText: {
        fontSize: 14,
        textAlign: "center",
        color: colors.primaryTextColor,
        marginBottom: 20,
    },

    bottomImage: {
        width: "100%",
        height: 200,
        resizeMode: "contain",
    },

    bottomBar: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        padding: 16,
        left: 0,
        right: 0,
        justifyContent: "space-between",
    },
    half: { width: "48%" },
    full: { width: "100%" },
});
