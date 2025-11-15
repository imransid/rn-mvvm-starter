import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { logout } from "../auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import api from "../../api/redirectApi"
import CountryModal from "../../components/CountryModal";
import MainNav from "../home/MainNav";
import NavExpand from "../home/NavExpand";
import Switch from "../../components/Switch";

// import { myFamily } from "@/redux/slices/familySlice";
// import { listMySubscriptions } from "@/redux/slices/subscriptionSlice";

// Import your SVG components
import Bell from "./svgs/Bell";
import Family from "./svgs/Family";
import Female from "./svgs/Female";
import Help from "./svgs/Help";
import Info from "./svgs/Info";
import Language from "./svgs/Language";
import Privacy from "./svgs/Privacy";
import Profile from "./svgs/Profile";
import Subscription from "./svgs/Subcriptions";
import ExitExpand from "../home/ExitModal";
import { RootState } from "../../app/store";
import { clearTokens } from "../../utils/secureStorage";
import Svg, { Path } from "react-native-svg";
import { useGetMySubscriptionQuery } from "../../api/subscriptionApi";

const SettingsScreen = () => {

    const isFocused = useIsFocused();

    const { data: subscriber, refetch, isLoading, isError } = useGetMySubscriptionQuery(undefined, {
        skip: !isFocused, // skip fetching if screen is not focused
    });

    // Refetch every time screen becomes focused
    useEffect(() => {
        if (isFocused) {
            refetch();
        }
    }, [isFocused, refetch]);


    const [showNav, setShowNav] = useState(false);
    const [isNotifOn, setIsNotifOn] = useState(false);
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [languageCode, setLanguageCode] = useState("");

    const [exitNav, setExitNav] = useState(false);

    const users = useSelector((state: RootState) => state.root.auth.user);


    const subscriptions = []
    const loading = false


    const [family, setFamily] = useState<any[]>([]);
    const dispatch = useDispatch();
    const navigation = useNavigation<any>();
    const token = useSelector((state: RootState) => state.root.auth.access_token);

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
                    console.log("Family API response:", response.data);
                    setFamily(response.data); // update local state
                } catch (err) {
                    console.log("Failed to fetch family:", err);
                }
            };

            fetchFamily();
        }, [token]) // re-run if token changes
    );

    const logoutAction = async () => {

        await clearTokens()
        dispatch(logout())

        navigation.navigate("Onboarding");
    };

    const settingsData = [
        {
            title: "Account Management",
            items: [
                {
                    icon: <Text>👤</Text>, // Use your SVG or Emoji
                    label: users?.first_name ?? "No Name",
                    subtitle: users?.email ?? "",
                    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                    route: "ProfileSettingsScreen",
                },
                {
                    icon: <Female />,
                    label: "Children Profiles",
                    route: "ChildProfileDetail",
                },
                {
                    icon: loading ? <Text>⏳</Text> : <Family />,
                    label: "Family Profile",
                    route: family?.family_id ? "FamilyProfileDetail" : "FamilyProfile",
                },
                {
                    icon: <Subscription />,
                    label: "Subscription",
                    rightLabel: subscriber?.length > 0 ? "Premium" : undefined,
                    route: subscriber?.length > 0 ? "MySubscriptionScreen" : "PremiumSubscriptionScreen",
                    // "MyPlan" : "Subscription",
                },
            ],
        },
        {
            title: "App Preferences",
            items: [
                {
                    icon: <Language />,
                    label: "Language",
                    rightLabel: selectedLanguage,
                    onClick: () => setShowLanguageModal(true),
                },
                {
                    icon: <Bell />,
                    label: "Notification Settings",
                    rightLabel: "On",
                    onClick: () => { }, // implement settings toggle if needed
                },
            ],
        },
        {
            title: "Support & About",
            items: [
                { icon: <Help />, label: "Help Center / FAQ", route: "FAQ" },
                { icon: <Profile />, label: "Contact Us", route: "Contact" },
                { icon: <Privacy />, label: "Privacy Policy", route: "PrivacyPolicy" },
                { icon: <Privacy />, label: "Terms of Service", route: "Terms" },
                { icon: <Info />, label: "About ZenFamy", rightLabel: "Version 1.0.0", route: "About" },
            ],
        },
    ];

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Settings</Text>
                    <TouchableOpacity style={styles.logoutContainer} onPress={logoutAction}>
                        <Text style={styles.logoutIcon}>

                            <Svg
                                x="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <Path
                                    d="M12.75 15.375C12.6764 17.2269 11.1331 18.7994 9.06564 18.7488C8.58465 18.737 7.99013 18.5694 6.80112 18.234C3.93961 17.4268 1.45555 16.0703 0.859555 13.0315C0.75 12.473 0.75 11.8444 0.75 10.5873L0.75 8.91274C0.75 7.65561 0.75 7.02705 0.859556 6.46846C1.45555 3.42965 3.93961 2.07316 6.80112 1.26603C7.99014 0.930645 8.58465 0.762954 9.06564 0.751187C11.1331 0.70061 12.6764 2.27307 12.75 4.12501"
                                    stroke="#FF0000"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                <Path
                                    d="M18.75 9.75H7.75M18.75 9.75C18.75 9.04977 16.7557 7.74153 16.25 7.25M18.75 9.75C18.75 10.4502 16.7557 11.7585 16.25 12.25"
                                    stroke="#FF0000"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </Svg>
                        </Text>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>

                {settingsData.map((section, sIndex) => (
                    <View key={sIndex} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <View style={styles.card}>
                            {section.items.map((item: any, iIndex: number) => (
                                <TouchableOpacity
                                    key={iIndex}
                                    style={[
                                        styles.item,
                                        iIndex !== section.items.length - 1 && styles.itemBorder,
                                    ]}
                                    onPress={() => {
                                        if (item.route) navigation.navigate(item.route);
                                        else if (item.onClick) item.onClick();
                                    }}
                                >
                                    <View style={styles.itemLeft}>
                                        {item.avatar ? (
                                            <Image source={{ uri: item.avatar }} style={styles.avatar} />
                                        ) : (
                                            item.icon
                                        )}
                                        <View style={styles.itemText}>
                                            <Text style={styles.itemLabel}>{item.label}</Text>
                                            {item.subtitle && <Text style={styles.itemSubtitle}>{item.subtitle}</Text>}
                                        </View>
                                    </View>

                                    {item.rightLabel ? (
                                        item.label === "Notification Settings" ? (
                                            <Switch value={isNotifOn} setvalue={setIsNotifOn} />
                                        ) : (
                                            <View style={styles.itemRight}>
                                                <Text style={styles.rightLabel}>{item.rightLabel}</Text>
                                                <Text style={styles.chevron}>›</Text>
                                            </View>
                                        )
                                    ) : (
                                        <Text style={styles.chevron}>›</Text>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                <View style={{ height: 100 }} />
                <CountryModal
                    setvalue={setSelectedLanguage}
                    selectedvalue={selectedLanguage}
                    setshowmodal={setShowLanguageModal}
                    showmodal={showLanguageModal}
                    datatype="language"
                    setlanguageCode={setLanguageCode}
                />
            </ScrollView>

            {/* Expanded Navigation */}
            {showNav && <NavExpand setshowNav={() => {
                setShowNav(false);
                setExitNav(true);
            }} setExitNav={() => {
                setShowNav(false);
            }}

            />}
            {
                exitNav && <ExitExpand setShowExit={setExitNav} />
            }
            <MainNav screen="profile" />
        </ImageBackground>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    background: { flex: 1 },
    scrollContainer: { padding: 16 },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 30, paddingVertical: 12 },
    headerTitle: { fontSize: 23, fontWeight: "600" },
    logoutContainer: { flexDirection: "row", alignItems: "center", gap: 6 },
    logoutIcon: { fontSize: 18, color: "red" },
    logoutText: { fontSize: 16, color: "red" },
    section: { marginTop: 16 },
    sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
    card: { backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, borderColor: "#F5F5F5", padding: 16 },
    item: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12 },
    itemBorder: { borderBottomWidth: 1, borderBottomColor: "#E5E5E5" },
    itemLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
    itemText: {},
    itemLabel: { fontSize: 16, fontWeight: "600" },
    itemSubtitle: { color: "#888", fontSize: 14 },
    avatar: { width: 48, height: 48, borderRadius: 24 },
    itemRight: { flexDirection: "row", alignItems: "center", gap: 4 },
    rightLabel: { fontSize: 14, color: "#0055FF" },
    chevron: { fontSize: 18, color: "gray" },
});
