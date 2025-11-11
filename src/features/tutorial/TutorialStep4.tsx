import React from "react";
import { Image, ImageBackground, Text, View, StyleSheet } from "react-native";
import Button from "../../components/Button"; // RN CLI path
import Header from "./Header"; // RN CLI path
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/MainStack";
import { colors } from "../../assets/lib";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const Tutorial5: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.background}
        >
            <Header elementNo={5} />

            <View style={styles.container}>
                <Image
                    source={require("../../assets/images/tutorial/5.png")}
                    style={styles.image}
                    resizeMode="contain"
                />

                <View style={styles.textContainer}>
                    <Text style={styles.title}>Unlock a World of Imagination</Text>
                    <Text style={styles.description}>
                        Generate unique stories for your children based on their interests and needs. Spark creativity and important conversations!
                    </Text>
                </View>

                <Button
                    name="Next"
                    textColor="#fff"
                    bgColor={colors.primaryButton}
                    onclick={() => navigation.navigate("TutorialStep5")} // Replace with your next tutorial route
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    image: {
        marginTop: 80,
        width: 250,
        height: 250,
    },
    textContainer: {
        marginVertical: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
    },
    description: {
        fontSize: 14,
        color: "#414651",
        textAlign: "center",
        marginTop: 8,
    },
});

export default Tutorial5;
