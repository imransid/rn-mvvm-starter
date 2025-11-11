
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const Header = ({ title, rightImage }: any) => {
    return (
        <View className="flex-row items-center justify-between mt-12 p-4">
            <View className=" flex-row items-center ">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="h-[50px] w-[50px] bg-white rounded-full flex-row items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-[20px] font-semibold ml-2">
                    {title ?? "Back"}
                </Text>
            </View>
            {rightImage && (
                <Image
                    className="h-[50px] w-[50px] bg-white rounded-full flex-row items-center justify-center"
                    source={
                        rightImage ?? require("../../assets/images/imoji/animoji.png")
                    }
                />
            )}
        </View>
    );
};

export default Header;
