import React from "react";
import { StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";
import PopUpModal from "../../components/PopUpModal";
import Button from "../../components/Button";
import { colors } from "../../assets/lib";
import { clearTokens } from "../../utils/secureStorage";
import { useDispatch } from "react-redux";
import { logout } from "../auth/authSlice";

interface ExitExpandProps {
    setShowExit: (val: boolean) => void;
}

const ExitExpand: React.FC<ExitExpandProps> = ({ setShowExit }) => {

    const dispatch = useDispatch<any>();

    const _logoutPress = async () => {

        await clearTokens()
        dispatch(logout())

        setShowExit(false)
    }


    return (
        <BlurView
            style={styles.blurContainer}
            blurType="dark"
            blurAmount={4}
            reducedTransparencyFallbackColor="black"
        >
            <PopUpModal
                image={require("../../assets/images/home/logout.png")}
                title="Are you sure you want to Log Out from This Device?"
                description="You’re about to log out from this device. You’ll need to log in again to access your account from it."
                style={{ backgroundColor: "transparent" }}
                button1={
                    <Button
                        onclick={() => _logoutPress()}
                        name="Yes, Log out"
                        textColor="#ffffff"
                        bgColor={colors.secondaryTextColor}
                        loading={false}
                    />
                }
                button2={
                    <Button
                        onclick={() => setShowExit(false)}
                        name="Cancel"
                        textColor="#ffffff"
                        bgColor={colors.primaryButton}
                        loading={false}
                    />
                }
            />
        </BlurView>
    );
};

const styles = StyleSheet.create({
    blurContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ExitExpand;
