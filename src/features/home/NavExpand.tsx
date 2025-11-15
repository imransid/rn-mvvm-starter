import React, { useState } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import PopUpModal from "../../components/PopUpModal";
import Button from "../../components/Button";
import { colors } from "../../assets/lib";

interface NavExpandProps {
    setshowNav: (val: boolean) => void;
    setExitNav: (val: boolean) => void;
}

const NavExpand: React.FC<NavExpandProps> = ({ setshowNav, setExitNav }) => {
    const [showModal, setshowModal] = useState(false);
    const navigation = useNavigation();

    const ButtonAction = () => {
        return (
            <View>
                <View style={{
                    position: "absolute",
                    right: -140,
                    top: 100,
                }}>
                    <TouchableOpacity
                        onPress={() => setExitNav(false)}

                        style={styles.estonBlueCircle}
                    >
                        <Svg
                            x="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <Path
                                d="M14.75 0.75L0.75 14.75M0.75 0.75L14.75 14.75"
                                stroke="#FDFDFD"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>
                <View style={styles.positionedItemRM}>
                    <TouchableOpacity
                        onPress={() => {
                            setshowNav(false);
                            //router.push("/recommendation/home");
                        }}
                        style={styles.whiteCircleRM}
                    >
                        <Svg
                            x="http://www.w3.org/2000/svg"
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                        >
                            <Path
                                d="M0.75 10.25C0.75 5.77166 0.75 3.53249 2.14124 2.14124C3.53249 0.75 5.77166 0.75 10.25 0.75C14.7283 0.75 16.9675 0.75 18.3588 2.14124C19.75 3.53249 19.75 5.77166 19.75 10.25C19.75 14.7283 19.75 16.9675 18.3588 18.3588C16.9675 19.75 14.7283 19.75 10.25 19.75C5.77166 19.75 3.53249 19.75 2.14124 18.3588C0.75 16.9675 0.75 14.7283 0.75 10.25Z"
                                stroke="#141B34"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                            <Path
                                d="M11.1138 5.97209L11.9937 7.74644C12.1137 7.99344 12.4337 8.23035 12.7036 8.27572L14.2985 8.54288C15.3184 8.71426 15.5583 9.4603 14.8234 10.1962L13.5835 11.4464C13.3736 11.6581 13.2586 12.0664 13.3236 12.3587L13.6785 13.9062C13.9585 15.1312 13.3136 15.605 12.2387 14.9648L10.7439 14.0726C10.4739 13.9113 10.0289 13.9113 9.75397 14.0726L8.25913 14.9648C7.18925 15.605 6.53932 15.1261 6.81929 13.9062L7.17425 12.3587C7.23925 12.0664 7.12426 11.6581 6.91428 11.4464L5.67442 10.1962C4.9445 9.4603 5.17947 8.71426 6.19936 8.54288L7.79419 8.27572C8.05916 8.23035 8.37912 7.99344 8.49911 7.74644L9.37901 5.97209C9.85896 5.0093 10.6389 5.0093 11.1138 5.97209Z"
                                stroke="#141B34"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </TouchableOpacity>
                    <Text style={styles.labelTextRM}>
                        Recommendation
                    </Text>
                </View>
                <View style={styles.positionBoxLogOut}>
                    <TouchableOpacity
                        onPress={() => setshowNav(true)}
                        style={styles.circleButtonLogout}
                    >
                        <Svg
                            x="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <Path
                                d="M12.75 15.375C12.6764 17.2269 11.1331 18.7994 9.06564 18.7488C8.58465 18.737 7.99013 18.5694 6.80112 18.234C3.93961 17.4268 1.45555 16.0703 0.859555 13.0315C0.75 12.473 0.75 11.8444 0.75 10.5873L0.75 8.91274C0.75 7.65561 0.75 7.02705 0.859556 6.46846C1.45555 3.42965 3.93961 2.07316 6.80112 1.26603C7.99014 0.930645 8.58465 0.762954 9.06564 0.751187C11.1331 0.70061 12.6764 2.27307 12.75 4.12501"
                                stroke="#EFFAFF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                            <Path
                                d="M18.75 9.75H7.75M18.75 9.75C18.75 9.04977 16.7557 7.74153 16.25 7.25M18.75 9.75C18.75 10.4502 16.7557 11.7585 16.25 12.25"
                                stroke="#EFFAFF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </TouchableOpacity>
                    <Text style={styles.labelTextLogout}>
                        Log out
                    </Text>
                </View>
                <View style={styles.floatingBoxQuiz}>
                    <TouchableOpacity
                        onPress={() => {
                            setExitNav(false);
                            navigation.navigate("QuizHome" as never)
                        }}
                        style={styles.circleButtonQuiz}
                    >
                        <Svg
                            x="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <Path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13 0H3C2.20508 0.00237409 1.4434 0.319207 0.881302 0.881302C0.319207 1.4434 0.00237409 2.20508 0 3L0 16.99C0.00237409 17.7849 0.319207 18.5466 0.881302 19.1087C1.4434 19.6708 2.20508 19.9876 3 19.99H13C13.7949 19.9876 14.5566 19.6708 15.1187 19.1087C15.6808 18.5466 15.9976 17.7849 16 16.99V3C15.9976 2.20508 15.6808 1.4434 15.1187 0.881302C14.5566 0.319207 13.7949 0.00237409 13 0ZM14 16.99C13.9959 17.2539 13.8892 17.5059 13.7025 17.6925C13.5159 17.8792 13.2639 17.9859 13 17.99H3C2.73607 17.9859 2.48411 17.8792 2.29746 17.6925C2.11081 17.5059 2.00412 17.2539 2 16.99V3C2.00412 2.73607 2.11081 2.48411 2.29746 2.29746C2.48411 2.11081 2.73607 2.00412 3 2H13C13.549 2.009 13.991 2.451 14 3V16.99Z"
                                fill="#181D27"
                            />
                            <Path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M20 7V21C19.9976 21.7949 19.6808 22.5566 19.1187 23.1187C18.5566 23.6808 17.7949 23.9976 17 24H5C4.73478 24 4.48043 23.8946 4.29289 23.7071C4.10536 23.5196 4 23.2652 4 23C4 22.7348 4.10536 22.4804 4.29289 22.2929C4.48043 22.1054 4.73478 22 5 22H17C17.2639 21.9959 17.5159 21.8892 17.7025 21.7025C17.8892 21.5159 17.9959 21.2639 18 21V7C18 6.73478 18.1054 6.48043 18.2929 6.29289C18.4804 6.10536 18.7348 6 19 6C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7Z"
                                fill="#181D27"
                            />
                            <Path
                                d="M8 16C8.55228 16 9 15.5523 9 15C9 14.4477 8.55228 14 8 14C7.44772 14 7 14.4477 7 15C7 15.5523 7.44772 16 8 16Z"
                                fill="#181D27"
                            />
                            <Path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 8C12.0007 8.88662 11.7062 9.74825 11.163 10.449C10.6198 11.1497 9.85881 11.6497 9 11.87V12C9 12.2652 8.89464 12.5196 8.70711 12.7071C8.51957 12.8946 8.26522 13 8 13C7.73478 13 7.48043 12.8946 7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12V11C7 10.7348 7.10536 10.4804 7.29289 10.2929C7.48043 10.1054 7.73478 10 8 10C8.39556 10 8.78224 9.8827 9.11114 9.66294C9.44004 9.44318 9.69638 9.13082 9.84776 8.76537C9.99913 8.39991 10.0387 7.99778 9.96157 7.60982C9.8844 7.22186 9.69392 6.86549 9.41421 6.58579C9.13451 6.30608 8.77814 6.1156 8.39018 6.03843C8.00222 5.96126 7.60009 6.00087 7.23463 6.15224C6.86918 6.30362 6.55682 6.55996 6.33706 6.88886C6.1173 7.21776 6 7.60444 6 8C6 8.26522 5.89464 8.51957 5.70711 8.70711C5.51957 8.89464 5.26522 9 5 9C4.73478 9 4.48043 8.89464 4.29289 8.70711C4.10536 8.51957 4 8.26522 4 8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4C9.06087 4 10.0783 4.42143 10.8284 5.17157C11.5786 5.92172 12 6.93913 12 8Z"
                                fill="#181D27"
                            />
                        </Svg>
                    </TouchableOpacity>
                    <Text style={styles.labelQuizText}>
                        Quiz
                    </Text>
                </View>
                <View style={styles.examplePosition}>
                    <TouchableOpacity
                        onPress={() => {
                            setshowNav(false);
                            // router.push("/stories");
                        }}
                        style={styles.whiteCircleButton}
                    >
                        <Svg
                            x="http://www.w3.org/2000/svg"
                            width="22"
                            height="20"
                            viewBox="0 0 22 20"
                            fill="none"
                        >
                            <Path
                                d="M0.75 9.75C0.75 5.50736 0.75 3.38604 2.06802 2.06802C3.38604 0.75 5.50736 0.75 9.75 0.75H11.75C15.9926 0.75 18.114 0.75 19.432 2.06802C20.75 3.38604 20.75 5.50736 20.75 9.75C20.75 13.9926 20.75 16.114 19.432 17.432C18.114 18.75 15.9926 18.75 11.75 18.75H9.75C5.50736 18.75 3.38604 18.75 2.06802 17.432C0.75 16.114 0.75 13.9926 0.75 9.75Z"
                                stroke="#181D27"
                                strokeWidth="1.5"
                            />
                            <Path
                                d="M10.9293 13.1238L10.7724 12.3903H10.7724L10.9293 13.1238ZM9.87625 12.0707L10.6097 12.2276L9.87625 12.0707ZM10.6431 9.84775L10.1128 9.31742H10.1128L10.6431 9.84775ZM16.5717 7.54263L17.2212 7.16763L16.5717 7.54263ZM16.5717 8.87331L17.2212 9.24831L16.5717 8.87331ZM15.4574 6.42828L15.8324 5.77876V5.77876L15.4574 6.42828ZM13.5374 6.95339L14.0678 7.48372L13.5374 6.95339ZM14.1267 6.42828L13.7517 5.77876V5.77876L14.1267 6.42828ZM16.0466 9.46255L15.5163 8.93222L12.6219 11.8266L13.1522 12.3569L13.6826 12.8872L16.5769 9.99288L16.0466 9.46255ZM10.6431 9.84775L11.1734 10.3781L14.0678 7.48372L13.5374 6.95339L13.0071 6.42306L10.1128 9.31742L10.6431 9.84775ZM10.9293 13.1238L10.7724 12.3903C10.6185 12.4232 10.4972 12.4491 10.3933 12.4684C10.2883 12.488 10.2229 12.4965 10.1812 12.4992C10.138 12.5019 10.1522 12.4959 10.1956 12.5071C10.2515 12.5215 10.3228 12.5558 10.3835 12.6165L9.85316 13.1468L9.32283 13.6772C9.63443 13.9888 10.022 14.0123 10.2764 13.9961C10.5173 13.9808 10.8086 13.9165 11.0861 13.8572L10.9293 13.1238ZM9.87625 12.0707L9.14282 11.9139C9.08348 12.1914 9.01917 12.4827 9.00385 12.7236C8.98768 12.978 9.01122 13.3656 9.32283 13.6772L9.85316 13.1468L10.3835 12.6165C10.4442 12.6772 10.4785 12.7485 10.4929 12.8044C10.5041 12.8478 10.4981 12.862 10.5008 12.8188C10.5035 12.7771 10.512 12.7117 10.5316 12.6067C10.5509 12.5028 10.5768 12.3815 10.6097 12.2276L9.87625 12.0707ZM16.0466 6.95339L15.5163 7.48372C15.8421 7.80955 15.8964 7.87298 15.9222 7.91763L16.5717 7.54263L17.2212 7.16763C17.0718 6.90885 16.8345 6.6806 16.5769 6.42306L16.0466 6.95339ZM16.0466 9.46255L16.5769 9.99288C16.8345 9.73535 17.0718 9.5071 17.2212 9.24831L16.5717 8.87331L15.9222 8.49831C15.8964 8.54297 15.8421 8.6064 15.5163 8.93222L16.0466 9.46255ZM16.5717 7.54263L15.9222 7.91763C16.0259 8.0973 16.0259 8.31865 15.9222 8.49831L16.5717 8.87331L17.2212 9.24831C17.5929 8.60455 17.5929 7.8114 17.2212 7.16763L16.5717 7.54263ZM16.0466 6.95339L16.5769 6.42306C16.3194 6.16553 16.0912 5.92817 15.8324 5.77876L15.4574 6.42828L15.0824 7.0778C15.127 7.10358 15.1905 7.1579 15.5163 7.48372L16.0466 6.95339ZM13.5374 6.95339L14.0678 7.48372C14.3936 7.1579 14.457 7.10358 14.5017 7.0778L14.1267 6.42828L13.7517 5.77876C13.4929 5.92817 13.2647 6.16553 13.0071 6.42306L13.5374 6.95339ZM15.4574 6.42828L15.8324 5.77876C15.1886 5.40708 14.3955 5.40708 13.7517 5.77876L14.1267 6.42828L14.5017 7.0778C14.6813 6.97407 14.9027 6.97407 15.0824 7.0778L15.4574 6.42828ZM13.1522 12.3569L12.6219 11.8266C12.4677 11.9808 12.2523 12.0857 11.9279 12.1686C11.7653 12.2101 11.5909 12.2424 11.3933 12.2766C11.2045 12.3092 10.9842 12.345 10.7724 12.3903L10.9293 13.1238L11.0861 13.8572C11.2603 13.8199 11.4386 13.7909 11.6487 13.7547C11.8499 13.7199 12.0746 13.6792 12.299 13.622C12.7485 13.5072 13.2586 13.3113 13.6826 12.8872L13.1522 12.3569ZM9.87625 12.0707L10.6097 12.2276C10.655 12.0158 10.6908 11.7955 10.7234 11.6067C10.7576 11.4091 10.7899 11.2347 10.8314 11.0721C10.9143 10.7477 11.0192 10.5323 11.1734 10.3781L10.6431 9.84775L10.1128 9.31742C9.68875 9.74143 9.4928 10.2515 9.37804 10.701C9.32075 10.9254 9.28011 11.1501 9.24534 11.3513C9.20905 11.5614 9.18008 11.7397 9.14282 11.9139L9.87625 12.0707Z"
                                fill="#181D27"
                            />
                            <Path
                                d="M5.25 0.75V18.75"
                                stroke="#181D27"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </TouchableOpacity>
                    <Text style={styles.labelNewStory}>
                        New Story
                    </Text>
                </View>
            </View>

        )
    }

    return (
        <>
            <BlurView
                style={styles.blurContainer}
                blurType="dark"
                blurAmount={4}
                reducedTransparencyFallbackColor="black"
            >
                <ButtonAction />
            </BlurView>
        </>


    );
};

const styles = StyleSheet.create({
    blurContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 999999,
        justifyContent: "center",
        alignItems: "center",
    },
    absoluteButton: {
        position: "absolute",
    },
    circleButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    labelRecommendation: {
        position: "absolute",
        bottom: -25,
        left: -23,
        width: 120,
        color: "#fff",
        textAlign: "center",
    },
    labelNewStory: {
        color: '#fff',
        position: 'absolute',
        left: 0,
        bottom: -25,
        width: 90,
        textAlign: 'center', // optional if you want centered text
    },
    examplePosition: {
        position: 'absolute',
        right: -35,
        top: 25,
    },
    whiteCircleButton: {
        backgroundColor: 'white',
        width: 64,
        height: 64,
        borderRadius: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelQuizText: {
        color: 'white',
        position: 'absolute',
        left: 16,
        bottom: -25,
        width: 50,
    },
    circleButtonQuiz: {
        backgroundColor: 'white',
        width: 64,
        height: 64,
        borderRadius: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatingBoxQuiz: {
        position: 'absolute',
        right: -35,
        top: 165,
    },
    labelTextLogout: {
        color: '#FFFFFF',   // text-white
        position: 'absolute',
        left: 6,
        bottom: -25,
        width: 50,
    },
    circleButtonLogout: {
        backgroundColor: '#F4978E',
        width: 64,
        height: 64,
        borderRadius: 32,   // half of width/height
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    positionBoxLogOut: {
        position: 'absolute',
        right: -140,
        top: 225,
    },
    labelTextRM: {
        color: '#FFFFFF',
        position: 'absolute',
        left: -23,
        bottom: -25,
        width: 120,
    },
    whiteCircleRM: {
        backgroundColor: '#FFFFFF',
        width: 64,
        height: 64,
        borderRadius: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    positionedItemRM: {
        position: 'absolute',
        right: -140,
        top: -40,
    },
    estonBlueCircle: {
        backgroundColor: '#1AA7A9', // ← replace with your estonBlue color
        width: 64,
        height: 64,
        borderRadius: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default NavExpand;
