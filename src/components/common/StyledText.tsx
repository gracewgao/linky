import styled from "styled-components";
import { Color } from "../../constants/constants";
import { ReactNode } from "react";

interface IStyledText {
  size?: number;
  color?: string;
  weight?: number;
  isFixed?: boolean;
  children: ReactNode;
}

const Text = styled.span<IStyledText>`
  color: ${(props) => props.color ?? Color.PRIMARY_TEXT};
  font-size: ${(props) =>
    props.size
      ? `${props.size}${props.isFixed ? "px" : "rem"}`
      : `clamp(14px, 2vw, 18px)`};
  font-weight: ${(props) => props.weight ?? 400};
`;

function StyledText(props: IStyledText) {
  return <Text {...props} />;
}

export default StyledText;
