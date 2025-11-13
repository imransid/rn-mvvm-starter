import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';

// Custom AuthButton component
const AuthButton = ({ onPress, text }: any) => (
    <TouchableOpacity style={styles.authButton} onPress={onPress}>
        <View style={styles.authButtonContent}>{text}</View>
    </TouchableOpacity>
);

const EmailLogin = ({ small }: any) => {
    return (
        <View>
            {!small && (
                <AuthButton
                    onPress={() => { }}
                    text={
                        <>
                            <Image
                                source={require('../../assets/images/login/email.png')}
                                resizeMode="contain"
                                style={styles.icon}
                            />
                            <Text style={styles.authText}> Sign in with Email</Text>
                        </>
                    }
                />
            )}

            {small && (
                <TouchableOpacity style={styles.smallButton}>
                    <Image
                        source={require('../../assets/images/login/google.png')}
                        style={styles.googleIcon}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default EmailLogin;

// ------------------
// Styles
// ------------------
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
    icon: {
        width: 20,
        height: 20,
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
    googleIcon: {
        width: 28,
        height: 28,
    },
});
