import React from "react";
import { Image, StyleSheet, Text, View, Modal } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../Button";
import { colors } from "../../assets/lib";

interface PopUpModalProps {
    image?: any;
    title?: string;
    description?: string;
    controller?: () => void;
    button1?: React.ReactNode;
    button2?: React.ReactNode;
    style?: any;
}

const PopUpModal: React.FC<PopUpModalProps> = ({
    image,
    title,
    description,
    controller,
    button1,
    button2,
    style,
}) => {
    return (
        <Modal transparent animationType="fade" visible>
            <View style={[styles.overlay, style]}>
                <View style={styles.modalBox}>
                    <View style={styles.content}>
                        <View style={styles.imageWrapper}>
                            <Image
                                source={
                                    image ?? require("../../assets/images/login/popup.png")
                                }
                                style={styles.image}
                                resizeMode="contain"
                            />
                        </View>

                        <Text style={styles.title}>{title ?? "Check Your Email"}</Text>
                        <Text style={styles.description}>
                            {description ??
                                "Your order has been successfully placed. You successfully completed the profile verification process."}
                        </Text>
                    </View>

                    {button1 ? (
                        button1
                    ) : (
                        <Button
                            onclick={controller}
                            name="Done"
                            textColor="#fff"
                            bgColor={colors.primaryButton}
                            loading={false}
                        />
                    )}

                    {button2 && <View style={styles.extraButton}>{button2}</View>}
                </View>
            </View>
        </Modal>
    );
};

export default PopUpModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.42)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        backgroundColor: "#fff",
        width: "90%",
        borderRadius: 16,
        padding: 20,
    },
    content: {
        alignItems: "center",
        marginBottom: 24,
        paddingTop: 8,
    },
    imageWrapper: {
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 12,
    },
    image: {
        width: 80,
        height: 80,
    },
    title: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "600",
        color: "#000",
        marginBottom: 6,
    },
    description: {
        textAlign: "center",
        fontSize: 13,
        color: "#6b6b6b",
        paddingHorizontal: 10,
    },
    extraButton: {
        marginTop: 10,
    },
});
