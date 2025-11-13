import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Reusable AuthButton component
const AuthButton = ({ onPress, text }: any) => (
    <TouchableOpacity style={styles.authButton} onPress={onPress}>
        <View style={styles.authButtonContent}>{text}</View>
    </TouchableOpacity>
);

const GoogleLogin = ({ small }: any) => {
    return (
        <View>
            {!small && (
                <AuthButton
                    onPress={() => { }}
                    text={
                        <>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <Path
                                    d="M24 12.2729C24 11.422 23.9221 10.6038 23.7773 9.81836H12.2449V14.4602H18.8349C18.551 15.9602 17.6883 17.2311 16.3914 18.082V21.0929H20.3488C22.6642 19.0038 24 15.9275 24 12.2729Z"
                                    fill="#4285F4"
                                />
                                <Path
                                    d="M12.2449 23.9993C15.551 23.9993 18.3228 22.9248 20.3488 21.092L16.3914 18.0811C15.295 18.8011 13.8924 19.2266 12.2449 19.2266C9.05562 19.2266 6.35617 17.1157 5.39328 14.2793H1.30237V17.3884C3.31721 21.3102 7.45821 23.9993 12.2449 23.9993Z"
                                    fill="#34A853"
                                />
                                <Path
                                    d="M5.39332 14.2804C5.14843 13.5604 5.00928 12.7913 5.00928 12.0004C5.00928 11.2095 5.14843 10.4404 5.39332 9.72042V6.61133H1.30241C0.445269 8.28354 -0.000755428 10.1291 9.60431e-07 12.0004C9.60431e-07 13.9368 0.4731 15.7695 1.30241 17.3895L5.39332 14.2804Z"
                                    fill="#FBBC05"
                                />
                                <Path
                                    d="M12.2449 4.77273C14.0426 4.77273 15.6567 5.37819 16.9258 6.56728L20.4378 3.12546C18.3172 1.18909 15.5454 0 12.2449 0C7.45821 0 3.31721 2.68909 1.30237 6.61092L5.39328 9.72001C6.35617 6.88364 9.05562 4.77273 12.2449 4.77273Z"
                                    fill="#EA4335"
                                />
                            </Svg>
                            <Text style={styles.authText}> Sign in with Google</Text>
                        </>
                    }
                />
            )}

            {small && (
                <TouchableOpacity style={styles.smallButton}>
                    <Image
                        source={require('../../assets/images/login/google.png')}
                        style={styles.iconSmall}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default GoogleLogin;

// --------------------
// Styles
// --------------------
const styles = StyleSheet.create({
    authButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        elevation: 2,
    },
    authButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authText: {
        color: '#0A0D12',
        fontWeight: '500',
        fontSize: 16,
    },
    smallButton: {
        backgroundColor: '#FFFFFF',
        padding: 5,
        width: 60,
        height: 56,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
    },
    iconSmall: {
        width: 28,
        height: 28,
    },
});
