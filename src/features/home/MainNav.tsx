import React, { useState } from "react";
import {
    View,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import NavExpand from "./NavExpand";
import ExitExpand from "./ExitModal";

interface MainNavProps {
    screen: "home" | "emotional" | "profile";
}

const MainNav: React.FC<MainNavProps> = ({ screen }) => {
    const [showNav, setShowNav] = useState(false);
    const [exitNav, setExitNav] = useState(false);
    const navigation = useNavigation();

    return (
        <>
            <View style={styles.container}>
                <ImageBackground
                    source={require("../../assets/images/home/navbg.png")}
                    resizeMode="stretch"
                    style={styles.imageBackground}
                >
                    {/* Home Button */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home" as never)}
                        style={[
                            styles.navButton,
                            screen === "home" ? styles.activeButton : styles.inactiveButton,
                        ]}
                    >
                        <Ionicons
                            name="home-outline"
                            size={24}
                            color={screen === "home" ? "#fff" : "#000"}
                        />
                    </TouchableOpacity>

                    {/* Emotional Button */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Emotional" as never)}
                        style={[
                            styles.navButton,
                            screen === "emotional"
                                ? styles.activeButton
                                : styles.inactiveButton,
                        ]}
                    >
                        <Ionicons
                            name="book-outline"
                            size={24}
                            color={screen === "emotional" ? "#fff" : "#000"}
                        />
                    </TouchableOpacity>

                    {/* Profile Button */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Profile" as never)}
                        style={[
                            styles.navButton,
                            screen === "profile" ? styles.activeButton : styles.inactiveButton,
                        ]}
                    >
                        <Ionicons
                            name="settings-outline"
                            size={24}
                            color={screen === "profile" ? "#fff" : "#000"}
                        />
                    </TouchableOpacity>

                    {/* Add Button */}
                    <TouchableOpacity
                        onPress={() => setShowNav(true)}
                        style={[styles.navButton, styles.inactiveButton]}
                    >
                        <Ionicons name="add" size={24} color="black" />
                    </TouchableOpacity>
                </ImageBackground>
            </View>

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
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        zIndex: 99999,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },
    imageBackground: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 80,
        width: 322,
        paddingHorizontal: 4,
    },
    navButton: {
        width: 74,
        height: 74,
        borderRadius: 37,
        alignItems: "center",
        justifyContent: "center",
    },
    activeButton: {
        backgroundColor: "#000",
    },
    inactiveButton: {
        backgroundColor: "#fff",
    },
});

export default MainNav;
