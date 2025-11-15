import React, { useEffect, useState } from "react";
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { colors, toasts } from "../../assets/lib";
import Button from "../../components/Button";
import Input from "../../components/Input";
import BottomSheet from "../../components/BottomSheet";
import Header from "./CustomHeader";
import { RootState } from "../../app/store";
import CalendarIcon from "../../assets/svg/CalendarIcon";
import GenderIcon from "../../assets/svg/GenderIcon";
import Spinner from "react-native-loading-spinner-overlay";
import { createChildRequest } from "./homeSlice";
// import { createChild, getMyChild } from "../../redux/slices/childSlice";
// import { myFamily } from "../../redux/slices/familySlice";

type RootStackParamList = {
    Home: undefined;
    AddChild: undefined;
};

type AddChildScreenProp = NativeStackNavigationProp<RootStackParamList, "AddChild">;

const AddChildScreen = () => {
    const [fullName, setFullName] = useState<string>("");
    const [showModal, setShowModal] = useState(false);
    const [selectGender, setSelectGender] = useState<any>(null);
    const [dateOfBirth, setDateOfBirth] = useState<any>(
        moment().format("YYYY-MM-DD")
    );
    const [selectedAvatar, setSelectedAvatar] = useState("avatar1");
    const [openTimeDial, setOpenTimeDial] = useState(false);
    const [allErrors, setAllErrors] = useState<any>([]);

    const genders = [
        { name: "Male", label: "Male" },
        { name: "Female", label: "Female" },
    ];


    const dispatch = useDispatch<any>();
    const loading = useSelector((state: RootState) => state.root.home.loading);
    const famil = useSelector((state: RootState) => state.root.auth.loading);
    const navigation = useNavigation<AddChildScreenProp>();

    const handleConfirm = (date: any) => {
        setDateOfBirth(date);
        setOpenTimeDial(false);
    };

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

    const handleSubmit = async () => {
        try {
            const data =
            {
                "first_name": fullName,
                "birth_date": "2025-11-13",
                "gender": "M",
                "avatar_url": "string",
                "interests": [
                    "string"
                ],
                "favorite_activities": [
                    "string"
                ],
                "special_needs": [
                    "string"
                ],
                "personality": {
                    "additionalProp1": {}
                },
                "progress": 0
            }


            dispatch(createChildRequest(data))

            // toasts("Child created successfully");

            // navigation.goBack();
        } catch (error: any) {
            setAllErrors(
                typeof error?.detail === "string"
                    ? [{ msg: error?.detail }]
                    : error?.detail
            );
        }
    };

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={{ flex: 1 }}
        >
            <Header />
            <Spinner
                visible={loading}
                // textContent="Loading..."
                textStyle={{ color: "#fff" }}
            />
            <ScrollView style={{ flex: 1, padding: 16 }}>
                <DateTimePickerModal
                    isVisible={openTimeDial}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={() => setOpenTimeDial(false)}
                />

                <View style={{ marginTop: 8 }}>
                    <Text style={styles.title}>Choose Avatar</Text>
                    <View style={styles.avatarContainer}>
                        {avatar.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedAvatar(item.name)}
                                style={styles.avatarWrapper}
                            >
                                <Image
                                    source={item.image}
                                    style={[
                                        styles.avatarImage,
                                        {
                                            borderColor:
                                                selectedAvatar === item.name
                                                    ? colors.primaryButton
                                                    : "transparent",
                                        },
                                    ]}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Name */}
                    <Text style={styles.title}>First Child’s Name</Text>
                    <Input
                        label="Enter first name"
                        setInput={setFullName}
                        inputvalue={fullName}
                        ispassword={false}
                    />

                    {/* Date of Birth */}
                    <Text style={styles.title}>Date of Birth</Text>
                    <TouchableOpacity
                        style={{ position: "relative" }}
                        onPress={() => setOpenTimeDial(true)}
                    >
                        <CalendarIcon />
                        <Text style={styles.inputField}>
                            {moment(dateOfBirth).format("MM-DD-YYYY") ?? "MM-DD-YYYY"}
                        </Text>
                        <Ionicons
                            style={styles.iconRight}
                            name="chevron-down"
                            size={24}
                            color={colors.gray600}
                        />
                    </TouchableOpacity>

                    {/* Gender */}
                    <Text style={styles.title}>Gender (Optional)</Text>
                    <TouchableOpacity onPress={() => setShowModal(true)}>

                        <Text style={styles.inputField}>
                            {selectGender ?? "Select type"}
                        </Text>
                        <Ionicons
                            style={styles.iconRight}
                            name="chevron-down"
                            size={24}
                            color={colors.gray600}
                        />


                    </TouchableOpacity>
                </View>

                {/* Errors */}
                {allErrors?.length > 0 &&
                    allErrors.map((error: any, i: number) => (
                        <View key={i} style={styles.errorRow}>
                            <Ionicons name="close-circle-outline" size={18} color="red" />
                            <Text style={styles.errorText}>{error.msg}</Text>
                        </View>
                    ))}

                <View style={{ height: 60 }} />
                <BottomSheet
                    setValue={setSelectGender}
                    selectedValue={selectGender}
                    setShowModal={setShowModal}
                    showModal={showModal}
                    data={genders}
                />
            </ScrollView>

            <View style={{ padding: 16 }}>
                {!(fullName && dateOfBirth) ? (
                    <Button
                        name="Save Child"
                        textColor="#5358627c"
                        bgColor={colors.disabledButton}
                        onclick={() => toasts("Please enter data")}
                    />
                ) : (
                    <Button
                        name="Save Child"
                        loading={loading}
                        textColor="#ffffff"
                        bgColor={colors.primaryButton}
                        onclick={handleSubmit}
                    />
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
    },
    avatarContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 24,
    },
    avatarWrapper: {
        width: "25%",
        alignItems: "center",
        marginBottom: 12,
    },
    avatarImage: {
        width: 68,
        height: 68,
        borderRadius: 34,
        borderWidth: 3,
    },
    inputField: {
        fontSize: 14,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#E9EAEB",
        padding: 16,
        borderRadius: 30,
        paddingLeft: 48,
        color: "#000",
    },
    iconLeft: {
        position: "absolute",
        left: 20,
        top: 20,
        zIndex: 10,
    },
    iconRight: {
        position: "absolute",
        right: 20,
        top: 18,
    },
    errorRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },
    errorText: {
        color: "red",
        marginLeft: 4,
        fontSize: 14,
    },
});

export default AddChildScreen;
