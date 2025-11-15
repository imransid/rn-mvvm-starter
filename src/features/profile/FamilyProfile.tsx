/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
    Image,
    ImageBackground,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors, toasts } from "../../assets/lib";
import Button from "../../components/Button";
import Input from "../../components/Input";
import BottomSheet from "../../components/BottomSheet";
import CountryModal from "../../components/CountryModal";
// import { setFamilyDraft } from "../redux/slices/familySlice";
import Header from "../../components/Header";

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

const FamilyProfile = () => {
    const [fullName, setfullName] = useState("");
    const [numberOfChild, setnumberOfChild] = useState(2);
    const [showmodal, setshowmodal] = useState(false);
    const [familyType, setfamilyType] = useState<string | null>(null);
    const [parents, setparents] = useState([""]);
    const [showFlagModal, setshowFlagModal] = useState(false);
    const [selectedCountry, setselectedCountry] = useState<string | null>(null);
    const [selectLanguage, setselectLanguage] = useState<string | null>(null);
    const dispatch = useDispatch<any>();

    const familyTypeData = [
        { name: "Couple" },
        { name: "Blanded" },
        { name: "Single Parent" },
        { name: "Other" },
    ];

    const count = (operation: string) => {
        if (operation === "add") {
            setnumberOfChild(numberOfChild + 1);
        } else {
            setnumberOfChild(numberOfChild - 1 < 0 ? 0 : numberOfChild - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            // dispatch(
            //     setFamilyDraft({
            //         family_name: fullName,
            //         family_type: familyType,
            //         num_children: numberOfChild,
            //     })
            // );
            toasts("Saved successfully");
            // replace navigation logic for CLI (react-navigation)
        } catch (error) {
            console.log(error);
        }
    };

    const onHandleChangeParent = (index: number, value: string) => {
        setparents((prev) => prev.map((item, i) => (i === index ? value : item)));
    };

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            style={styles.background}
            resizeMode="cover"
        >
            <Header />
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.label}>Family Name</Text>
                    <Input label="Enter family name" setInput={setfullName} inputvalue={fullName} ispassword={false} />

                    {parents.map((item, index) => (
                        <View key={index} style={styles.parentContainer}>
                            <View style={styles.parentHeader}>
                                <Text style={styles.label}>Parent {index + 1}</Text>
                                {index > 0 && (
                                    <TouchableOpacity
                                        onPress={() => setparents((prev) => prev.filter((_, i) => i !== index))}
                                    >
                                        <Entypo name="circle-with-cross" size={18} color="red" />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <TextInput
                                placeholder="Enter parent's name"
                                style={styles.parentInput}
                                value={item}
                                onChangeText={(value) => onHandleChangeParent(index, value)}
                            />
                        </View>
                    ))}

                    <Button
                        name="+ Add another parent"
                        textColor="#ffffff"
                        bgColor={colors.primaryButton}
                        onclick={() => setparents([...parents, ""])}
                    />

                    {/* Country */}
                    <Text style={styles.label}>Country</Text>
                    <TouchableOpacity onPress={() => setshowFlagModal(true)} style={styles.dropdown}>
                        <Text style={[styles.dropdownText, { color: selectedCountry ? "#000" : "#999" }]}>
                            {selectedCountry ?? "Select type"}
                        </Text>
                        <Ionicons name="chevron-down" size={24} color={colors.gray600} style={styles.dropdownIcon} />
                    </TouchableOpacity>

                    {/* Language */}
                    <Text style={styles.label}>Primary Language</Text>
                    <TouchableOpacity onPress={() => setshowLanguageodal(true)} style={styles.dropdown}>
                        <Text style={[styles.dropdownText, { color: selectLanguage ? "#000" : "#999" }]}>
                            {selectLanguage ?? "Select type"}
                        </Text>
                        <Ionicons name="chevron-down" size={24} color={colors.gray600} style={styles.dropdownIcon} />
                    </TouchableOpacity>

                    {/* Family Type */}
                    <Text style={styles.label}>Family Type</Text>
                    <TouchableOpacity onPress={() => setshowmodal(true)} style={styles.dropdown}>
                        <Text style={[styles.dropdownText, { color: familyType ? "#000" : "#999" }]}>
                            {familyType ?? "Select type"}
                        </Text>
                        <Ionicons name="chevron-down" size={24} color={colors.gray600} style={styles.dropdownIcon} />
                    </TouchableOpacity>
                </View>

                {/* Number of Children */}
                <View style={styles.section}>
                    <Text style={styles.label}>Number of children</Text>
                    <View style={styles.counterContainer}>
                        <TouchableOpacity onPress={() => count("subtract")} style={styles.counterButton}>
                            <AntDesign name="minus" size={24} color="black" />
                        </TouchableOpacity>

                        <Text style={styles.counterText}>{numberOfChild}</Text>

                        <TouchableOpacity onPress={() => count("add")} style={[styles.counterButton, styles.counterAdd]}>
                            <AntDesign name="plus" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    name="Save and Continue"
                    textColor={familyType ? "#fff" : "#5358627c"}
                    bgColor={familyType ? colors.primaryButton : colors.disabledButton}
                    onclick={familyType ? handleSubmit : () => toasts("Please enter input")}
                />
            </View>

            {/* Modals */}
            <BottomSheet
                setvalue={setfamilyType}
                selectedvalue={familyType}
                setshowmodal={setshowmodal}
                showmodal={showmodal}
                data={familyTypeData}
            />
            <CountryModal
                setvalue={setselectedCountry}
                selectedvalue={selectedCountry}
                setshowmodal={setshowFlagModal}
                showmodal={showFlagModal}
                setlanguageCode={() => { }}
            />
            <CountryModal
                setvalue={setselectLanguage}
                selectedvalue={selectLanguage}
                setshowmodal={setshowLanguageodal}
                showmodal={showLanguageodal}
                datatype="language"
                setlanguageCode={() => { }}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: { flex: 1, padding: 16 },
    section: { marginBottom: 16 },
    label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
    parentContainer: { marginBottom: 12 },
    parentHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
    parentInput: { height: 56, borderWidth: 1, borderColor: "#a5a5a53f", borderRadius: 28, paddingHorizontal: 16, backgroundColor: "#fff", marginBottom: 8 },
    dropdown: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#E9EAEB", borderRadius: 28, padding: 16, marginBottom: 12, justifyContent: "center" },
    dropdownText: { fontSize: 14 },
    dropdownIcon: { position: "absolute", right: 16, top: 16 },
    counterContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    counterButton: { height: 56, width: 56, borderRadius: 28, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#E9EAEB" },
    counterAdd: { backgroundColor: colors.primaryButton },
    counterText: { flex: 1, textAlign: "center", fontSize: 24, fontWeight: "600", backgroundColor: "#fff", borderWidth: 1, borderColor: "#E9EAEB", borderRadius: 28, paddingVertical: 12, marginHorizontal: 8 },
    footer: { padding: 16 },
});

export default FamilyProfile;
