import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Reusable AuthButton
const AuthButton = ({ onPress, text }: any) => (
    <TouchableOpacity style={styles.authButton} onPress={onPress}>
        <View style={styles.authButtonContent}>{text}</View>
    </TouchableOpacity>
);

const FacebookLogin = ({ small }: any) => {
    return (
        <View>
            {!small && (
                <AuthButton
                    onPress={() => { }}
                    text={
                        <>
                            <Svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <Path
                                    d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.6277 3.87431 22.3498 9.10107 23.6466V15.667H6.62658V12H9.10107V10.4199C9.10107 6.33546 10.9495 4.44235 14.9594 4.44235C15.7196 4.44235 17.0314 4.59138 17.568 4.74047V8.06466C17.2848 8.03485 16.7929 8.01992 16.1817 8.01992C14.214 8.01992 13.4538 8.76527 13.4538 10.7031V12H17.3734L16.7 15.667H13.4538V23.9121C19.3955 23.1944 24 18.1352 24 12Z"
                                    fill="#0866FF"
                                />
                                <Path
                                    d="M16.7 15.6661L17.3734 11.9991H13.4537V10.7022C13.4537 8.76433 14.214 8.01903 16.1816 8.01903C16.7928 8.01903 17.2847 8.03391 17.568 8.06372V4.73958C17.0313 4.59049 15.7195 4.44141 14.9593 4.44141C10.9494 4.44141 9.10102 6.33457 9.10102 10.419V11.9991H6.62653V15.6661H9.10102V23.6457C10.0295 23.876 11.0003 23.9991 11.9999 23.9991C12.4921 23.9991 12.9771 23.9687 13.4537 23.9112V15.6661H16.7Z"
                                    fill="white"
                                />
                            </Svg>
                            <Text style={styles.authText}> Sign in with Facebook</Text>
                        </>
                    }
                />
            )}

            {small && (
                <TouchableOpacity style={styles.smallButton}>
                    <Image
                        source={require('../../assets/images/login/fb.png')}
                        style={styles.iconSmall}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default FacebookLogin;

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
