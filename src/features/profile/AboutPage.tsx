import Header from "../../components/Header";
import React from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";

const About = () => {
    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.bg}
        >
            <Header title="About Zenfamy" />
            <ScrollView contentContainerStyle={styles.container}>
                {/* Header */}
                <View style={styles.headerSection}>
                    <Image
                        source={require("../../assets/images/profile/about.png")}
                        style={styles.image}
                    />
                    <Text style={styles.title}>
                        Meet Master Zenio — Your Calm Parenting Guide 🌿
                    </Text>
                    <Text style={styles.text}>
                        Master Zenio is here to gently support you on your parenting
                        journey. Think of him as your wise, compassionate companion — ready
                        to help you understand your child’s feelings, navigate daily
                        challenges, and grow together with patience and kindness.
                    </Text>
                    <Text style={styles.text}>
                        With insights rooted in child psychology and practical wisdom,
                        Master Zenio offers advice, reflections, and tools designed just for
                        parents like you — because calm parenting starts with confident
                        understanding.
                    </Text>
                </View>

                {/* Content */}
                <View style={styles.contentSection}>
                    {/* Section 1 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
                        <Text style={styles.text}>We may collect the following types of information when you use our site:</Text>
                        <View style={styles.list}>
                            <Text style={styles.text}>• Personal Information: Name, email address, phone number, etc. (only if you submit it through a form).</Text>
                            <Text style={styles.text}>• Usage Data: IP address, browser type, pages visited, time spent on the site.</Text>
                            <Text style={styles.text}>• Travel Preferences: If you use our AI planner, we may collect trip-related preferences (e.g., destinations, budget, travel style).</Text>
                        </View>
                    </View>

                    {/* Section 2 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
                        <Text style={styles.text}>We use your information to:</Text>
                        <View style={styles.list}>
                            <Text style={styles.text}>• Personalize your travel experience.</Text>
                            <Text style={styles.text}>• Provide AI-based recommendations and services.</Text>
                            <Text style={styles.text}>• Respond to your inquiries or support requests.</Text>
                            <Text style={styles.text}>• Improve our platform, design, and features.</Text>
                            <Text style={styles.text}>• Send travel updates or marketing emails (only if you subscribe).</Text>
                        </View>
                    </View>

                    {/* Section 3 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>3. Cookies & Tracking</Text>
                        <Text style={styles.text}>
                            We use cookies and tracking technologies to enhance user experience, analyze traffic, and understand how users interact with our platform. You can manage cookie preferences in your browser settings.
                        </Text>
                    </View>
                </View>

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
    },
    headerSection: {
        alignItems: "center",
        marginBottom: 16,
    },
    image: {
        marginVertical: 20,
        width: 120,
        height: 120,
        resizeMode: "contain",
    },
    title: {
        fontSize: 29,
        fontWeight: "bold",
        marginTop: 16,
        textAlign: "center",
    },
    text: {
        fontSize: 16,
        color: "#6b7280",
        marginTop: 8,
        textAlign: "center",
    },
    contentSection: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    list: {
        marginLeft: 16,
        marginTop: 8,
    },
});

export default About;
