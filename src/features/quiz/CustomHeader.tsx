import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, rightImage, home }: any) => {
    const navigation = useNavigation();

    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 48, padding: 16 }}>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        height: 50,
                        width: 50,
                        backgroundColor: "#fff",
                        borderRadius: 25,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <Text style={{ fontSize: 22, fontWeight: "600", marginLeft: 8 }}>
                    {title ?? "Back"}
                </Text>
            </View>

            {rightImage && (
                <View>
                    <Image
                        source={
                            rightImage ?? require("../../assets/images/imoji/animoji.png")
                        }
                        style={{
                            width: 50,
                            height: 50,
                            backgroundColor: "#fff",
                            borderRadius: 25,
                        }}
                    />
                </View>
            )}
        </View>
    );
};

export default Header;
