import styled from "styled-components";
import { Color } from "../../constants/constants";
import { ReactNode } from "react";

interface IStyledText {
  size?: number;
  color?: string;
  weight?: number;
  children: ReactNode;
}

const Text = styled.span<IStyledText>`
  color: ${(props) => props.color ?? Color.PRIMARY_TEXT};
  font-size: ${(props) => props.size ?? 18}px;
  font-weight: ${(props) => props.weight ?? 400};
`;

function StyledText(props: IStyledText) {
  return <Text {...props} />;
}

export default StyledText;
