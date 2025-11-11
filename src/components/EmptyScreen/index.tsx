import { colors } from '../../assets/lib';
import Button from '../Button';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

interface EmptyScreenProps {
    title?: string;
    description?: string;
    buttonTitle?: string;
    route?: keyof RootStackParamList; // Home | Login | Profile
    image?: any;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const EmptyScreen: React.FC<EmptyScreenProps> = ({
    title,
    description,
    buttonTitle,
    route = 'Home', // default route
    image,
}) => {
    const navigation = useNavigation<NavigationProp>();

    // ✅ correct navigation call
    const handlePress = () => {
        switch (route) {
            case 'Home':
                navigation.navigate('Home');
                break;
            case 'Login':
                navigation.navigate('Login');
                break;
            case 'Profile':
                // Profile expects params, must provide them
                navigation.navigate('Profile', { userId: '123' });
                break;
            default:
                navigation.navigate('Home');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={image ?? require('../../assets/images/login/done.png')}
                style={styles.image}
                resizeMode="contain"
            />

            <View style={styles.textContainer}>
                <Text style={styles.title}>{title ?? 'All Set!'}</Text>
                <Text style={styles.description}>
                    {description ??
                        'You’re one step closer to a calmer, more connected parenting experience.'}
                </Text>
            </View>

            <Button
                name={buttonTitle ?? 'Let’s Explore'}
                textColor="#fff"
                bgColor={colors.primaryButton}
                onclick={handlePress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
    },
    textContainer: {
        marginTop: 16,
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        color: '#414651',
        textAlign: 'center',
        marginVertical: 8,
    },
});

export default EmptyScreen;
