import React, { useEffect } from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { colors } from "../../assets/lib";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const PremiumSubscriptionScreen = () => {
    const navigation = useNavigation();



    const handleStartPremium = () => {
        navigation.navigate("PlanSubscriptionScreen" as never);
    };



    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.bg}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Header title="Premium Subscription" />

                {/* Featured Image */}
                <Image
                    source={require("../../assets/images/subscription/feat.png")}
                    style={styles.featuredImage}
                    resizeMode="contain"
                />

                {/* Badge */}
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>👑 Premium</Text>
                </View>

                {/* Header Text */}
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>
                        Give your family full access to the ZenFamy world
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        Join thousands of families on their journey to mindfulness
                    </Text>
                </View>

                {/* Benefits Section */}
                <View style={styles.benefitsContainer}>
                    {[
                        {
                            icon: require("../../assets/images/subscription/paperpen.png"),
                            title: "Unlimited personalized stories",
                            subtitle: "Unlimited personalized stories",
                        },
                        {
                            icon: require("../../assets/images/subscription/light.png"),
                            title: "Tailored parenting advice",
                            subtitle: "Track emotional growth with AI-powered analytics",
                        },
                        {
                            icon: require("../../assets/images/subscription/penpaaper.png"),
                            title: "Emotional journal for each child",
                            subtitle: "Access premium quizzes and family exercises",
                        },
                        {
                            icon: require("../../assets/images/subscription/yoga.png"),
                            title: "Complete access to quizzes",
                            subtitle: "Learn from Master Zenio's complete collection",
                        },
                    ].map((item, index) => (
                        <View key={index} style={styles.benefitItem}>
                            <Image source={item.icon} style={styles.benefitIcon} />
                            <View style={styles.benefitText}>
                                <Text style={styles.benefitTitle}>{item.title}</Text>
                                <Text style={styles.benefitSubtitle}>{item.subtitle}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Banner Image */}
                <Image
                    source={require("../../assets/images/subscription/banner.png")}
                    style={styles.bannerImage}
                    resizeMode="cover"
                />

                {/* Buttons */}
                <View style={styles.buttonGroup}>
                    <Button
                        bgColor={colors.secondaryBackground}
                        name="Learn More"
                        textColor={colors.primaryButton}
                    // onPress={() => { }}
                    />
                    <Button
                        bgColor={colors.secondaryTextColor}
                        name="Start Premium Journey"
                        onclick={handleStartPremium}
                    />
                </View>

                {/* Footer */}
                <Text style={styles.footerText}>
                    7-day free trial | Cancel anytime
                </Text>

                <View style={{ height: 100 }} />
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
    container: {
        padding: 16,
        paddingTop: 32,
    },
    featuredImage: {
        width: "100%",
        height: 200,
        marginBottom: 16,
    },
    badgeContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        elevation: 3,
        marginBottom: 16,
    },
    badgeText: {
        backgroundColor: "#F4978E",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 50,
        color: "#fff",
        fontSize: 12,
    },
    headerTextContainer: {
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 23,
        fontWeight: "bold",
        marginVertical: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: "#6b7280",
    },
    benefitsContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        marginBottom: 16,
    },
    benefitItem: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
        paddingBottom: 12,
        marginBottom: 12,
    },
    benefitIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#fff",
    },
    benefitText: {
        marginLeft: 8,
        flex: 1,
    },
    benefitTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    benefitSubtitle: {
        fontSize: 14,
        color: "#6b7280",
    },
    bannerImage: {
        width: "100%",
        borderRadius: 8,
        marginBottom: 16,
        height: 120,
    },
    buttonGroup: {
        marginVertical: 16,
    },
    footerText: {
        fontSize: 14,
        color: "#b9807e",
        textAlign: "center",
    },
});

export default PremiumSubscriptionScreen;
