import { ALERT_TYPE, Toast } from "react-native-alert-notification"

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

export const toasts = (message: string, type?: "success" | "error") => {
  Toast.show({
    type: type === "success" ? ALERT_TYPE.SUCCESS : ALERT_TYPE.DANGER,
    title: message.match('success') || type === "success" ? 'Success' : 'Error',
    textBody: message,
  })
}
