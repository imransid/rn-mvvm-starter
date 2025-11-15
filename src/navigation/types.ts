
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Tutorial2: undefined;
  TutorialStep1: undefined;
  Profile: { userId: string };
  EmptyScreen: { nav?: string }; 
   WelcomeAuth: undefined;
   SurveyQuestion: {session ?: any}
  // add other routes here
};

export type AuthStackParamList = {
  OnBoard: undefined;
  WelcomeAuth: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Verify: { email: string };
  ResetPassword: {otp : string, email: string};
  EmptyScreen: { nav?: string }; 
};