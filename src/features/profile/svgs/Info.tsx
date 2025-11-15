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
    <Circle cx={24} cy={24} r={10} stroke="black" strokeWidth={1.5} />
    <Path
      d="M22 21C22 19.8954 22.8954 19 24 19C25.1046 19 26 19.8954 26 21C26 21.3982 25.8837 21.7691 25.6831 22.0808C25.0854 23.0097 24 23.8954 24 25V25.5"
      stroke="black"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M23.992 29H24.001"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
