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
      d="M28 18.5C27.9377 16.7875 27.7251 15.7501 26.9988 15.0251C25.9718 14 24.3188 14 21.0129 14C17.707 14 16.054 14 15.027 15.0251C14 16.0503 14 17.7002 14 21V27C14 30.2998 14 31.9497 15.027 32.9749C16.054 34 17.707 34 21.0129 34C24.3188 34 25.9718 34 26.9988 32.9749C27.7251 32.2499 27.9377 31.2125 28 29.5"
      stroke="#141B34"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M20 31H22"
      stroke="#141B34"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M28 23.9918L28 24.0008M32.0483 28.4922C33.2541 27.3405 34 25.7495 34 23.9922C34 22.2348 33.2541 20.6438 32.0483 19.4922M30 21.7422C30.6029 22.318 30.9759 23.1135 30.9759 23.9922C30.9759 24.8709 30.6029 25.6664 30 26.2422"
      stroke="#141B34"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M18 14L18.089 14.534C18.2819 15.6913 18.3783 16.2699 18.7752 16.622C19.1892 16.9893 19.7761 17 21 17C22.2239 17 22.8108 16.9893 23.2248 16.622C23.6217 16.2699 23.7181 15.6913 23.911 14.534L24 14"
      stroke="#141B34"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
