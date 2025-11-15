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
      d="M21 25C21 25 22 25 23 27C23 27 26.1765 22 29 21"
      stroke="black"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M33 23.1833V20.2803C33 18.6403 33 17.8203 32.5959 17.2853C32.1918 16.7503 31.2781 16.4906 29.4507 15.9711C28.2022 15.6162 27.1016 15.1886 26.2223 14.7983C25.0234 14.2661 24.424 14 24 14C23.576 14 22.9766 14.2661 21.7777 14.7983C20.8984 15.1886 19.7978 15.6162 18.5493 15.9711C16.7219 16.4906 15.8082 16.7503 15.4041 17.2853C15 17.8203 15 18.6403 15 20.2803V23.1833C15 28.8085 20.0628 32.1835 22.594 33.5194C23.2011 33.8398 23.5046 34 24 34C24.4954 34 24.7989 33.8398 25.406 33.5194C27.9372 32.1835 33 28.8085 33 23.1833Z"
      stroke="black"
      strokeWidth={1.25}
      strokeLinecap="round"
    />
  </Svg>
);
export default SVGComponent;
