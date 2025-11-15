/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageBackground,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useRoute } from "@react-navigation/native";
import moment from "moment";
import Entypo from "react-native-vector-icons/Entypo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import BottomSheet from "../../components/BottomSheet";
import CountryModal from "../../components/CountryModal";
// import { getAchild, updateChild } from "../../redux/slices/childSlice";
import { colors, toasts } from "../../assets/lib";
import { avatar } from "../quiz/QuizzesScreen";
import { useGetChildByIdQuery } from "../../api/childrenApi";
import { RootState } from "../../app/store";
import axios from "axios";

// Sample data
const nature = [
    { name: "Curious", icon: require("../../assets/images/stories/pokemon.png") },
    { name: "Energetic", icon: require("../../assets/images/stories/stars.png") },
    { name: "Calm", icon: require("../../assets/images/stories/crown.png") },
    { name: "Creative", icon: require("../../assets/images/stories/sword.png") },
    { name: "Sensitive", icon: require("../../assets/images/stories/paint-board.png") },
    { name: "Thoughtful", icon: require("../../assets/images/stories/game.png") },
    { name: "Caring", icon: require("../../assets/images/stories/natural-food.png") },
    { name: "Funny", icon: require("../../assets/images/stories/rocket.png") },
    { name: "Independent", icon: require("../../assets/images/stories/sword.png") },
];

const personality = [
    { name: "Courage", icon: require("../../assets/images/stories/pokemon.png") },
    { name: "Friendship", icon: require("../../assets/images/stories/stars.png") },
    { name: "Respect", icon: require("../../assets/images/stories/crown.png") },
    { name: "Generosity", icon: require("../../assets/images/stories/sword.png") },
    { name: "Perseverance", icon: require("../../assets/images/stories/paint-board.png") },
    { name: "Empathy", icon: require("../../assets/images/stories/game.png") },
    { name: "Creativity", icon: require("../../assets/images/stories/natural-food.png") },
    { name: "Patience", icon: require("../../assets/images/stories/rocket.png") },
    { name: "Responsibility", icon: require("../../assets/images/stories/rocket.png") },
];

const interests = [
    { name: "Animals", icon: require("../../assets/images/stories/pokemon.png") },
    { name: "Magic", icon: require("../../assets/images/stories/stars.png") },
    { name: "Princesses", icon: require("../../assets/images/stories/crown.png") },
    { name: "Knights", icon: require("../../assets/images/stories/sword.png") },
    { name: "Dinosaurs", icon: require("../../assets/images/stories/paint-board.png") },
    { name: "Robots", icon: require("../../assets/images/stories/game.png") },
    { name: "Forest", icon: require("../../assets/images/stories/natural-food.png") },
    { name: "Space", icon: require("../../assets/images/stories/rocket.png") },
    { name: "Ocean", icon: require("../../assets/images/stories/beach.png") },
    { name: "Sports", icon: require("../../assets/images/stories/baseball.png") },
    { name: "Friendship", icon: require("../../assets/images/stories/favourite.png") },
    { name: "School", icon: require("../../assets/images/stories/school.png") },
    { name: "Family", icon: require("../../assets/images/stories/user-group.png") },
    { name: "Nature", icon: require("../../assets/images/stories/natural-food.png") },
    { name: "Adventure", icon: require("../../assets/images/stories/adventure.png") },
];

const familyTypeData = [
    { name: "Couple" },
    { name: "Blanded" },
    { name: "Single Parent" },
    { name: "Other" },
];

const ProfileChildren = () => {
    const [numberOfChild, setNumberOfChild] = useState(2);
    const [showModal, setShowModal] = useState(false);
    const [favoriteActivities, setFavoriteActivities] = useState<string[] | null>(null);
    const [isEditable, setIsEditable] = useState(false);

    const [parents, setParents] = useState([""]);
    const [showFlagModal, setShowFlagModal] = useState(false);
    const [selectLanguage, setSelectLanguage] = useState<string | null>(null);
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [interestSelected, setInterestSelected] = useState<string[]>([]);
    const [selectedPersonality, setSelectedPersonality] = useState<string[]>([]);
    const [selectedNature, setSelectedNature] = useState<string[]>([]);


    const [child, setChild] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const isFocused = useIsFocused();

    const route = useRoute();
    const { id } = route.params as { id: number }; // get the id from navigation

    const token = useSelector((state: RootState) => state.root.auth.access_token)

    const fetchChild = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.zenfamy.ai/api/v1/children/me/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setChild(response.data);
        } catch (error) {
            console.log("Error fetching child:", error);
        } finally {
            setLoading(false);
        }
    }, [id, token]);

    // Fetch when screen comes into focus
    useEffect(() => {
        if (isFocused) {
            fetchChild();
        }
    }, [isFocused, fetchChild]);

    useEffect(() => {


        console.log('child', child)


        if (child.child_id) {
            setInterestSelected(child.favorite_activities);
            setSelectedPersonality(child.interests);
            setSelectedNature(child.special_needs);
        }
    }, [child, isFocused]);


    const count = (operation: string) => {
        setNumberOfChild(prev => (operation === "add" ? prev + 1 : Math.max(prev - 1, 0)));
    };

    const handleSelect = (item: any) => {
        if (!isEditable) return toasts("Enable edit mode first");
        setInterestSelected(prev => (prev.includes(item.name) ? prev.filter(v => v !== item.name) : [...prev, item.name]));
    };
    const handleSelectPersonality = (item: any) => {
        if (!isEditable) return toasts("Enable edit mode first");
        setSelectedPersonality(prev => (prev.includes(item.name) ? prev.filter(v => v !== item.name) : [...prev, item.name]));
    };
    const handleSelectNature = (item: any) => {
        if (!isEditable) return toasts("Enable edit mode first");
        setSelectedNature(prev => (prev.includes(item.name) ? prev.filter(v => v !== item.name) : [...prev, item.name]));
    };

    const handleSubmit = async () => {
        try {
            if (!child?.child_id) {
                return toasts("Child ID is missing");
            }

            // Prepare the object to match API requirement
            const dataToUpdate = {
                first_name: child.first_name,
                birth_date: child.birth_date,
                gender: child.gender,
                avatar_url: child.avatar_url || "string",
                interests: selectedPersonality.length ? selectedPersonality : ["string"],
                favorite_activities: interestSelected.length ? interestSelected : ["string"],
                special_needs: selectedNature.length ? selectedNature : ["string"],
                personality: child.personality || { additionalProp1: {} },
                progress: child.progress || 100,
            };

            console.log("Payload to send:", dataToUpdate);

            const response = await axios.put(
                `https://api.zenfamy.ai/api/v1/children/me/${child.child_id}`,
                dataToUpdate,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            toasts("Child updated successfully", 'success');

            // Optional: update redux state if needed
            // dispatch(updateChild(response.data));

        } catch (error: any) {
            console.log("Update error:", error.response || error.message);
            toasts("Failed to update child");
        }
    };



    const onHandleChangeParent = (index: number, value: string) => {
        setParents(prev => prev.map((item, i) => (index === i ? value : item)));
    };

    return (
        <ImageBackground source={require("../../assets/images/bg/greenshadow.png")} style={{ flex: 1 }}>
            <Header title="Child Profile" />
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {loading && <ActivityIndicator size="large" color="#000" />}

                {/* Avatar & Name */}
                <View style={{ alignItems: "center", marginBottom: 16 }}>
                    <Image
                        source={avatar.find((a: any) => a.name === child?.avatar_url)?.image}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>{child.first_name || "Emily"}</Text>

                    {!isEditable && (
                        <TouchableOpacity
                            onPress={() => setIsEditable(true)}
                            style={styles.editButton}
                        >
                            <Entypo name="edit" size={16} color="#fff" />
                            <Text style={styles.editButtonText}>Edit Profile</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Personal Details */}
                <View style={{ marginBottom: 16 }}>
                    <Text style={styles.sectionTitle}>Personal Details</Text>
                    <View style={styles.detailContainer}>
                        <View style={styles.detailRow}>
                            <Text>Age</Text>
                            <Text>{moment(child?.birth_date).fromNow()}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text>Birthday</Text>
                            <Text>{moment(child?.birth_date).format("DD MMM, YYYY")}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text>Gender</Text>
                            <Text>{child?.gender === "F" ? "Female" : "Male"}</Text>
                        </View>
                    </View>
                </View>

                {/* Favorite Activities */}
                <View style={{ marginBottom: 24 }}>
                    <Text style={styles.sectionTitle}>What are your child’s favorite activities?</Text>
                    <View style={styles.flexWrap}>
                        {interests.map((item, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={[
                                    styles.tag,
                                    interestSelected.includes(item.name) && styles.tagSelected,
                                ]}
                                onPress={() => handleSelect(item)}
                            >
                                <Image source={item.icon} style={styles.tagIcon} />
                                <Text style={styles.tagText}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Personality Traits */}
                <View style={{ marginBottom: 24 }}>
                    <Text style={styles.sectionTitle}>{"Emily's"} Personality Traits</Text>
                    <View style={styles.flexWrap}>
                        {personality.map((item, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={[
                                    styles.tag,
                                    selectedPersonality.includes(item.name) && styles.tagSelected,
                                ]}
                                onPress={() => handleSelectPersonality(item)}
                            >
                                <Image source={item.icon} style={styles.tagIcon} />
                                <Text style={styles.tagText}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Nature */}
                <View style={{ marginBottom: 24 }}>
                    <Text style={styles.sectionTitle}>What is the nature of your child?</Text>
                    <View style={styles.flexWrap}>
                        {nature.map((item, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={[
                                    styles.tag,
                                    selectedNature.includes(item.name) && styles.tagSelected,
                                ]}
                                onPress={() => handleSelectNature(item)}
                            >
                                <Image source={item.icon} style={styles.tagIcon} />
                                <Text style={styles.tagText}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <BottomSheet
                    setValue={setFavoriteActivities}
                    selectedValue={favoriteActivities || ""}
                    setShowModal={setShowModal}
                    showModal={showModal}
                    data={familyTypeData}
                />

                <CountryModal
                    setvalue={setSelectedCountry}
                    selectedvalue={selectedCountry}
                    setshowmodal={setShowFlagModal}
                    showmodal={showFlagModal}
                />

                <CountryModal
                    setvalue={setSelectLanguage}
                    selectedvalue={selectLanguage}
                    setshowmodal={setShowLanguageModal}
                    showmodal={showLanguageModal}
                    datatype="language"
                />
            </ScrollView>

            {isEditable && (
                <View style={{ padding: 16 }}>
                    <Button
                        name="Save and Continue"
                        loading={loading}
                        textColor="#fff"
                        bgColor={colors.primaryButton}
                        onclick={handleSubmit}
                    />
                </View>
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    avatar: { width: 96, height: 96, borderRadius: 48, marginBottom: 8 },
    name: { fontSize: 26, fontWeight: "600", marginBottom: 12 },
    editButton: { flexDirection: "row", alignItems: "center", backgroundColor: colors.primaryButton, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 25 },
    editButtonText: { color: "#fff", fontSize: 14, marginLeft: 6 },
    sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
    detailContainer: { backgroundColor: "#fff", borderRadius: 12, padding: 16 },
    detailRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 },
    flexWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    tag: { flexDirection: "row", alignItems: "center", padding: 8, borderWidth: 1, borderColor: "#ddd", borderRadius: 20, marginBottom: 8, width: "32%" },
    tagSelected: { backgroundColor: "#e2f0d9", borderColor: "#adcda3" },
    tagIcon: { width: 20, height: 20, marginRight: 4 },
    tagText: { fontSize: 14, color: "#333" },
});

export default ProfileChildren;
