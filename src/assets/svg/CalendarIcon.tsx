import React from "react";
import Svg, { Path } from "react-native-svg";

interface CalendarIconProps {
  size?: number;
  color?: string;
  style?: object;
}

const CalendarIcon: React.FC<CalendarIconProps> = ({
  size = 22,
  color = "#535862",
  style,
}) => {
  return (
    <Svg
      style={[{ position: "absolute", left: 20, top: 20, zIndex: 50 }, style]}
      width={size}
      height={size}
      viewBox="0 0 21 22"
      fill="none"
    >
      <Path
        d="M16.25 0.75V2.75M4.25 0.75V2.75"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.2455 11.75H10.2545M10.2455 15.75H10.2545M14.241 11.75H14.25M6.25 11.75H6.25897M6.25 15.75H6.25897"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.75 6.75H18.75"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M0.75 10.9932C0.75 6.63594 0.75 4.45728 2.00212 3.10364C3.25424 1.75 5.26949 1.75 9.3 1.75H11.2C15.2305 1.75 17.2458 1.75 18.4979 3.10364C19.75 4.45728 19.75 6.63594 19.75 10.9932V11.5068C19.75 15.8641 19.75 18.0427 18.4979 19.3964C17.2458 20.75 15.2305 20.75 11.2 20.75H9.3C5.26949 20.75 3.25424 20.75 2.00212 19.3964C0.75 18.0427 0.75 15.8641 0.75 11.5068V10.9932Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.25 6.75H19.25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CalendarIcon;
