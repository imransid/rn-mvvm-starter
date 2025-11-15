import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

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

const SettingsScreen = () => {
    const [showNav, setShowNav] = useState(false);
    const [isNotifOn, setIsNotifOn] = useState(false);
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [languageCode, setLanguageCode] = useState("");

    const [exitNav, setExitNav] = useState(false);

    const dispatch = useDispatch();
    const navigation = useNavigation<any>();

    const users = useSelector((state: RootState) => state.root.auth.user);
    // const { family, loading } = useSelector((state: any) => state.family);
    // const { subscriptions } = useSelector((state: any) => state.subscriptions);

    const family: any = []
    const subscriptions = []
    const loading = false

    // const getMyFamily = async () => {
    //     try {
    //         await dispatch(myFamily()).unwrap();
    //     } catch (err) {
    //         console.log("Family error:", err);
    //     }
    // };

    // useEffect(() => {
    //     getMyFamily();
    //     dispatch(listMySubscriptions());
    // }, [dispatch]);

    const logout = async () => {
        await AsyncStorage.removeItem("access_token");
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
                    route: "Account",
                },
                {
                    icon: <Female />,
                    label: "Children Profiles",
                    route: "Children",
                },
                {
                    icon: loading ? <Text>⏳</Text> : <Family />,
                    label: "Family Profile",
                    route: family?.family_id ? "FamilyProfileDetail" : "FamilyProfile",
                },
                {
                    icon: <Subscription />,
                    label: "Subscription",
                    rightLabel: subscriptions.length > 0 ? "Premium" : undefined,
                    route: subscriptions.length > 0 ? "MyPlan" : "Subscription",
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
                    <TouchableOpacity style={styles.logoutContainer} onPress={logout}>
                        <Text style={styles.logoutIcon}>🚪</Text>
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
