import { colors } from "../../assets/lib";
import Button from "../../components/Button";
import React from "react";
import { Image, ImageBackground, Text, View, StyleSheet } from "react-native";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/MainStack";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const TutorialStep2: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.background}
        >
            <Header elementNo={2} />
            <View style={styles.container}>
                <Image
                    source={require("../../assets/images/tutorial/2.png")}
                    style={styles.image}
                    resizeMode="contain"
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Set Up Your Family & Child Profiles</Text>
                    <Text style={styles.description}>
                        Personalize ZenFamy by adding profiles for your children. This helps
                        us tailor stories and activities just for them!
                    </Text>
                </View>

                <Button
                    name="Next"
                    textColor="#fff"
                    bgColor={colors.primaryButton}
                    onclick={() => navigation.navigate("TutorialStep2")}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center",
    },
    image: {
        marginTop: 80,
        width: 250,
        height: 250,
    },
    textContainer: {
        marginVertical: 24,
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },
    description: {
        fontSize: 13,
        color: "#414651",
        textAlign: "center",
        marginVertical: 16,
        paddingBottom: 40,
    },
});

export default TutorialStep2;
