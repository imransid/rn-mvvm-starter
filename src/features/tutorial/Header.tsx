import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface HeaderProps {
    elementNo: number;
}

const Header: React.FC<HeaderProps> = ({ elementNo }) => {
    const navigation = useNavigation<NavigationProp>();
    const totalSteps = 6;

    return (
        <View style={styles.container}>
            <View style={styles.progressContainer}>
                {[...Array(totalSteps)].map((_, index) => (
                    <View key={index} style={styles.progressBarBackground}>
                        {elementNo > index && <View style={styles.progressBarFill} />}
                    </View>
                ))}
            </View>

            <TouchableOpacity
                style={styles.skipButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 64,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressContainer: {
        flexDirection: 'row',
        gap: 4,
    },
    progressBarBackground: {
        height: 6,
        width: 53,
        backgroundColor: '#ffffff50', // light white background
        borderRadius: 3,
        overflow: 'hidden',
        marginRight: 4,
    },
    progressBarFill: {
        height: 6,
        width: 53,
        backgroundColor: '#0077b6', // active step color
        borderRadius: 3,
    },
    skipButton: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    skipText: {
        color: '#fff',
        fontWeight: '500',
    },
});

export default Header;
