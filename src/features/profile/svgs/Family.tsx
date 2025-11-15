import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";
const SVGComponent = (props: any) => (
  <Svg
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x={0.5} y={0.5} width={47} height={47} rx={23.5} fill="white" />
    <Rect x={0.5} y={0.5} width={47} height={47} rx={23.5} stroke="#E9EAEB" />
    <Path
      d="M32.774 30C33.5233 30 34.1193 29.5285 34.6545 28.8691C35.7499 27.5194 33.9513 26.4408 33.2654 25.9126C32.568 25.3756 31.7894 25.0714 31 25M30 23C31.3807 23 32.5 21.8807 32.5 20.5C32.5 19.1193 31.3807 18 30 18"
      stroke="#181D27"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M15.226 30C14.4767 30 13.8807 29.5285 13.3455 28.8691C12.2501 27.5194 14.0487 26.4408 14.7346 25.9126C15.432 25.3756 16.2106 25.0714 17 25M17.5 23C16.1193 23 15 21.8807 15 20.5C15 19.1193 16.1193 18 17.5 18"
      stroke="#181D27"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M20.0838 27.1112C19.062 27.743 16.383 29.0331 18.0147 30.6474C18.8118 31.436 19.6995 32 20.8156 32H27.1844C28.3005 32 29.1882 31.436 29.9853 30.6474C31.617 29.0331 28.938 27.743 27.9162 27.1112C25.5201 25.6296 22.4799 25.6296 20.0838 27.1112Z"
      stroke="#181D27"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M27.5 19.5C27.5 21.433 25.933 23 24 23C22.067 23 20.5 21.433 20.5 19.5C20.5 17.567 22.067 16 24 16C25.933 16 27.5 17.567 27.5 19.5Z"
      stroke="#181D27"
      strokeWidth={1.5}
    />
  </Svg>
);
export default SVGComponent;
