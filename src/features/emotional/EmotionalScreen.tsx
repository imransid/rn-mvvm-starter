import React from "react";
import { ImageBackground, View, StyleSheet } from "react-native";

import MainNav from "../home/MainNav";
import Header from "./components/Header";
import Story from "./components/Story";
import Posts from "./components/Posts";

const Index = () => {
    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.container}
        >
            <Header title="Emotional Journal" home={true} />

            <View style={styles.content}>
                <Story />
                <Posts showbutton={true} />
            </View>

            <MainNav screen="emotional" />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
});

export default Index;
