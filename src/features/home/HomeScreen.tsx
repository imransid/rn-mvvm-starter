import React, { useEffect } from "react";
import {
    ScrollView,
    Text,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Svg, { Path } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import Journal from "./Journal";

import { CustomButton } from "../auth/LoginScreen";
import { colors } from "../../assets/lib";
import ChildrenScroller from "./ChildrenScroller";
import Tips from "./Tips";
import MainNav from "./MainNav";
import Quiz from "./QuizScreen";
import { useNavigation } from "@react-navigation/native";


const HomeScreen = () => {
    const dispatch = useDispatch<any>();
    const children_list = []//useSelector((s: any) => s.childs.childs);
    const selectedChild = null

    const navigation = useNavigation<any>();
    useEffect(() => {

    }, [dispatch, children_list?.length]);

    // Fetch recommendations
    useEffect(() => {


    }, [dispatch, selectedChild]);

    return (
        <>
            <ScrollView style={styles.container}>
                {/* Header Background */}
                <ImageBackground
                    source={require("../../assets/images/bg/homebg.png")}
                    resizeMode="contain"
                    style={styles.headerBg}
                >
                    {/* Top Header */}
                    <View style={styles.topHeader}>
                        <View style={styles.greetingContainer}>
                            <Image
                                source={require("../../assets/images/imoji/animoji.png")}
                                style={styles.emojiImage}
                            />
                            <Text style={styles.premiumBadge}>Premium</Text>
                            <View>
                                <Text style={styles.greetingText}>Good Morning, Sarah!</Text>
                                <Text style={styles.subGreetingText}>{"What's happening today!"}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.notificationButton}
                        // onPress={() => router.push("/notification")}
                        >
                            <Ionicons name="notifications-outline" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    {/* Story Notification Card */}
                    <View style={styles.storyCardWrapper}>
                        <View style={styles.storyCard}>
                            <View style={styles.storyCardContent}>
                                <Image
                                    style={styles.storyCardImage}
                                    resizeMode="contain"
                                    source={require("../../assets/images/login/notifi.png")}
                                />
                                <View style={styles.storyCardText}>
                                    <Text style={styles.storyCardTitle}>Your story is ready!</Text>
                                    <Text style={styles.storyCardDesc}>Let’s enjoy this adventure together.</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                {/* Children Scroller */}
                <View style={styles.childrenScrollerWrapper}>
                    <ChildrenScroller colors={colors} />
                </View>

                {/* Journal Section */}
                <View style={styles.sectionWrapper}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Journal</Text>
                        <TouchableOpacity onPress={() =>

                            navigation.navigate("journals")

                        }>
                            <Text style={styles.seeMore}>See more</Text>
                        </TouchableOpacity>
                    </View>
                    <Journal />
                </View>

                {/* Recommendation Section */}
                <View style={styles.sectionWrapper}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recommendation</Text>
                    </View>

                    <View style={styles.subSectionHeader}>
                        <Text style={styles.subSectionTitle}>Tips</Text>
                        <TouchableOpacity onPress={() =>
                            console.log("ok")
                            // router.push("/recommendation")
                        }>
                            <Text style={styles.seeMore}>See more</Text>
                        </TouchableOpacity>
                    </View>
                    <Tips activity={false} name="advice" />

                    <View style={[styles.subSectionHeader, { marginTop: 12 }]}>
                        <Text style={styles.subSectionTitle}>Activity</Text>
                        <TouchableOpacity onPress={() =>
                            console.log("okko")
                            //router.push("/recommendation/activity")
                        }>
                            <Text style={styles.seeMore}>See more</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Tips activity={true} name="activity" /> */}
                </View>

                {/* Quiz Section */}
                <View style={styles.sectionWrapper}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Quiz</Text>
                    </View>
                    <Quiz />
                </View>

                {/* Story Section */}
                <View style={styles.sectionWrapper}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Story</Text>
                    </View>
                    <View style={styles.storyButtonWrapper}>
                        <CustomButton
                            text={
                                <View style={styles.generateStoryButton}>
                                    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
                                        <Path
                                            d="M1.75 10.75C6.25 10.75 10.75 6.25 10.75 1.75C10.75 6.25 15.25 10.75 19.75 10.75C15.25 10.75 10.75 15.25 10.75 19.75C10.75 15.25 6.25 10.75 1.75 10.75Z"
                                            stroke="white"
                                            strokeWidth={1.5}
                                            strokeLinejoin="round"
                                        />
                                    </Svg>
                                    <Text style={styles.generateStoryButtonText}>Generate New Story</Text>
                                </View>
                            }
                            onPress={() =>
                                console.log("okok")
                                // router.push("./stories/create_stories")
                            }
                        />

                        <View style={styles.storyHistoryWrapper}>
                            <TouchableOpacity
                                style={styles.storyHistoryButton}
                                onPress={() =>

                                    console.log("okoko")
                                    // router.push("./stories")
                                }
                            >
                                <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
                                    <Path
                                        d="M12.2499 10.75C12.2499 11.5784 11.5783 12.25 10.7499 12.25C9.92145 12.25 9.24988 11.5784 9.24988 10.75"
                                        stroke="white"
                                        strokeWidth={1.5}
                                    />
                                </Svg>
                                <Text style={styles.storyHistoryButtonText}>Story History</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ height: 150 }} />
            </ScrollView>

            <MainNav screen="home" />
        </>
    );
};

export default HomeScreen;

// ------------------------
// Styles
// ------------------------
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#EFFAFF" },
    headerBg: { width: "100%", height: 325, justifyContent: "center" },
    topHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: -50,
    },
    greetingContainer: { flexDirection: "row", alignItems: "center", position: "relative" },
    emojiImage: { width: 55, height: 55, marginRight: 8 },
    premiumBadge: {
        position: "absolute",
        bottom: -4,
        left: -4,
        backgroundColor: "#F4978E",
        textAlign: "center",
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 999,
        fontSize: 12,
        color: "#000",
    },
    greetingText: { fontSize: 16, fontWeight: "700", color: "#000" },
    subGreetingText: { fontSize: 12, fontWeight: "700", color: "#000" },
    notificationButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    storyCardWrapper: { paddingHorizontal: 16 },
    storyCard: { position: "relative", marginTop: 32 },
    storyCardContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 7,
        borderRadius: 16,
        backgroundColor: "#D6BFE2",
    },
    storyCardImage: { width: 60, height: 60, borderRadius: 12, backgroundColor: "#fff" },
    storyCardText: { marginLeft: 12, flexShrink: 1 },
    storyCardTitle: { fontWeight: "700", fontSize: 14, color: "#000", marginBottom: 2 },
    storyCardDesc: { fontWeight: "700", fontSize: 14, color: "#000" },
    childrenScrollerWrapper: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
    sectionWrapper: { paddingHorizontal: 16, marginTop: 16 },
    sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
    sectionTitle: { fontSize: 16, fontWeight: "700", color: "#000" },
    seeMore: { color: "#007AFF", fontSize: 15 },
    subSectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 0, marginVertical: 4 },
    subSectionTitle: { fontSize: 16, fontWeight: "500", color: "#535862" },
    storyButtonWrapper: { marginTop: 8 },
    generateStoryButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4 },
    generateStoryButtonText: { color: "#fff", fontSize: 16, fontWeight: "500" },
    storyHistoryWrapper: { marginTop: 7, position: "relative" },
    storyHistoryButton: {
        backgroundColor: "#8DBFAA",
        paddingVertical: 15,
        paddingHorizontal: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 35,
        gap: 7,
    },
    storyHistoryButtonText: { color: "#fff", fontSize: 16, fontWeight: "500" },
});
