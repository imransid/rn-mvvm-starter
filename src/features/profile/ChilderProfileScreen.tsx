import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Button from "../../components/Button";
import Header from "../../components/Header";
// import { deleteChild, getMyChild } from "../redux/slices/childSlice";
import { colors, toasts } from "../../assets/lib";
import { useGetMyChildrenQuery } from "../../api/childrenApi";

// Predefined avatar images
const avatar = [
    { name: "avatar1", image: require("../../assets/images/imoji/animoji.png") },
    { name: "avatar2", image: require("../../assets/images/imoji/animoji(1).png") },
    { name: "avatar3", image: require("../../assets/images/imoji/animoji(2).png") },
    { name: "avatar4", image: require("../../assets/images/imoji/animoji(3).png") },
    { name: "avatar5", image: require("../../assets/images/imoji/animoji(4).png") },
    { name: "avatar6", image: require("../../assets/images/imoji/animoji(5).png") },
    { name: "avatar7", image: require("../../assets/images/imoji/animoji(6).png") },
    { name: "avatar8", image: require("../../assets/images/imoji/animoji(7).png") },
];

const ChildrenList = ({ navigation }: any) => {
    const [selectChild, setSelectChild] = useState<any>([]);
    const [selectModeEnabled, setSelectModeEnabled] = useState(false);
    // const { loading, childs } = useSelector((state: any) => state.childs);

    const { data: childs, isLoading, isError } = useGetMyChildrenQuery(
        undefined, // first argument is the query parameter (payload)
        { refetchOnFocus: true } // second argument is options
    );
    // const childs: any = []
    const loading = false

    const dispatch = useDispatch<any>();

    const [validUrl, setValidUrl] = useState<boolean>(false);
    const [avatarUrl, setAvatarUrl] = useState<string>("");



    const handleAddChild = () => {
        navigation.navigate("AddChild");
    };

    const selectFun = (id: any) => {
        setSelectModeEnabled(true);
        if (selectChild.includes(id)) {
            setSelectChild((prev: any) => prev.filter((item: any) => item !== id));
        } else {
            setSelectChild((prev: any) => [...prev, id]);
        }
    };

    const deleteFunc = async () => {
        try {
            // for (const item of selectChild) {
            //     await dispatch(deleteChild(item)).unwrap();
            // }
            // await dispatch(getMyChild()).unwrap();
            // setSelectChild([]);
            setSelectModeEnabled(false);
        } catch (error) {
            console.log(error);
            toasts("Failed to delete child");
        }
    };

    const isValidImageUrl = async (url: string) => {
        try {
            const response = await fetch(url);
            return (
                response.ok &&
                response.headers.get("Content-Type")?.startsWith("image/")
            );
        } catch {
            return false;
        }
    };

    useEffect(() => {
        if (avatarUrl) {
            isValidImageUrl(avatarUrl).then((valid) => setValidUrl(valid as any));
        } else {
            setValidUrl(false);
        }
    }, [avatarUrl]);

    const getAvatarImage = (avatarUrl: string) => {
        return validUrl
            ? { uri: avatarUrl }
            : require("../../assets/images/imoji/default.png");
    };

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.container}
        >
            <Header title="Children Profiles" />
            <View style={styles.content}>
                <FlatList
                    data={childs}
                    keyExtractor={(item) => item.child_id.toString()}
                    renderItem={({ item }: any) => (
                        <TouchableOpacity
                            onLongPress={() => selectFun(item.child_id)}
                            onPress={() => {
                                if (!selectModeEnabled) {
                                    navigation.navigate("ChildProfile", { id: item.child_id });
                                } else {
                                    selectFun(item.child_id);
                                }
                            }}
                            style={[
                                styles.childCard,
                                selectChild.includes(item.child_id) && styles.selectedCard,
                            ]}
                        >
                            <Image
                                source={getAvatarImage(item.avatar_url)}
                                style={styles.avatar}
                            />
                            <View>
                                <Text style={styles.childName}>{item.first_name}</Text>
                                <Text style={styles.childAge}>
                                    {moment(item.birth_date)
                                        .fromNow()
                                        .replace("ago", "old")}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyList}>
                            <Text style={styles.emptyText}>No children found</Text>
                        </View>
                    )}
                />

                {!selectModeEnabled && (
                    <Button
                        name="+ Add Child"
                        bgColor={colors.primaryButton}
                        onclick={handleAddChild}
                    />
                )}

                {selectModeEnabled && (
                    <View style={styles.bottomAction}>
                        <TouchableOpacity onPress={deleteFunc}>
                            {loading ? (
                                <ActivityIndicator color="#ff2828" />
                            ) : (
                                <Text style={styles.deleteText}>Delete</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectModeEnabled(false);
                                setSelectChild([]);
                            }}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ImageBackground>
    );
};

export default ChildrenList;

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, padding: 16 },
    childCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 16,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
    },
    selectedCard: {
        borderWidth: 2,
        borderColor: "#1D4ED8", // blue-700
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    childName: { fontSize: 16, fontWeight: "bold", color: "#000" },
    childAge: { fontSize: 14, color: "#6B7280" }, // gray-500
    emptyList: { flex: 1, justifyContent: "center", alignItems: "center" },
    emptyText: { color: "#6B7280" },
    bottomAction: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 12,
    },
    deleteText: { color: "#FF2828", fontWeight: "bold" },
    cancelText: { color: "#6B7280", fontWeight: "bold" },
});
