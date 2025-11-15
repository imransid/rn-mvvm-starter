import * as React from "react";
import Svg, { SvgProps, Rect, Circle, Path } from "react-native-svg";
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
    <Circle cx={24} cy={24} r={10} stroke="#0A0D12" strokeWidth={1.5} />
    <Path
      d="M19.5 29C21.8317 26.5578 26.1432 26.4428 28.5 29M26.4951 21.5C26.4951 22.8807 25.3742 24 23.9915 24C22.6089 24 21.488 22.8807 21.488 21.5C21.488 20.1193 22.6089 19 23.9915 19C25.3742 19 26.4951 20.1193 26.4951 21.5Z"
      stroke="#0A0D12"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);
export default SVGComponent;
