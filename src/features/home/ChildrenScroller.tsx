import React, { useMemo, useCallback } from "react";
import {
    FlatList,
    Image,
    ImageSourcePropType,
    ListRenderItem,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useGetMyChildrenQuery } from "../../api/childrenApi";

// ---- Types ----
interface Child {
    id: string | number;
    first_name: string;
    avatarUrl?: string;
}

interface Colors {
    primaryTextColor: string;
}

interface Props {
    onPressChild?: (child: Child) => void;
    colors: Colors;
}

// ---- Component ----
const ChildrenScroller: React.FC<Props> = ({ onPressChild, colors }) => {
    const navigation = useNavigation();

    // RTK Query hook
    const { data: children, isLoading, isError } = useGetMyChildrenQuery();


    console.log('data', children)

    const fallbackAvatar = useMemo<ImageSourcePropType>(
        () => require("../../assets/images/imoji/animoji.png"),
        []
    );

    const handlePress = useCallback(
        (child: Child) => {
            onPressChild?.(child);
        },
        [onPressChild]
    );

    const keyExtractor = useCallback(
        (item: Child, index: number) => String(item.id ?? `idx-${index}`),
        []
    );

    const renderItem = useCallback<ListRenderItem<Child>>(
        ({ item }) => {
            const source: ImageSourcePropType = item.avatarUrl
                ? { uri: item.avatarUrl }
                : fallbackAvatar;

            return (
                <TouchableOpacity
                    style={{ alignItems: "center", padding: 16 }}
                    onPress={() => handlePress(item)}
                    activeOpacity={0.8}
                >
                    <Image
                        source={source}
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: 32,
                            borderWidth: 3,
                            borderColor: colors.primaryTextColor,
                            backgroundColor: "#fff",
                        }}
                    />
                    <Text
                        style={{ fontSize: 14, fontWeight: "500", color: "#0A0D12", marginTop: 4 }}
                        numberOfLines={1}
                    >
                        {item.first_name ?? "—"}
                    </Text>
                </TouchableOpacity>
            );
        },
        [fallbackAvatar, colors.primaryTextColor, handlePress]
    );

    const getItemLayout = useCallback(
        (_data: ArrayLike<Child> | null | undefined, index: number) => {
            const length = 96; // 64px image + padding
            return { length, offset: length * index, index };
        },
        []
    );


    // ---- Loading state ----
    if (isLoading) {
        return (
            <View style={{ paddingVertical: 24, alignItems: "center" }}>
                <ActivityIndicator size="large" color={colors.primaryTextColor} />
                <Text style={{ marginTop: 8, color: "#0A0D12" }}>Loading children...</Text>
            </View>
        );
    }

    // ---- Error / Empty state ----
    if (isError || !children?.length) {
        return (
            <View style={{ marginTop: -72, paddingHorizontal: 16, alignItems: "center", paddingVertical: 24 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ChildCreate" as never)}
                    style={{ alignItems: "center", padding: 16 }}
                >
                    <View
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: 32,
                            borderWidth: 1,
                            borderColor: colors.primaryTextColor,
                            backgroundColor: "#fff",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Icon name="add" size={34} color="#252525" />
                    </View>
                </TouchableOpacity>
                <Text style={{ color: "#0A0D12", fontSize: 16, marginTop: 8 }}>
                    {isError ? "Failed to load children" : "No children yet!"}
                </Text>
            </View>
        );
    }

    // ---- Render list ----
    return (
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: -70 }}>
            {/* Add button */}
            <TouchableOpacity
                onPress={() => navigation.navigate("ChildCreate" as never)}
                style={{ alignItems: "center", padding: 16 }}
            >
                <View
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: 32,
                        borderWidth: 1,
                        borderColor: colors.primaryTextColor,
                        backgroundColor: "#fff",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Icon name="add" size={34} color="#252525" />
                </View>
                <Text style={{ fontSize: 14, fontWeight: "500", color: "#0A0D12", marginTop: 4 }}>Add</Text>
            </TouchableOpacity>

            <FlatList
                data={children}
                horizontal
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                initialNumToRender={8}
                windowSize={5}
                removeClippedSubviews
                getItemLayout={getItemLayout}
            />
        </View>
    );
};

export default ChildrenScroller;
