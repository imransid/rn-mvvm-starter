
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Header: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* 🧾 Title */}
      <Text style={styles.title}>Add a Child</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: 48, // similar to mt-12
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    height: 50,
    width: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // adds subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.4,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 10,
    color: '#000',
  },
});
