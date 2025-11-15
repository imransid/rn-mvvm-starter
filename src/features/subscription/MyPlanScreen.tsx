import React, { useEffect } from "react";
import {
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // react-native-vector-icons
import Button from "../../components/Button";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
// import { listSubscriptionTypes } from "../../redux/slices/subscriptionSlice";
import { colors } from "../../assets/lib";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useGetMySubscriptionQuery, useGetSubscriptionTypesQuery } from "../../api/subscriptionApi";

const SubscriptionDetailsScreen = () => {

    const navigation = useNavigation();

    const isFocused = useIsFocused();

    const {
        data: subscriptions,
        isLoading: loadingSub,
        isError: errorSub,
        refetch: refetchSubscriptions,
    } = useGetMySubscriptionQuery(undefined, { skip: !isFocused });

    const {
        data: subscriptionTypes,
        isLoading: loadingTypes,
        isError: errorTypes,
        refetch: refetchTypes,
    } = useGetSubscriptionTypesQuery(undefined, { skip: !isFocused });

    // Refetch every time screen becomes focused
    useEffect(() => {
        if (isFocused) {
            refetchSubscriptions();
            refetchTypes();
        }
    }, [isFocused]);

    // Loading state
    if (loadingSub || loadingTypes) {
        return (
            <ImageBackground
                source={require("../../assets/images/bg/greenshadow.png")}
                resizeMode="cover"
                style={styles.bg}
            >
                <Text style={styles.loadingText}>Loading...</Text>
            </ImageBackground>
        );
    }

    // Error state
    if (errorSub || errorTypes || !subscriptions || !subscriptionTypes) {
        return (
            <ImageBackground
                source={require("../../assets/images/bg/greenshadow.png")}
                resizeMode="cover"
                style={styles.bg}
            >
                <Text style={styles.loadingText}>Error loading subscription data.</Text>
            </ImageBackground>
        );
    }

    // Find subscription type for the user
    const subscriptionData = subscriptionTypes.find(
        (type) =>
            type.subscription_type_id === subscriptions[0]?.subscription_type_id
    );

    if (!subscriptionData) {
        return (
            <ImageBackground
                source={require("../../assets/images/bg/greenshadow.png")}
                resizeMode="cover"
                style={styles.bg}
            >
                <Text style={styles.loadingText}>No subscription data available.</Text>
            </ImageBackground>
        );
    }

    const parseDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day);
    };

    const getSubscriptionPeriod = (startDateStr: string, endDateStr: string) => {
        const startDate = parseDate(startDateStr);
        const endDate = parseDate(endDateStr);

        const annualDate = new Date(startDate);
        annualDate.setFullYear(startDate.getFullYear() + 1);
        if (annualDate.getTime() === endDate.getTime()) return "Annually";

        const monthlyDate = new Date(startDate);
        monthlyDate.setMonth(startDate.getMonth() + 1);
        if (monthlyDate.getTime() === endDate.getTime()) return "Monthly";

        return "Other Period";
    };

    const isSubscriptionActive = (validToDateStr: string) => {
        const now = new Date();
        const validToDate = parseDate(validToDateStr);
        const dayAfterValidTo = new Date(validToDate);
        dayAfterValidTo.setDate(validToDate.getDate() + 1);

        return now.getTime() < dayAfterValidTo.getTime();
    };

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.bg}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Header title="My Subscription" rightImage={false} />

                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.subscriptionTitle}>
                        {subscriptionData?.subscription_type_name}
                    </Text>
                    <Text style={styles.subscriptionPrice}>€{subscriptionData?.price}</Text>
                    <Text style={styles.nextBilling}>
                        Next billing: {subscriptionData?.valid_to}
                    </Text>
                </View>

                {/* Current Plan */}
                <View style={styles.currentPlan}>
                    <View>
                        <Text style={styles.currentPlanTitle}>
                            {subscriptionData?.subscription_type_name}
                        </Text>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceText}>€ {subscriptionData?.price}</Text>
                            <Text style={styles.periodText}>
                                /
                                {getSubscriptionPeriod(
                                    subscriptionData?.valid_from,
                                    subscriptionData.valid_to
                                ) === "Annually"
                                    ? "Year"
                                    : "Month"}
                            </Text>
                        </View>
                        <Text style={styles.nextBillingSmall}>
                            Next billing: {subscriptionData?.valid_to}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.activeButton}>
                        <Text style={styles.activeButtonText}>
                            {isSubscriptionActive(subscriptionData?.valid_to)
                                ? "Active"
                                : "Expired"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Subscription Details */}
                <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Status</Text>
                        <Text
                            style={[
                                styles.detailValue,
                                isSubscriptionActive(subscriptionData?.valid_to)
                                    ? { color: "green" }
                                    : { color: "red" },
                            ]}
                        >
                            {isSubscriptionActive(subscriptionData?.valid_to) ? "Active" : "Expired"}
                        </Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Billing Cycle</Text>
                        <Text style={styles.detailValue}>
                            {getSubscriptionPeriod(
                                subscriptionData?.valid_from,
                                subscriptionData?.valid_to
                            )}
                        </Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Start Date</Text>
                        <Text style={styles.detailValue}>{subscriptionData?.valid_from}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Next Renewal Date</Text>
                        <Text style={styles.detailValue}>{subscriptionData?.valid_to}</Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <Button
                        name="Manage Payment Method"
                        bgColor={colors.primaryButton}
                    // onPress={() => { }}
                    />
                    <Button
                        name="Change Plan"
                        bgColor="#6A9B9D"
                        onclick={() => navigation.navigate("PlanSubscriptionScreen" as never)}
                    />
                    <Button
                        name="Cancel Subscription"
                        bgColor="#f4d0cd"
                        onclick={() => navigation.navigate("SubscriptionCancellationScreen" as never)}
                    />
                </View>

                {/* Auto-Renewal Note */}
                <View style={styles.infoContainer}>
                    <Icon name="information-circle-outline" size={26} color="red" />
                    <Text style={styles.infoText}>
                        Your subscription will automatically renew unless auto-renewal is
                        turned off at least 24 hours before the end of the current period.
                    </Text>
                </View>

                <View style={{ height: 20 }} />
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bg: { flex: 1 },
    container: { padding: 16 },
    loadingText: { marginTop: 70, textAlign: "center", fontSize: 16 },

    headerContainer: { marginBottom: 16 },
    subscriptionTitle: { fontSize: 20, fontWeight: "bold" },
    subscriptionPrice: { color: "#6b7280", marginTop: 4 },
    nextBilling: { fontSize: 12, color: "#6b7280" },

    currentPlan: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 3,
    },
    currentPlanTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
    priceRow: { flexDirection: "row", alignItems: "flex-end" },
    priceText: { fontSize: 28, fontWeight: "bold", color: "#111" },
    periodText: { fontSize: 12, marginLeft: 2, marginBottom: 2, color: "#111" },
    nextBillingSmall: { fontSize: 12, color: "#6b7280", marginTop: 4 },
    activeButton: {
        backgroundColor: "#8dbfaa",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    activeButtonText: { color: "#fff", fontSize: 12 },

    detailsContainer: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
    },
    detailLabel: { color: "#6b7280" },
    detailValue: { fontWeight: "600", textAlign: "right" },

    buttonContainer: { marginBottom: 16 },
    infoContainer: {
        backgroundColor: "#fee2e2",
        borderWidth: 1,
        borderColor: "#fca5a5",
        padding: 12,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    infoText: { color: "red", marginLeft: 8, flex: 1, fontSize: 12 },
});

export default SubscriptionDetailsScreen;
