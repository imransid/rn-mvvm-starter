/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
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
import { colors, toasts } from "../../assets/lib";
import { useCreateSubscriptionMutation, useGetMySubscriptionQuery, useGetSubscriptionTypesQuery, useUpdateSubscriptionMutation } from "../../api/subscriptionApi";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { RootState } from "../../app/store";
import api from "../../api/redirectApi";


const PlanSelectionScreen = () => {
    const [selectedPlan, setSelectedPlan] = useState("monthly"); // Default selected plan
    const [family, setFamily] = useState<any[]>([]);
    const token = useSelector((state: RootState) => state.root.auth.access_token);
    const isFocused = useIsFocused();
    const {
        data: subscriptions,
        isLoading: loadingSub,
        isError: errorSub,
        refetch: refetchSubscriptions,
    } = useGetMySubscriptionQuery(undefined, { skip: !isFocused });
    const {
        data: plans,
        isLoading: loadingTypes,
        isError: errorTypes,
        refetch: refetchTypes,
    } = useGetSubscriptionTypesQuery(undefined, { skip: !isFocused });
    const [createSubscription, { isLoading, isError, data }] = useCreateSubscriptionMutation();

    const [updateSubscription] = useUpdateSubscriptionMutation();
    // Refetch every time screen becomes focused
    useEffect(() => {
        if (isFocused) {
            refetchSubscriptions();
            refetchTypes();
        }
    }, [isFocused]);



    // Fetch family data when screen is focused
    useFocusEffect(
        useCallback(() => {
            const fetchFamily = async () => {
                try {
                    const response = await api.get("/families/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setFamily(response.data); // update local state
                } catch (err) {
                    console.log("Failed to fetch family:", err);
                }
            };

            fetchFamily();
        }, [token]) // re-run if token changes
    );



    const handlePlanSelect = async (plan: any) => {
        try {
            // Validate plan
            if (!plan || !plan.subscription_type_id || !plan.valid_from || !plan.valid_to) {
                toasts("Invalid plan selected.", "error");
                return;
            }

            // Validate family (needed for creation)
            if (!subscriptions?.length && !family) {
                toasts("Family information missing.", "error");
                return;
            }

            // Extract needed data
            const subscription = subscriptions?.[0];

            // UPDATE existing subscription
            if (subscription) {
                if (!subscription.subscription_id) {
                    toasts("Invalid subscription data.", "error");
                    return;
                }

                const response = await updateSubscription({
                    subscription_id: subscription.subscription_id,
                    subscription_type_id: plan.subscription_type_id,
                    start_date: plan.valid_from,
                    end_date: plan.valid_to,
                }).unwrap();

                toasts("Subscription updated successfully!", "success");
                return;
            }

            // CREATE new subscription
            const createResponse = await createSubscription({
                family_id: family.family_id,
                subscription_type_id: plan.subscription_type_id,
                start_date: plan.valid_from,
                end_date: plan.valid_to,
            }).unwrap();

            toasts("Subscription created successfully!", "success");

        } catch (error: any) {
            console.error("Subscription error:", error);
            toasts(error?.data?.message || "Failed to process subscription.", "error");
        }
    };



    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.bg}
        >
            <Header title="Choose Your Plan" rightImage={false} />
            <ScrollView contentContainerStyle={styles.container}>
                {/* Header */}
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>
                        Unlock the Full ZenFamy Experience
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        Join thousands of families on their journey to mindfulness
                    </Text>
                </View>

                {/* Current Plan */}
                <View style={styles.currentPlan}>
                    <View>
                        <Text style={styles.currentPlanLabel}>Current Plan</Text>
                        <Text style={styles.currentPlanTitle}>ZenFamy Full Access</Text>
                    </View>
                    <TouchableOpacity style={styles.activeButton}>
                        <Text style={styles.activeButtonText}>+Active</Text>
                    </TouchableOpacity>
                </View>

                {/* Plan Options */}
                {plans?.map((plan: any, index) => (
                    <View key={index} style={{ marginBottom: 16 }}>
                        <TouchableOpacity
                            onPress={() => handlePlanSelect(plan)}
                            style={[
                                styles.planCard,
                                selectedPlan === plan.id && styles.selectedPlanCard,
                            ]}
                        >
                            <View style={styles.planHeader}>
                                <View>
                                    <Text style={styles.planTitle}>{plan.title}</Text>
                                    <View style={styles.priceRow}>
                                        <Text style={styles.planPrice}>{plan.price}</Text>
                                        <Text style={styles.planFrequency}>/{plan.frequency}</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: "flex-end" }}>
                                    {plan.id === "annual" && (
                                        <View style={styles.mostPopularBadge}>
                                            <Text style={styles.mostPopularText}>🔥 Most Popular</Text>
                                        </View>
                                    )}
                                    {plan.id === "annual" && <Text style={styles.saveText}>Save 33%</Text>}
                                </View>
                            </View>

                            {/* Benefits */}
                            <View style={styles.benefitsContainer}>
                                {plan?.benefits.map((benefit: string, index: number) => (
                                    <View key={index} style={styles.benefitRow}>
                                        <Icon
                                            name="checkmark-circle-outline"
                                            size={23}
                                            color="#00a308"
                                            style={{ marginRight: 6 }}
                                        />
                                        <Text style={styles.benefitText}>{benefit}</Text>
                                    </View>
                                ))}
                            </View>

                            {/* Buttons */}
                            {plan.id === "monthly" && (
                                <Button
                                    name="Start a Free Trial"
                                    textColor="#fff"
                                    bgColor={colors.primaryButton}

                                // onclick={() => router.push("/family_profile")}
                                />
                            )}
                            {plan.id === "annual" && (
                                <Button
                                    name="Choose Annual"
                                    textColor="#fff"
                                    bgColor={colors.primaryButton}

                                // onclick={() => router.push("/family_profile")}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                ))}

                {/* What's Included */}
                <Text style={styles.includedTitle}>{"What's"} included</Text>
                <View style={styles.includedContainer}>
                    <View style={styles.includedHeader}>
                        <Text style={styles.featureColumn}>Features</Text>
                        <Text style={styles.featureColumn}>Free Plan</Text>
                        <Text style={styles.featureColumn}>Full Access</Text>
                    </View>
                    {plans && plans.length > 0 && Object.keys(plans[0].features).map((feature, index) => (
                        <View key={index} style={styles.featureRow}>
                            <Text style={styles.featureText}>{feature}</Text>
                            <Text style={styles.featureText}>{plans[0].features[feature]}</Text>
                            <Text style={styles.featureText}>{plans[1].features[feature]}</Text>
                        </View>
                    ))}
                </View>

                <View style={{ alignItems: "center", marginVertical: 8 }}>
                    <Text style={styles.freeTrialText}>7-day free trial included</Text>
                    <Text style={styles.termsText}>
                        By continuing, you agree to our{" "}
                        {/* <Link href={"/terms" as any} style={styles.linkText}>
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href={"/terms" as any} style={styles.linkText}>
                            Privacy Policy
                        </Link> */}
                    </Text>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bg: { flex: 1 },
    container: { padding: 16 },
    headerTextContainer: { marginBottom: 16 },
    headerTitle: { fontSize: 18, fontWeight: "bold" },
    headerSubtitle: { fontSize: 12, color: "#6b7280", marginTop: 4 },

    currentPlan: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
    },
    currentPlanLabel: { fontSize: 12, color: "#6b7280" },
    currentPlanTitle: { fontSize: 16, fontWeight: "600", marginTop: 4 },
    activeButton: { backgroundColor: "#8dbfaa", padding: 8, borderRadius: 20 },
    activeButtonText: { color: "#fff", fontSize: 12 },

    planCard: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
    },
    selectedPlanCard: { borderWidth: 2, borderColor: "#14b8a6" },
    planHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
    planTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
    priceRow: { flexDirection: "row", alignItems: "flex-end" },
    planPrice: { fontSize: 28, fontWeight: "bold", color: "#111" },
    planFrequency: { fontSize: 12, marginLeft: 4, marginBottom: 2, color: "#111" },
    mostPopularBadge: { backgroundColor: "#F4978E", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 4 },
    mostPopularText: { color: "#fff", fontSize: 12 },
    saveText: { color: "#F4978E", marginTop: 8, fontSize: 12 },

    benefitsContainer: { marginBottom: 16 },
    benefitRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
    benefitText: { color: "#111", fontWeight: "500", fontSize: 12 },

    includedTitle: { fontSize: 16, fontWeight: "600", marginVertical: 8 },
    includedContainer: { backgroundColor: "#fff", borderRadius: 12, padding: 16 },
    includedHeader: { flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#f3f4f6", paddingBottom: 8 },
    featureColumn: { flex: 1, fontSize: 12, fontWeight: "600", color: "#111", textAlign: "center" },
    featureRow: { flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#f3f4f6", paddingVertical: 8 },
    featureText: { flex: 1, fontSize: 12, color: "#111", textAlign: "center" },

    freeTrialText: { color: "#F4978E", fontSize: 12, fontWeight: "600", textAlign: "center" },
    termsText: { fontSize: 10, color: "#6b7280", textAlign: "center", marginTop: 4 },
    linkText: { color: "#3b82f6", textDecorationLine: "underline" },
});

export default PlanSelectionScreen;
