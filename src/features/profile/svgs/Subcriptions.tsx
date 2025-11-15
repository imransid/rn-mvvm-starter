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
      d="M14 24C14 20.4625 14 18.6938 15.0528 17.5129C15.2212 17.324 15.4068 17.1494 15.6075 16.9909C16.8621 16 18.7414 16 22.5 16H25.5C29.2586 16 31.1379 16 32.3925 16.9909C32.5932 17.1494 32.7788 17.324 32.9472 17.5129C34 18.6938 34 20.4625 34 24C34 27.5375 34 29.3062 32.9472 30.4871C32.7788 30.676 32.5932 30.8506 32.3925 31.0091C31.1379 32 29.2586 32 25.5 32H22.5C18.7414 32 16.8621 32 15.6075 31.0091C15.4068 30.8506 15.2212 30.676 15.0528 30.4871C14 29.3062 14 27.5375 14 24Z"
      stroke="#0A0D12"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 28H23.5"
      stroke="#0A0D12"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M26.5 28L30 28"
      stroke="#0A0D12"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 21H34"
      stroke="#0A0D12"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
