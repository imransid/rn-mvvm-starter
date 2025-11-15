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
      d="M27 17C27 18.6569 25.2418 20.5 24 20.5C22.7582 20.5 21 18.6569 21 17C21 15.3431 22.3431 14 24 14C25.6569 14 27 15.3431 27 17Z"
      stroke="#181D27"
      strokeWidth={1.5}
    />
    <Path
      d="M28.0415 21C29.5645 22.3353 30.5513 24.5969 29.6651 26.7052C29.4742 27.1594 29.0361 27.4539 28.5514 27.4539C28.0585 27.4539 27.2489 27.296 27.0917 27.9374L25.9944 32.4123C25.7656 33.3454 24.9433 34 24 34C23.0567 34 22.2344 33.3454 22.0056 32.4123L20.9083 27.9374C20.751 27.296 19.9415 27.4539 19.4486 27.4539C18.9639 27.4539 18.5258 27.1594 18.3349 26.7052C17.4487 24.5969 18.4356 22.3353 19.9586 21"
      stroke="#181D27"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);
export default SVGComponent;
