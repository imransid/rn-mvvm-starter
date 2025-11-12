import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { useSelector } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import Button from "../../components/Button";
import { colors } from "../../assets/lib";
import { useNavigation } from "@react-navigation/native";

interface TipsProps {
    activity: boolean;
    name: string;
}

const Tips: React.FC<TipsProps> = ({ activity, name }) => {
    const navigation = useNavigation<any>();

    const recommendation_advice: any = []

    // useSelector(
    //     (state: any) => state.recommendations.recommendation_advice
    // );

    const recommendation_activity: any = []
    // useSelector(
    //     (state: any) => state.recommendations.recommendation_activity
    // );

    const data =
        name === "advice" ? recommendation_advice : recommendation_activity;

    return (
        <View style={{ marginTop: 16 }}>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View
                        style={{
                            backgroundColor: "#fff",
                            padding: 16,
                            borderRadius: 12,
                            width: 260,
                            marginLeft: 16,
                            shadowColor: "#000",
                            shadowOpacity: 0.1,
                            shadowRadius: 5,
                            elevation: 3,
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image
                                source={require("../../assets/images/home/yoga.png")}
                                style={{ width: 40, height: 40, resizeMode: "contain" }}
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "500",
                                    marginLeft: 8,
                                    flex: 1,
                                }}
                            >
                                {item?.title || "Breathing Butterfly"}
                            </Text>
                        </View>

                        <Text
                            style={{
                                color: "#555",
                                marginTop: 8,
                                marginBottom: 8,
                            }}
                        >
                            {item?.description ||
                                "Guide your child through a calming breathing exercise"}
                        </Text>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Feather name="clock" size={20} color={colors.primaryTextColor} />
                            <Text
                                style={{
                                    color: colors.primaryButton,
                                    fontSize: 16,
                                    marginLeft: 5,
                                }}
                            >
                                30 mins
                            </Text>
                        </View>

                        <View style={{ width: "70%", marginTop: 20 }}>
                            <Button
                                name={activity ? "View Activity" : "Read More"}
                                onclick={() =>
                                    navigation.navigate(
                                        activity ? "RecommendationDetails" : "RecommendationTips"
                                    )
                                }
                                bgColor={colors.primaryButton}
                                textColor="#fff"
                            />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default Tips;
