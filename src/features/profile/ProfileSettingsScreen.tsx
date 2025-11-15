import React from "react";
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../components/Header"; // Adjust path if needed
import Connect from "./svgs/Connect";
import Info from "./svgs/Info";
import Password from "./svgs/Password";
import Privacy from "./svgs/Privacy";
import { RootState } from "../../app/store";

const settingsData = [
    {
        title: "Account Management",
        items: [
            {
                icon: <Password />,
                label: "Change your Password",
                route: "ComingSoonScreen", // Update route if using react-navigation
                rightLabel: "ComingSoonScreen",
            },
            {
                icon: <Privacy />,
                label: "Two-Factor Authentication",
                rightLabel: "Premium",
                route: "ComingSoonScreen",
            },
            {
                icon: <Connect />,
                label: "Connected Devices",
                route: "ConnectedDevicesScreen",
                rightLabel: "ConnectedDevicesScreen",
            },
            {
                icon: <Info />,
                label: "Account Information",
                rightLabel: "Premium",
                route: "AboutScreen"
            },
        ],
    },
];

interface Props {
    navigation: any;
}

const ProfileSettingsScreen: React.FC<Props> = ({ navigation }) => {
    const users = useSelector((state: RootState) => state.root.auth.user);

    const userProfile = {
        name: users?.first_name ?? "No Name",
        email: users?.email ?? "No email found",
        profilePicture:
            "https://cdn-icons-png.flaticon.com/512/149/149071.png", // Replace with actual profile picture
    };

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            style={styles.bg}
            resizeMode="cover"
        >
            <Header title="Account" />

            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                {/* Profile Section */}
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: userProfile.profilePicture }}
                        style={styles.profilePic}
                    />
                    <View style={styles.nameEmailContainer}>
                        <Text style={styles.name}>{userProfile.name}</Text>
                        <Text style={styles.email}>{userProfile.email}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => navigation.navigate("AccountEdit")}
                        disabled={true}
                    >
                        <Ionicons name="create-outline" size={20} color="#fff" />
                        <Text style={styles.editText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Settings List */}
                {settingsData.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.sectionContainer}>
                        {section.items.map((item: any, itemIndex) => (
                            <TouchableOpacity
                                key={itemIndex}
                                style={[
                                    styles.itemContainer,
                                    itemIndex !== section.items.length - 1
                                        ? styles.itemBorder
                                        : null,
                                ]}
                                onPress={() =>
                                    item.route && navigation.navigate(item.route as any)
                                }
                            >
                                <View style={styles.itemLeft}>
                                    {item.icon}
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={styles.itemLabel}>{item.label}</Text>
                                        {item.subtitle && (
                                            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                                        )}
                                    </View>
                                </View>
                                {item.rightLabel && (
                                    <Ionicons name="chevron-forward" size={20} color="gray" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}

                {/* Bottom Image */}
                <Image
                    source={require("../../assets/images/profile/bottom1.png")}
                    style={styles.bottomImage}
                    resizeMode="cover"
                />
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
    profileContainer: {
        padding: 16,
        alignItems: "center",
    },
    profilePic: {
        width: 96,
        height: 96,
        borderRadius: 48,
    },
    nameEmailContainer: {
        marginTop: 8,
        alignItems: "center",
    },
    name: {
        fontSize: 28,
        fontWeight: "600",
    },
    email: {
        fontSize: 16,
        color: "#6b7280",
        marginTop: 2,
    },
    editButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#14b8a6",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 25,
        marginTop: 12,
    },
    editText: {
        color: "#fff",
        fontWeight: "600",
        marginLeft: 6,
    },
    sectionContainer: {
        backgroundColor: "#fff",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#f5f5f5",
        marginTop: 16,
        paddingVertical: 4,
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 14,
    },
    itemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    itemLabel: {
        fontSize: 16,
        fontWeight: "500",
    },
    itemSubtitle: {
        fontSize: 14,
        color: "#6b7280",
    },
    bottomImage: {
        width: "100%",
        height: 150,
        marginTop: 20,
    },
});

export default ProfileSettingsScreen;
