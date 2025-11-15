import React from "react";
import { Image, ImageBackground, Text, View, StyleSheet } from "react-native";
import Button from "../../components/Button"; // RN CLI path
import Header from "./Header"; // RN CLI path
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/MainStack";
import { colors } from "../../assets/lib";
import { useDispatch } from "react-redux";
import { setTutorialStatus } from "../auth/authSlice";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const Tutorial6: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const dispatch = useDispatch<any>();
    const onClick = () => {

        dispatch(setTutorialStatus())
        //  we can save if want
        navigation.navigate("Home")
    }

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.background}
        >
            <Header elementNo={6} />

            <View style={styles.container}>
                <Image
                    source={require("../../assets/images/tutorial/6.png")}
                    style={styles.image}
                    resizeMode="contain"
                />

                <View style={styles.textContainer}>
                    <Text style={styles.title}>You're All Set!</Text>
                    <Text style={styles.description}>
                        You've learned the basics. Now it's time to dive in and start your ZenFamy journey!
                    </Text>
                </View>

                <Button
                    name="Go to dashboard"
                    textColor="#fff"
                    bgColor={colors.primaryButton}
                    onclick={() => onClick()}
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

export default Tutorial6;
