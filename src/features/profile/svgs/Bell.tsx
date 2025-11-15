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
      d="M14.5299 26.7696C14.3173 28.1636 15.268 29.1312 16.4321 29.6134C20.8948 31.4622 27.1052 31.4622 31.5679 29.6134C32.732 29.1312 33.6827 28.1636 33.4701 26.7696C33.3394 25.9129 32.6932 25.1995 32.2144 24.5029C31.5873 23.5793 31.525 22.5718 31.5249 21.5C31.5249 17.3579 28.1559 14 24 14C19.8441 14 16.4751 17.3579 16.4751 21.5C16.475 22.5718 16.4127 23.5793 15.7856 24.5029C15.3068 25.1995 14.6606 25.9129 14.5299 26.7696Z"
      stroke="#0A0D12"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 31C20.4585 32.7252 22.0755 34 24 34C25.9245 34 27.5415 32.7252 28 31"
      stroke="#0A0D12"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
