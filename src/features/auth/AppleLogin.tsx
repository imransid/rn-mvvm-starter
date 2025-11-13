import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import Icon from "react-native-vector-icons/FontAwesome";

// ✅ Replace your AuthButton or import from your local component
const AuthButton = ({ onPress, text }: { onPress: () => void; text: React.ReactNode }) => (
  <TouchableOpacity style={styles.authButton} onPress={onPress}>
    <View style={styles.authButtonContent}>{text}</View>
  </TouchableOpacity>
);

interface AppleLoginProps {
  small?: boolean;
}

const AppleLogin: React.FC<AppleLoginProps> = ({ small }) => {
  return (
    <View style={styles.container}>
      {!small ? (
        <AuthButton
          onPress={() => {
            console.log("Apple login pressed");
          }}
          text={
            <>
              <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <Path
                  d="M21.1091 7.84643C21.2587 8.02518 21.202 8.29012 21.0119 8.42488C19.5873 9.43436 18.7229 11.0133 18.7229 12.7529C18.7229 14.7476 19.8773 16.5753 21.6627 17.4494C21.85 17.5411 21.9524 17.7537 21.8834 17.9505C21.5018 19.04 20.9666 20.0525 20.3133 20.9882C19.253 22.4471 18.1446 23.9529 16.506 23.9529C14.8675 23.9529 14.3855 23.0118 12.4578 23.0118C10.5783 23.0118 9.90361 24 8.36145 24C6.81928 24 5.75904 22.6353 4.55422 20.9412C2.96386 18.5882 2.04819 15.8588 2 12.9882C2 8.32941 5.08434 5.83529 8.16867 5.83529C9.80723 5.83529 11.1566 6.87059 12.1687 6.87059C13.1325 6.87059 14.6747 5.78824 16.506 5.78824C18.2875 5.74475 19.9868 6.5051 21.1091 7.84643ZM15.6386 3.81176C16.4578 2.87059 16.8916 1.69412 16.9398 0.470588C16.9398 0.422374 16.9398 0.368671 16.9378 0.313229C16.9314 0.127301 16.7602 0.011735 16.5765 0.0408148C15.2995 0.242903 14.1236 0.878239 13.2771 1.83529C12.4578 2.72941 11.9759 3.85882 11.9277 5.08235C11.9277 5.12977 11.9277 5.17718 11.9295 5.2246C11.9361 5.39558 12.0886 5.5281 12.2585 5.54909C12.2779 5.55149 12.2963 5.55294 12.3133 5.55294C13.6145 5.45882 14.8193 4.8 15.6386 3.81176Z"
                  fill="black"
                />
              </Svg>
              <Text style={styles.text}> Sign in with Apple</Text>
            </>
          }
        />
      ) : (
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => console.log("Apple login small pressed")}
        >
          <Icon name="apple" size={22} color="#000000" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppleLogin;

const styles = StyleSheet.create({
  container: {},
  authButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  authButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallButton: {
    backgroundColor: "#ffffff",
    padding: 16,
    width: 60,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 12,
  },
  text: {
    color: "#0A0D12",
    fontWeight: "500",
    fontSize: 16,
  },
});
