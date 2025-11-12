import React, { useEffect, useState } from "react";
import {
    Image,
    ImageBackground,
    Text,
    View,
    StyleSheet,
    Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { toasts } from "../../assets/lib";
import { getTokens } from '../../utils/secureStorage';
// import { getUsers, tokenset } from "@/redux/slices/userSlices";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types"

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SplashScreen: React.FC = () => {
    const [showLoadingBar, setShowLoadingBar] = useState(false);
    const [loadingTimer, setLoadingTimer] = useState(0);

    const dispatch = useDispatch<any>();
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        let timer: any;

        const fetchTokenAndStart = async () => {
            const savedToken: any = await getTokens();

            console.log('savedToken', savedToken)

            setShowLoadingBar(true);

            let elapsed = 0;
            timer = setInterval(async () => {
                setLoadingTimer((prev) => prev + 10);
                elapsed += 10;

                if (elapsed >= 239) {
                    clearInterval(timer);
                    if (savedToken) {
                        navigation.replace("Home");
                    } else {
                        navigation.replace("Login");
                    }
                }
            }, 200);
        };

        fetchTokenAndStart();

        return () => {
            if (timer) clearInterval(timer);
        };
    }, []);

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.container}
        >
            <View style={styles.center}>
                <Image
                    source={require("../../assets/images/onboard/frog.png")}
                    style={styles.image}
                    resizeMode="contain"
                />
                {showLoadingBar && (
                    <View style={styles.loadingWrapper}>
                        <View style={styles.loadingBarBackground}>
                            <View
                                style={[styles.loadingBarProgress, { width: loadingTimer }]}
                            />
                        </View>
                        <Text style={styles.loadingText}>
                            {Math.round((loadingTimer / 239) * 100)}% Loading
                        </Text>
                    </View>
                )}
            </View>
        </ImageBackground>
    );
};

export default SplashScreen;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: { flex: 1 },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    image: { width: 350, height: 350 },
    loadingWrapper: { position: "absolute", bottom: 100, alignItems: "center" },
    loadingBarBackground: {
        width: 239,
        height: 6,
        backgroundColor: "#ededed69",
        borderRadius: 3,
        overflow: "hidden",
    },
    loadingBarProgress: {
        height: 6,
        backgroundColor: "#000000",
        borderRadius: 3,
    },
    loadingText: { marginTop: 8, textAlign: "center", fontSize: 14 },
});
