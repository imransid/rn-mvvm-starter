import { ALERT_TYPE, Toast } from "react-native-alert-notification"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const colors = {
    primaryButton: "#1AA7A9",
    disabledButton: "#BCE6EA",
    primaryTextColor: "#1AA7A9",
    secondaryTextColor: "#F4978E",
    gray600: "#535862",
    primaryBackground: "#E9EAEB",
    secondaryBackground: "#fff",
    primaryBorder: "#E9EAEB",
    primaryBg: "#effaff",
}

export const toasts = (message: string) => {
    Toast.show({
        type: message.match('success') ? ALERT_TYPE.SUCCESS : ALERT_TYPE.DANGER,
        title: message.match('success') ? 'Success' : 'Error',
        textBody: message,
    })
}

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('access_token');
    if (value !== null) {
      // value previously stored
      return value
    }
  } catch (e) {
    // error reading value
  }
};
