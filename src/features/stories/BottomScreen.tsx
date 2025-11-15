import React from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface BottomSheetProps {
    setValue: (val: any) => void;
    selectedValue: any[]; // now always array
    setShowModal: (val: boolean) => void;
    showModal: boolean;
    data: any[];
    icon?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
    setValue,
    selectedValue,
    setShowModal,
    showModal,
    data,
    icon = false,
}) => {
    const handleSelect = (item: any) => {
        if (selectedValue.includes(item.name)) {
            // remove if already selected
            setValue(selectedValue.filter((v) => v !== item.name));
        } else {
            // add if not selected
            setValue([...selectedValue, item.name]);
        }
    };

    const handleContinue = () => setShowModal(false);

    const renderItem = ({ item }: { item: any }) => {
        const isSelected = selectedValue.includes(item.name);
        return (
            <TouchableOpacity
                style={[styles.itemContainer, isSelected ? styles.itemSelected : styles.itemUnselected]}
                onPress={() => handleSelect(item)}
            >
                {icon && item.icon && <Image source={item.icon} style={styles.itemIcon} />}
                <Text style={styles.itemText}>{item.name}</Text>
                {isSelected && <Ionicons name="checkmark" size={20} color="#053b29" />}
            </TouchableOpacity>
        );
    };

    return (
        <Modal visible={showModal} transparent animationType="slide" statusBarTranslucent>
            <View style={styles.overlay}>
                <View style={styles.sheetContainer}>
                    <Text style={styles.title}>Select Item</Text>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.name}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    />
                    <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                        <Text style={styles.continueText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default BottomSheet;

const styles = StyleSheet.create({
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
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 30,
        marginBottom: 10,
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#ddd',
    },
    itemSelected: {
        backgroundColor: '#85b1763b',
        borderColor: '#adcda3',
    },
    itemUnselected: {},
    itemText: {
        flex: 1,
        fontSize: 16,
    },
    itemIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    continueButton: {
        backgroundColor: '#007AFF',
        borderRadius: 30,
        paddingVertical: 14,
        marginTop: 10,
    },
    continueText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 18,
    },
});
