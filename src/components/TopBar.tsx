import { BiLogoGithub } from "react-icons/bi";
import { HiBookOpen } from "react-icons/hi2";
import IconButton from "./common/IconButton";
import { Row } from "./common/Row";
import Spacer from "./common/Spacer";
import StyledText from "./common/StyledText";
import { useNavigate } from "react-router-dom";
import { LinkText } from "./common/common";
import { ReactComponent as LogoSvg } from "../assets/logo.svg";
import styled from "styled-components";
import { Color } from "../constants/constants";

interface ITopBar {
  homepage?: boolean;
}

const Logo = styled(LogoSvg)<ITopBar>`
  height: 24px;
  width: 24px;
  fill: ${(props) => (props.homepage ? Color.YELLOW : Color.SECONDARY_TEXT)};
`;

function TopBar(props: ITopBar) {
  const navigate = useNavigate();
  return (
    <Row>
      <Logo {...props} />
      <Spacer width={8} isFixed />
      <LinkText href="/linky">
        <StyledText
          size={1.5}
          weight={600}
          color={props.homepage ? Color.PRIMARY_TEXT : Color.SECONDARY_TEXT}
        >
          linky
        </StyledText>
      </LinkText>
      <Spacer width={1} />
      <IconButton
        icon={HiBookOpen}
        color={props.homepage ? Color.SECONDARY_TEXT : Color.YELLOW}
        onClick={() => navigate("/about")}
      />
      <IconButton
        icon={BiLogoGithub}
        onClick={() => {
          window.open("https://github.com/gracewgao/linky", "_blank");
        }}
      />
    </Row>
  );
}

export default TopBar;
