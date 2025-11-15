import React, { useState } from "react";
import {
    Image,
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import Button from "../../components/Button";
import Header from "../../components/Header";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, toasts } from "../../assets/lib";
import { useDeleteSubscriptionMutation, useGetMySubscriptionQuery } from "../../api/subscriptionApi";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const SubscriptionCancellationScreen = () => {
    // State to track user's reasons for cancellation
    const [reasons, setReasons] = useState<any>({
        tooExpensive: false,
        notUsingFeatures: false,
        foundAlternative: false,
        technicalIssues: false,
        other: false,
    });


    const [deleteSubscription, { isLoading, isError, data }] = useDeleteSubscriptionMutation();


    const navigation = useNavigation();

    const isFocused = useIsFocused();

    const {
        data: subscriptions,
        isLoading: loadingSub,
        isError: errorSub,
        refetch: refetchSubscriptions,
    } = useGetMySubscriptionQuery(undefined, { skip: !isFocused });


    const handleDelete = async (subscriptionId: number) => {
        try {
            await deleteSubscription(subscriptionId).unwrap();
            toasts("Deleted successfully", "success");
            refetchSubscriptions(); // refresh subscriptions
            navigation.navigate("PremiumSubscriptionScreen" as never)

        } catch (error: any) {
            console.error("Failed to delete subscription:", error);
            toasts(error?.data?.message || "Failed to delete", "error");
        }
    };

    // Handle reason selection
    const handleReasonChange = (key: string) => {
        setReasons((prev: any) => ({ ...prev, [key]: !prev[key] }));
    };

    const reasonLabels: any = {
        tooExpensive: "Too expensive",
        notUsingFeatures: "Not using features",
        foundAlternative: "Found an alternative",
        technicalIssues: "Technical issues",
        other: "Other",
    };

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.bg}
        >
            <Header title="Canceling your plan?" rightImage={false} />
            <ScrollView contentContainerStyle={styles.container}>
                {/* Notification */}
                <View style={styles.notificationContainer}>
                    <Image
                        source={require("../../assets/images/login/notifi.png")}
                        style={styles.notificationImage}
                    />
                    <View style={styles.notificationTextContainer}>
                        <Text style={styles.notificationText}>
                            We hope to help support your parenting journey.
                        </Text>
                        <Text style={styles.notificationText}>
                            Let’s see if we can help before you decide.
                        </Text>
                    </View>
                </View>

                {/* Subscription Details */}
                <View style={styles.subscriptionDetails}>
                    <Ionicons
                        name="information-circle-outline"
                        size={24}
                        color="#e3aeaa"
                    />
                    <Text style={styles.subscriptionText}>
                        Your ZenFamy Premium subscription is active until December 31,
                        2023.
                    </Text>
                </View>

                {/* Special Offer Header */}
                <Text style={styles.sectionTitle}>One last thing before you go...</Text>

                {/* Special Offer Details */}
                <View style={styles.specialOfferContainer}>
                    <View style={styles.offerItem}>
                        <FontAwesome name="times-circle-o" size={24} color="#e3aeaa" />
                        <Text style={styles.offerText}>Unlimited meditation sessions</Text>
                    </View>
                    <View style={styles.offerItem}>
                        <FontAwesome name="times-circle-o" size={24} color="#e3aeaa" />
                        <Text style={styles.offerText}>Personalized wellness tracking</Text>
                    </View>
                    <View style={styles.offerItem}>
                        <FontAwesome name="times-circle-o" size={24} color="#e3aeaa" />
                        <Text style={styles.offerText}>Ad-free experience</Text>
                    </View>
                </View>

                {/* Special Offer Purchase */}
                <View style={styles.specialOfferBox}>
                    <Text style={styles.sectionTitle}>Special Offer</Text>
                    <View style={styles.offerPriceRow}>
                        <Text style={styles.offerPrice}>$99.99</Text>
                        <Text style={styles.offerPeriod}>/year</Text>
                    </View>
                    <Text style={styles.offerDescription}>
                        Enjoy 30 extra days of full access for $XX. Stay connected to
                        stories, tips, and Zenio.
                    </Text>
                    <Button name="Accept Offer" bgColor={colors.secondaryTextColor} />
                    <Button name="Start Free Trial" bgColor={"#8dbfaa"} />
                </View>

                {/* Feedback Section */}
                <View style={styles.feedbackContainer}>
                    <Text style={styles.sectionTitle}>
                        Please tell us why {"you're"} cancelling:
                    </Text>
                    {Object.keys(reasons).map((key, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleReasonChange(key)}
                            style={styles.reasonRow}
                        >
                            <Text style={styles.reasonText}>{reasonLabels[key]}</Text>
                            {!reasons[key] && <View style={styles.checkbox} />}
                            {reasons[key] && (
                                <Ionicons name="checkbox" size={20} color={colors.primaryButton} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Action Buttons */}
                <Button name="Keep My Subscription" bgColor={colors.primaryButton} />
                <Button
                    name="Confirm Cancellation"
                    bgColor={colors.secondaryTextColor}
                    onclick={() => {
                        if (subscriptions !== undefined) {
                            if (subscriptions.length > 0) {
                                handleDelete(subscriptions[0].subscription_id)
                            }
                        }
                    }}
                />

                <View style={{ height: 100 }} />
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bg: { flex: 1 },
    container: { padding: 16 },
    notificationContainer: {
        backgroundColor: "#D6BFE2",
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        borderRadius: 8,
        marginBottom: 16,
    },
    notificationImage: { width: 40, height: 40, marginRight: 8 },
    notificationTextContainer: { flex: 1 },
    notificationText: { fontSize: 13, fontWeight: "bold" },
    subscriptionDetails: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
    },
    subscriptionText: { fontSize: 14, color: "#6b7280", marginLeft: 8 },
    sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
    specialOfferContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
    },
    offerItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
    },
    offerText: { fontSize: 14, color: "#6b7280", marginLeft: 8 },
    specialOfferBox: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
    },
    offerPriceRow: { flexDirection: "row", alignItems: "flex-end", marginBottom: 8 },
    offerPrice: { fontSize: 29, fontWeight: "bold", marginRight: 4 },
    offerPeriod: { fontSize: 12, marginBottom: 2 },
    offerDescription: { fontSize: 12, marginBottom: 8, color: "#6b7280" },
    feedbackContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    reasonRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
    },
    reasonText: { fontSize: 14, color: "#6b7280" },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: "#d1d5db",
        borderRadius: 4,
    },
});

export default SubscriptionCancellationScreen;
