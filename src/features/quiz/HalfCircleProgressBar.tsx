import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../assets/lib';

interface GaugeProgressProps {
    progress?: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    bgColor?: string;
}

const GaugeProgress: React.FC<GaugeProgressProps> = ({
    progress = 0.2,
    size = 200,
    strokeWidth = 20,
    color = colors.primaryButton,
    bgColor = '#ddeff1',
}) => {
    const radius = (size - strokeWidth) / 2;
    const centerX = size / 2;
    const centerY = size / 2;

    // Start at -135° (top-left), end at +135° (top-right)
    const startAngle = (5 * Math.PI) / 7; // 225°
    const maxAngle = (7 * Math.PI) / 7;   // 315°
    const endAngle = startAngle + Math.PI * progress * 1.6; // max 270°

    const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => ({
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
    });

    const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
        const start = polarToCartesian(cx, cy, r, endAngle);
        const end = polarToCartesian(cx, cy, r, startAngle);
        const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';

        return ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 0, end.x, end.y].join(' ');
    };

    const backgroundPath = describeArc(centerX, centerY, radius, startAngle, 208.3);
    const progressPath = describeArc(centerX, centerY, radius, startAngle, endAngle);

    return (
        <View style={styles.container}>
            <View style={{ position: 'relative', width: size, height: size }}>
                <Svg width={size} height={size}>
                    {/* Background arc (full 270°) */}
                    <Path d={backgroundPath} stroke={bgColor} strokeWidth={strokeWidth} fill="none" />
                    {/* Progress arc */}
                    <Path d={progressPath} stroke={color} strokeWidth={strokeWidth} fill="none" />
                </Svg>
                <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
            </View>
            <Text style={styles.label}>Overall Score</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressText: {
        position: 'absolute',
        top: '40%',
        width: '100%',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.primaryTextColor,
    },
    label: {
        marginTop: -36,
        fontSize: 18,
        fontWeight: '600',
        color: colors.primaryTextColor,
    },
});

export default GaugeProgress;
