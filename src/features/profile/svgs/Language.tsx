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
      d="M19 20.3793H23.5M29 20.3793H26.5M23.5 20.3793H26.5M23.5 20.3793V19M26.5 20.3793C25.9725 22.2656 24.8679 24.0487 23.6071 25.6158M20.3929 29C21.412 28.0628 22.5631 26.9134 23.6071 25.6158M23.6071 25.6158C22.9643 24.8621 22.0643 23.6426 21.8071 23.0909M23.6071 25.6158L25.5357 27.6207"
      stroke="#0A0D12"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.5 24C14.5 19.5217 14.5 17.2825 15.8912 15.8912C17.2825 14.5 19.5217 14.5 24 14.5C28.4783 14.5 30.7175 14.5 32.1088 15.8912C33.5 17.2825 33.5 19.5217 33.5 24C33.5 28.4783 33.5 30.7175 32.1088 32.1088C30.7175 33.5 28.4783 33.5 24 33.5C19.5217 33.5 17.2825 33.5 15.8912 32.1088C14.5 30.7175 14.5 28.4783 14.5 24Z"
      stroke="#0A0D12"
      strokeWidth={1.5}
    />
  </Svg>
);
export default SVGComponent;
