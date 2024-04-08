import styled from "styled-components";
import { Color } from "../../constants/constants";
import Spacer from "./Spacer";
import { Row } from "./Row";
import StyledText from "./StyledText";

interface IIconButton {
  icon: any;
  size?: number;
  color?: Color;
  label?: string;
  onClick?: () => void;
}

const StyledButton = styled.button<IIconButton>`
  color: ${(props) => props.color ?? Color.SECONDARY_TEXT};
  cursor: pointer;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;

  :hover {
    color: ${Color.PRIMARY_TEXT};
  }
`;

function IconButton(props: IIconButton) {
  return (
    <StyledButton {...props}>
      <Row>
        <props.icon size={props.size ?? 24} />
        {props.label ? (
          <>
            <Spacer width={8} isFixed />
            <StyledText
              color={"inherit"}
            >
              {props.label}
            </StyledText>
          </>
        ) : null}
      </Row>
    </StyledButton>
  );
}

export default IconButton;
