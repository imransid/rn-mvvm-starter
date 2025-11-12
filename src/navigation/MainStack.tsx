import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../features/home/HomeScreen"
import Tutorial from "../features/tutorial"
import TutorialStep1 from "../features/tutorial/TutorialStep1"
import TutorialStep2 from "../features/tutorial/TutorialStep2"
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import TutorialStep3 from "../features/tutorial/TutorialStep3";
import TutorialStep4 from "../features/tutorial/TutorialStep4";
import TutorialStep5 from "../features/tutorial/TutorialStep5";
import OnBoard from "../features/onboarding"


export type MainStackParamList = {
    Home: undefined;
    Profile: undefined;
    Tutorial: undefined
    TutorialStep1: undefined
    TutorialStep2: undefined
    TutorialStep3: undefined
    TutorialStep4: undefined
    TutorialStep5: undefined
    OnBoard: undefined
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {

    const tutorialStatus = useSelector((state: RootState) => state.root.auth.tutorialStatus);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // disables header for all screens
            }}
        >
            <Stack.Screen name="OnBoard" component={OnBoard} />
            {!tutorialStatus && <Stack.Screen name="Tutorial" component={Tutorial} />}
            <Stack.Screen name="Home" component={HomeScreen} />

            <Stack.Screen name="TutorialStep1" component={TutorialStep1} />
            <Stack.Screen name="TutorialStep2" component={TutorialStep2} />
            <Stack.Screen name="TutorialStep3" component={TutorialStep3} />
            <Stack.Screen name="TutorialStep4" component={TutorialStep4} />
            <Stack.Screen name="TutorialStep5" component={TutorialStep5} />

        </Stack.Navigator>
    );
}
