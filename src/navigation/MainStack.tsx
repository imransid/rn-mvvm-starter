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
import AddChildScreen from "../features/home/CreateChild";
import QuizzesScreen from "../features/quiz/QuizzesScreen";
import SurveyQuestionScreen from "../features/quiz/SurveyQuestionScreen"
import QuizResult from '../features/quiz/ParentingStyleQuizResultsScreen'
import JournalScreen from "../features/home/JournalScreen";
import AddJournal from "../features/home/CreateJournal"
import Emotional from "../features/emotional/EmotionalScreen"
import Profile from "../features/profile/ProfileScreen"
import FamilyProfile from '../features/profile/FamilyProfile'
import FamilyProfileDetail from '../features/profile/FamilyProfileDetail'
import ChildProfileDetail from "../features/profile/ChilderProfileScreen"
import ChildProfile from "../features/profile/ChildProfile"
import ProfileSettingsScreen from "../features/profile/ProfileSettingsScreen"
import PasswordChangeScreen from "../features/profile/PasswordChangeScreen";
import ComingSoonScreen from "../features/profile/ComingSoonScreen"
import ConnectedDevicesScreen from "../features/profile/ConnectedDevice"
import AboutScreen from "../features/profile/AboutPage"
import PremiumSubscriptionScreen from "../features/subscription/SubscriptionScreen"
import MySubscriptionScreen from "../features/subscription/MyPlanScreen"
import PlanSubscriptionScreen from "../features/subscription/PlanScreen"
import SubscriptionCancellationScreen from "../features/subscription/SubscriptionCancellationScreen"
import StoryScreen from "../features/stories/StoryScreen"
import CreateStoryScreen from "../features/stories/CreateStoryScreen"
import PlayStoryScreen from "../features/stories/PlayScreen"

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
    AddChild: undefined
    QuizHome: undefined
    SurveyQuestion: undefined
    QuizResult: undefined
    journals: undefined
    AddJournal: undefined
    Emotional: undefined
    FamilyProfile: undefined
    FamilyProfileDetail: undefined
    ChildProfileDetail: undefined
    ChildProfile: undefined
    ProfileSettingsScreen: undefined
    PasswordChangeScreen: undefined
    ComingSoonScreen: undefined
    ConnectedDevicesScreen: undefined
    AboutScreen: undefined
    PremiumSubscriptionScreen: undefined
    MySubscriptionScreen: undefined
    PlanSubscriptionScreen: undefined
    SubscriptionCancellationScreen: undefined
    StoryScreen: undefined
    CreateStoryScreen: undefined
    PlayStoryScreen: undefined
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
            <Stack.Screen name="Tutorial" component={Tutorial} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="TutorialStep1" component={TutorialStep1} />
            <Stack.Screen name="TutorialStep2" component={TutorialStep2} />
            <Stack.Screen name="TutorialStep3" component={TutorialStep3} />
            <Stack.Screen name="TutorialStep4" component={TutorialStep4} />
            <Stack.Screen name="TutorialStep5" component={TutorialStep5} />
            <Stack.Screen name="AddChild" component={AddChildScreen} />
            <Stack.Screen name="QuizHome" component={QuizzesScreen} />


            <Stack.Screen name="SurveyQuestion" component={SurveyQuestionScreen} />
            <Stack.Screen name="QuizResult" component={QuizResult} />
            <Stack.Screen name="journals" component={JournalScreen} />
            <Stack.Screen name="AddJournal" component={AddJournal} />
            <Stack.Screen name="Emotional" component={Emotional} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="FamilyProfile" component={FamilyProfile} />

            <Stack.Screen name="FamilyProfileDetail" component={FamilyProfileDetail} />
            <Stack.Screen name="ChildProfileDetail" component={ChildProfileDetail} />
            <Stack.Screen name="ChildProfile" component={ChildProfile} />
            <Stack.Screen name="ProfileSettingsScreen" component={ProfileSettingsScreen} />
            <Stack.Screen name="PasswordChangeScreen" component={PasswordChangeScreen} />
            <Stack.Screen name="ComingSoonScreen" component={ComingSoonScreen} />
            <Stack.Screen name="ConnectedDevicesScreen" component={ConnectedDevicesScreen} />

            <Stack.Screen name="PremiumSubscriptionScreen" component={PremiumSubscriptionScreen} />
            <Stack.Screen name="MySubscriptionScreen" component={MySubscriptionScreen} />
            <Stack.Screen name="PlanSubscriptionScreen" component={PlanSubscriptionScreen} />

            <Stack.Screen name="AboutScreen" component={AboutScreen} />
            <Stack.Screen name="SubscriptionCancellationScreen" component={SubscriptionCancellationScreen} />



            <Stack.Screen name="StoryScreen" component={StoryScreen} />
            <Stack.Screen name="CreateStoryScreen" component={CreateStoryScreen} />
            <Stack.Screen name="PlayStoryScreen" component={PlayStoryScreen} />





        </Stack.Navigator>
    );
}
