// src/components/BottomSheet.tsx
import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Language {
  name: string;
  label: string;
}

interface BottomSheetProps {
  setValue: (val: string) => void;
  selectedValue: string;
  setShowModal: (val: boolean) => void;
  showModal: boolean;
  data: Language[];
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  setValue,
  selectedValue,
  setShowModal,
  showModal,
  data,
}) => {
  const handleSelect = (language: Language) => {
    setValue(language.name);
  };

  const handleContinue = () => {
    setShowModal(false);
    // Example: navigation.navigate('WelcomeScreen');
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        statusBarTranslucent
      >
        <View style={styles.overlay}>
          <View style={styles.sheetContainer}>
            <Text style={styles.title}>Select Item</Text>

            <FlatList
              data={data}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.itemContainer,
                    selectedValue === item.name
                      ? styles.itemSelected
                      : styles.itemUnselected,
                  ]}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color={
                      selectedValue === item.name ? '#053b29' : '#c6c6c68a'
                    }
                  />
                </TouchableOpacity>
              )}
            />

            {/* Continue Button */}
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    height: '50%',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 30,
    marginBottom: 10,
    borderWidth: 1,
  },
  itemSelected: {
    backgroundColor: '#f5f5f5',
    borderColor: '#f5f5f5',
  },
  itemUnselected: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  itemText: {
    flex: 1,
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#007AFF', // replace with your theme color
    borderRadius: 30,
    paddingVertical: 14,
    marginTop: 10,
    elevation: 2,
  },
  continueText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
  },
});
