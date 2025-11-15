import React, { useState } from "react";
import {
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // vector icons
import Header from "../../components/Header";
import Button from "../../components/Button";
import PopUpModal from "../../components/PopUpModal";
import { colors, toasts } from "../../assets/lib";
import {
    useGetConnectedDevicesQuery,
    useLogoutDeviceMutation,
    useLogoutAllDevicesMutation,
} from "../../api/deviceApi";

const lastActiveLabel = (iso: string | null | undefined) => {
    if (!iso) return "Unknown";
    const last = new Date(iso).getTime();
    const now = Date.now();
    const diff = Math.max(0, now - last);

    const mins = Math.floor(diff / (60 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));

    if (mins < 5) return "Active now";
    if (mins < 60) return `${mins} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
};

const ConnectedDevicesScreen = () => {
    const [showModal, setShowModal] = useState(false);

    // RTK Query hooks
    const { data: connectedDevices = [], refetch } = useGetConnectedDevicesQuery();
    const [logoutDevice] = useLogoutDeviceMutation();
    const [logoutAllDevices] = useLogoutAllDevicesMutation();

    const handleLogoutDevice = async (id: number) => {
        try {
            toasts("Device logged out successfully", "success");
            await logoutDevice(id).unwrap();
            refetch();
        } catch (err) {
            toasts("Failed Please try again later. ");
            console.error(err);
        }
    };

    const handleLogoutAll = async () => {
        try {
            toasts("Logged out from all devices successfully", "success");
            await logoutAllDevices().unwrap();
            setShowModal(false);
            refetch();
        } catch (err) {
            toasts("Failed Please try again later. ");
            console.error(err);
        }
    };

    const noDevicesMessage = connectedDevices.length === 0;

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            style={styles.bg}
            resizeMode="cover"
        >
            <Header title="Devices" />

            <ScrollView contentContainerStyle={styles.container}>
                {/* Header Info */}
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Connected Devices</Text>
                    <Text style={styles.headerSubtitle}>
                        These are all the devices currently logged into your account
                    </Text>
                </View>

                {noDevicesMessage ? (
                    <View style={styles.noDeviceContainer}>
                        <Text style={styles.noDeviceText}>No devices connected.</Text>
                    </View>
                ) : (
                    connectedDevices.map((device: any, index: number) => (
                        <View key={index} style={styles.deviceCard}>
                            <View style={styles.deviceRow}>
                                <View style={styles.deviceInfo}>
                                    <Icon
                                        name="phone-portrait-outline"
                                        size={30}
                                        color={colors.primaryButton}
                                        style={{ marginRight: 12 }}
                                    />
                                    <View>
                                        <Text style={styles.deviceName}>
                                            {device.device_name || "Unknown Device"}
                                        </Text>
                                        <Text style={styles.deviceDetails}>
                                            {device.platform} {device.platform ? "•" : ""} {device.location}
                                        </Text>
                                        <Text style={styles.deviceDetails}>
                                            {device.status !== "Active now" && "Last active: "}
                                            <Text style={styles.activeText}>
                                                {lastActiveLabel(device.last_seen_at)}
                                            </Text>
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={() => handleLogoutDevice(device.token_id)}
                                    style={styles.logoutButton}
                                >
                                    <Text style={styles.logoutText}>Log Out</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    bgColor={colors.secondaryTextColor}
                    name="Log Out of all devices"
                    onclick={() => setShowModal(true)}
                />
            </View>

            {showModal && (
                <PopUpModal
                    button1={
                        <Button
                            bgColor={colors.primaryButton}
                            name="No, Keep It"
                            onclick={() => setShowModal(false)}
                        />
                    }
                    button2={
                        <Button
                            bgColor={colors.secondaryTextColor}
                            name="Yes, Log out from all devices"
                            onclick={handleLogoutAll}
                        />
                    }
                    controller={() => setShowModal(false)}
                    image={require("../../assets/images/home/logout.png")}
                    title={"Are you sure you want to Log Out from All Devices?"}
                    description={
                        "You’re about to log out from all devices. You’ll need to log in again to access your account from them."
                    }
                />
            )}
        </ImageBackground>
    );
};

export default ConnectedDevicesScreen;

const styles = StyleSheet.create({
    bg: { flex: 1 },
    container: { padding: 16 },
    headerContainer: { marginBottom: 16 },
    headerTitle: { fontSize: 23, fontWeight: "bold", marginBottom: 4 },
    headerSubtitle: { fontSize: 16, color: "#6b7280" },
    noDeviceContainer: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 50 },
    noDeviceText: { fontSize: 18, color: "#6b7280" },
    deviceCard: { backgroundColor: "#fff", padding: 16, marginBottom: 12, borderRadius: 12, borderWidth: 1, borderColor: "#ddd" },
    deviceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    deviceInfo: { flexDirection: "row", flex: 1, alignItems: "center" },
    deviceName: { fontSize: 16, fontWeight: "600" },
    deviceDetails: { fontSize: 14, color: "#6b7280", marginTop: 2 },
    activeText: { color: "#2563eb", marginLeft: 4 },
    logoutButton: { backgroundColor: "#4b5563", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 25 },
    logoutText: { color: "#fff" },
    footer: { padding: 16 },
});
