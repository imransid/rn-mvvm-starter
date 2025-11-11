import React from "react";
import {
    ActivityIndicator,
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleProp,
    TextStyle,
    ViewStyle,
} from "react-native";

type ButtonProps = {
    name?: string;
    textColor?: string;
    bgColor?: string;
    loading?: boolean;
    onclick?: () => void;
    sideimage?: any; // Image source
    icon?: React.ReactNode; // Vector icon or any React element
    styles?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
};

const Button: React.FC<ButtonProps> = ({
    name = "Button",
    textColor = "#fff",
    bgColor = "#13914C",
    loading = false,
    onclick,
    sideimage,
    icon,
    styles,
}) => {
    return (
        <TouchableOpacity
            onPress={loading ? undefined : onclick}
            activeOpacity={0.7}
            style={[
                {
                    backgroundColor: bgColor,
                    borderWidth: 0.7,
                    borderColor: "#D5D7DA",
                    borderRadius: 999,
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    width: "100%",
                    marginBottom: 12,
                    alignItems: "center",
                    justifyContent: "center",
                },
                styles,
            ]}
        >
            {!loading ? (
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    {sideimage && (
                        <Image
                            resizeMode="cover"
                            source={sideimage}
                            style={{ width: 28, height: 28, marginRight: 8 }}
                        />
                    )}
                    {icon && <View style={{ marginRight: 6 }}>{icon}</View>}
                    <Text style={{ color: textColor, fontWeight: "600", fontSize: 16 }}>
                        {name}
                    </Text>
                </View>
            ) : (
                <ActivityIndicator color={"#fbff7c"} />
            )}
        </TouchableOpacity>
    );
};

export default Button;
