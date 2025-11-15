
import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { colors, toasts } from "../../assets/lib";
import Button from "../../components/Button";
import BottomSheet from "../../components/BottomSheet";
import CountryModal from "../../components/CountryModal";
import Header from "../../components/Header";
import { RootState } from "../../app/store";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";


const Login = () => {
    const [selectLanguage, setSelectLanguage] = useState<string>("");
    const [languageCode, setLanguageCode] = useState<string>("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [description, setDescription] = useState("");
    const [allErrors, setAllErrors] = useState([]);
    const [numberOfChild, setNumberOfChild] = useState(2);
    const [showModal, setShowModal] = useState(false);
    const [familyType, setFamilyType] = useState<any[]>([]);
    const [parents, setParents] = useState([""]);
    const [showFlagModal, setShowFlagModal] = useState(false);
    const [parentingStyle, setParentingStyle] = useState([]);
    const [parentingStyleModal, setParentingStyleModal] = useState(false);
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [interestSelected, setInterestSelected] = useState<any>([]);
    const [selectedEducationalGoals, setSelectedEducationalGoals] = useState([]);
    const [showNeedsModal, setShowNeedsModal] = useState(false);
    const [selectedNeed, setSelectedNeed] = useState(null);
    const [isEditable, setIsEditable] = useState(false);

    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.root.auth.access_token);
    const [family, setFamily] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const parentingStyleData = [
        { name: "Nurturing" },
        { name: "Authoritarian" },
        { name: "Collaborative" },
        { name: "Adaptive" },
        { name: "Permissive" },
        { name: "Structured" },
        { name: "Protective" },
        { name: "Involved" },
        { name: "Reflective" },
        { name: "Demanding but Supportive" },
        { name: "Relaxed" },
        { name: "Inconsistent" },
    ];

    const familyTypeData = [
        { name: "Couple" },
        { name: "Blanded" },
        { name: "Single Parent" },
        { name: "Other" },
    ];

    const needs = [
        { name: "Parental fatigue" },
        { name: "Lack of quality family time" },
        { name: "Need for emotional support" },
        { name: "Difficulty setting boundaries" },
        { name: "Need to improve communication" },
        { name: "Family stress management" },
        { name: "Supporting a child with special needs" },
        { name: "Managing sibling conflicts" },
        { name: "Organizing daily life" },
        { name: "Demanding but Supportive" },
        { name: "Strengthening the parent-child bond" },
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

    const goals = [
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

    const [goalList, setGoalList] = useState(goals)

    const count = (operation: string) => {
        if (operation === "add") setNumberOfChild(numberOfChild + 1);
        else setNumberOfChild(numberOfChild - 1 < 0 ? 0 : numberOfChild - 1);
    };
    const fetchFamily = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://api.zenfamy.ai/api/v1/families/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFamily(response.data);
            setFullName(response.data.family_name)

            const apiGoals = response.data.educational_goals || [];

            const updatedGoals = [...goalList];

            apiGoals.forEach((goalName: string) => {
                const alreadyExists = updatedGoals.some(
                    (item) => item.name.toLowerCase() === goalName.toLowerCase()
                );

                if (!alreadyExists) {
                    updatedGoals.push({
                        name: goalName,
                        icon: require("../../assets/images/stories/pokemon.png"),
                    });
                }
            });

            setGoalList(updatedGoals);
            setSelectedEducationalGoals(apiGoals);
            setNumberOfChild(response.data.
                num_children
            )
        } catch (error) {
            console.error("Error fetching family:", error);
        } finally {
            setLoading(false);
        }
    };


    // useFocusEffect ensures the API is called every time the screen is focused
    useFocusEffect(
        useCallback(() => {
            fetchFamily();
        }, [])
    );

    console.log('familiy', family)

    const updateFamily = async (token: string) => {
        try {



            const response = await axios.put(
                "https://api.zenfamy.ai/api/v1/families/me",
                {
                    family_name: fullName,
                    family_bio: description,
                    family_type: String(familyType || family.family_type || ""),

                    profile_picture_url: family.profile_picture_url || "",

                    num_children: family.num_children ?? 0,
                    num_adults: family.num_adults ?? 0,

                    children_birth_years: Array.isArray(family.children_birth_years)
                        ? family.children_birth_years
                        : [],

                    family_values: family.family_values || [],
                    needs: family.needs || [],
                    educational_goals: family.educational_goals || [],

                    parenting_style: family.parenting_style || "",

                    preferred_language:
                        (languageCode && languageCode.length >= 2
                            ? languageCode.toLowerCase()
                            : family.preferred_language) || "en",

                    country: family.country || "",
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );



            console.log("Update success:", response.data);
            return response.data;
        } catch (error: any) {
            console.log("Update family error: is", error.response?.data || error.message);
            throw error;
        }
    };

    const UpdateMyFamily = async () => {
        try {
            setAllErrors([]);
            const data = {
                // ...family,
                // country: selectedCountry,
                // educational_goals: selectedEducationalGoals,
                family_bio: description,
                family_name: fullName,
                family_type: familyType,
                // family_values: interestSelected,
                // needs: ['Aniam'],
                // num_children: numberOfChild,
                // parenting_style: parentingStyle,
                // preferred_language: languageCode.toLowerCase(),
            };


            // console.log('data intername
            //     ', data)

            // try {

            updateFamily(token ? token : "")
            //     const response = await axios.put(`https://api.zenfamy.ai/api/v1/families/me`, data, {
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //             "Content-Type": "application/json",
            //         },
            //     });

            //     if (response) {
            //         toasts("Updated successfully");
            //         // setFullName(response.data.family_name)

            //     }
            //     console.log('jackkkk', response)
            // } catch (error: any) {
            //     console.error("Error updating family:", error.response?.data || error.message);
            //     throw error; // rethrow to handle it in your component
            // }

            // await dispatch(updateMyFaliy(data)).unwrap();

            setIsEditable(false);
        } catch (error: any) {
            console.log(JSON.stringify(error));
            if (typeof error === "string") return toasts(error);
            if (typeof error?.detail === "string") toasts(error.detail);
            else setAllErrors(error?.detail || []);
        }
    };

    useEffect(() => {
        // if (!family?.family_id) getMyFamily();

        if (family?.family_id) {
            setFamilyType(family?.family_type);
            setFullName(family?.family_name);
            setNumberOfChild(family?.num_children);
            setParents(family?.parent_names || []);
            setInterestSelected(family?.family_values || []);
            setSelectedEducationalGoals(family?.educational_goals || []);
            setSelectedCountry(family?.country);
            setSelectLanguage(family?.preferred_language);
            setDescription(family?.family_bio);
            setSelectedNeed(family?.needs?.[0]);
            setParentingStyle(family?.parenting_style || []);
        }
    }, [family?.family_id]);

    const handleSelect = (item: any) => {
        setInterestSelected((prev: any) => {
            if (prev.includes(item.name)) return prev.filter((val) => val !== item.name);
            if (prev.length >= 5) return [...prev];
            return [...prev, item.name];
        });
    };

    const handleSelectGoals = (item: any) => {
        setSelectedEducationalGoals((prev: any) => {
            if (prev.includes(item.name)) return prev.filter((val: any) => val !== item.name);
            if (prev.length >= 3) return [...prev];
            return [...prev, item.name];
        });
    };

    const onHandleChangeParent = (index: number, value: string) => {
        setParents((prev) => prev.map((item, i) => (i === index ? value : item)));
    };

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.background}
        >
            <Header title="Family Profile" />
            {/* {!isEditable && (
                <View style={styles.editButtonWrapper}>
                    <TouchableOpacity onPress={() => setIsEditable(true)}>
                        <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                </View>
            )} */}

            <Spinner
                visible={loading}
                // textContent="Loading..."
                textStyle={{ color: "#fff" }}
            />

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View>
                    {!isEditable && <View style={styles.overlay} />}

                    <Text style={styles.label}>Family Name</Text>
                    <TextInput
                        placeholder="Enter family name"
                        value={fullName}
                        onChangeText={setFullName}
                        style={styles.input}
                    />

                    {/* {parents?.map((item, index) => (
                        <View key={index} style={styles.parentWrapper}>
                            <View style={styles.parentHeader}>
                                <Text style={styles.label}>Parent {index + 1}</Text>
                                {index > 0 && (
                                    <TouchableOpacity
                                        onPress={() => setParents((prev) => prev.filter((_, i) => i !== index))}
                                    >
                                        <Entypo name="circle-with-cross" size={18} color="red" />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <TextInput
                                placeholder="Enter parent's name"
                                value={item}
                                onChangeText={(val) => onHandleChangeParent(index, val)}
                                style={styles.input}
                            />
                        </View>
                    ))}

                    <Button
                        name="+ Add another parent"
                        textColor="#fff"
                        bgColor={colors.primaryButton}
                        onclick={() => setParents([...parents, ""])}
                    /> */}

                    {/* Country */}
                    <Text style={styles.label}>Country</Text>
                    <TouchableOpacity onPress={() => setShowFlagModal(true)} style={styles.selectInput}>
                        <Text style={[styles.selectText, { color: selectedCountry ? "#000" : "#999" }]}>
                            {selectedCountry ?? "Select type"}
                        </Text>
                        <Ionicons name="chevron-down" size={24} color={colors.gray600} />
                    </TouchableOpacity>

                    {/* Language */}
                    <Text style={styles.label}>Primary Language</Text>
                    <TouchableOpacity onPress={() => setShowLanguageModal(true)} style={styles.selectInput}>
                        <Text style={[styles.selectText, { color: selectLanguage ? "#000" : "#999" }]}>
                            {selectLanguage ?? "Select type"}
                        </Text>
                        <Ionicons name="chevron-down" size={24} color={colors.gray600} />
                    </TouchableOpacity>

                    {/* Family Type */}
                    <Text style={styles.label}>Family Type</Text>
                    <TouchableOpacity onPress={() => setShowModal(true)} style={styles.selectInput}>
                        <Text style={[styles.selectText, { color: familyType ? "#000" : "#999" }]}>
                            {familyType ?? "Select type"}
                        </Text>
                        <Ionicons name="chevron-down" size={24} color={colors.gray600} />
                    </TouchableOpacity>

                    {/* Number of children */}
                    <Text style={styles.label}>Number of children</Text>
                    <View style={styles.childCounter}>
                        <TouchableOpacity onPress={() => count("subtract")} style={styles.counterButton}>
                            <AntDesign name="minus" size={24} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.childNumber}>{numberOfChild}</Text>
                        <TouchableOpacity onPress={() => count("add")} style={[styles.counterButton, { backgroundColor: colors.primaryButton }]}>
                            <AntDesign name="plus" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Parenting Style */}
                    <Text style={styles.label}>Parenting Style</Text>
                    <TouchableOpacity onPress={() => setParentingStyleModal(true)} style={styles.selectInput}>
                        <Text style={[styles.selectText, { color: parentingStyle ? "#000" : "#999" }]}>
                            {parentingStyle ?? "Select type"}
                        </Text>
                        <Ionicons name="chevron-down" size={24} color={colors.gray600} />
                    </TouchableOpacity>

                    {/* Family Values */}
                    <Text style={[styles.label, { marginTop: 20 }]}>Family Values</Text>
                    <View style={styles.tagsContainer}>
                        {interests.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleSelect(item)}
                                style={[
                                    styles.tag,
                                    interestSelected.includes(item.name) ? styles.tagSelected : styles.tagUnselected,
                                ]}
                            >
                                <Image source={item.icon} style={styles.tagIcon} />
                                <Text style={styles.tagText}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.helperText}>{`${interestSelected.length}/5 selected`}</Text>

                    {/* Educational Goals */}
                    <Text style={[styles.label, { marginTop: 20 }]}>Educational Goals</Text>
                    <View style={styles.tagsContainer}>
                        {goalList.map((item: any, index: any) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleSelectGoals(item)}
                                style={[
                                    styles.tag,
                                    selectedEducationalGoals.includes(item.name) ? styles.tagSelected : styles.tagUnselected,
                                ]}
                            >
                                <Image source={item.icon} style={styles.tagIcon} />
                                <Text style={styles.tagText}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.helperText}>{`${selectedEducationalGoals.length}/3 selected`}</Text>

                    {/* Free Description */}
                    <Text style={[styles.label, { marginTop: 20 }]}>Free Description</Text>
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        textAlignVertical="top"
                        placeholder="Enter Free Description"
                        placeholderTextColor={colors.gray600}
                        style={styles.textArea}
                    />

                    {/* BottomSheets */}
                    <BottomSheet
                        setValue={setFamilyType}
                        selectedValue={familyType}
                        setShowModal={setShowModal}
                        showModal={showModal}
                        data={familyTypeData}
                    />
                    <BottomSheet
                        setValue={setParentingStyle}
                        selectedValue={parentingStyle}
                        setShowModal={setParentingStyleModal}
                        showModal={parentingStyleModal}
                        data={parentingStyleData}
                    />
                    <BottomSheet
                        setValue={setSelectedNeed}
                        selectedValue={selectedNeed}
                        setShowModal={setShowNeedsModal}
                        showModal={showNeedsModal}
                        data={needs}
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
                        setlanguageCode={setLanguageCode}
                    />

                    {allErrors.map((error, i: any) => (
                        <View key={i} style={styles.errorWrapper}>
                            <Ionicons name="close-circle-outline" size={18} color="red" />
                            <Text style={styles.errorText}>
                                "msg"
                                {/* {error.loc[1]} : {error.msg} */}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {isEditable && (
                <View style={styles.saveButtonWrapper}>
                    {!familyType ? (
                        <Button
                            name="Save profile"
                            textColor="#5358627c"
                            bgColor={colors.disabledButton}
                            onclick={() => toasts("Please enter input")}
                        />
                    ) : (
                        <Button
                            loading={loading}
                            name="Save Profile"
                            textColor="#fff"
                            bgColor={colors.primaryButton}
                            onclick={UpdateMyFamily}
                        />
                    )}
                </View>
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1 },
    editButtonWrapper: {
        position: "absolute",
        right: 16,
        top: 75,
        zIndex: 50,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 50,
        backgroundColor: colors.primaryButton,
    },
    editButtonText: { color: "#fff", fontSize: 16 },
    scrollViewContent: { padding: 16 },
    overlay: { position: "absolute", width: "100%", height: "100%", backgroundColor: "transparent", zIndex: 50 },
    label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
    input: { backgroundColor: "#fff", borderColor: "#a5a5a53f", borderWidth: 1, borderRadius: 50, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 12, color: "#000" },
    parentWrapper: { marginBottom: 12 },
    parentHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    selectInput: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#E9EAEB", borderRadius: 50, padding: 16, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    selectText: { fontSize: 14 },
    childCounter: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
    counterButton: { height: 56, width: 56, borderRadius: 50, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#E9EAEB", backgroundColor: "#fff" },
    childNumber: { flex: 1, textAlign: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: "#E9EAEB", borderRadius: 50, padding: 12, fontSize: 24, marginHorizontal: 8 },
    tagsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    tag: { flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 4, borderRadius: 50, marginBottom: 12, width: "32%" },
    tagSelected: { backgroundColor: "#85b17625", borderWidth: 1, borderColor: "#adcda3" },
    tagUnselected: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc" },
    tagIcon: { width: 20, height: 20 },
    tagText: { marginLeft: 8, fontSize: 14, color: "#333" },
    helperText: { fontSize: 12, color: "#666", marginBottom: 8 },
    textArea: { height: 140, backgroundColor: "#fff", borderWidth: 1, borderColor: "#E9EAEB", borderRadius: 12, padding: 12, color: "#000" },
    errorWrapper: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
    errorText: { fontSize: 14, color: "red", marginLeft: 4 },
    saveButtonWrapper: { padding: 16 },
});

export default Login;
