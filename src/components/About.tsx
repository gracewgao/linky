import styled from "styled-components";
import { ABOUT_SCROLLER_WORDS, Color } from "../constants/constants";
import { Row } from "./common/Row";
import Spacer from "./common/Spacer";
import StyledText from "./common/StyledText";
import TopBar from "./TopBar";
import Scroller from "./Scroller";
import IconButton from "./common/IconButton";
import { HiMiniPlay } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { Container, Footer, LinkText, PageWrapper } from "./common/common";
import FormattedWords from "./FormattedWords";

const AboutText = styled.div`
  max-width: 600px;
  text-align: center;
  margin: auto;
`;

function About() {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Spacer height={1} />
      <Container>
        <TopBar />
        <Spacer height={2} />
        <Row center>
          <StyledText weight={600} size={3}>
            how
          </StyledText>
          <StyledText weight={600} size={3} color={Color.YELLOW}>
            2
          </StyledText>
          <StyledText weight={600} size={3}>
            play
          </StyledText>
        </Row>
        <Spacer height={1} />
        <AboutText>
          <p>
            <StyledText>hey! you’ve found </StyledText>
            <StyledText color={Color.PINK}>linky</StyledText>
            <StyledText>
              , a colorful word connection game.
            </StyledText>
          </p>
          <p>
            <StyledText>
              to play, enter any valid word but choose wisely! the last letter
              will be the
              <StyledText color={Color.RED}> link </StyledText>
              to the start of your next word. collect
              <StyledText color={Color.GREEN}> chunks </StyledText>
              and win
              <StyledText color={Color.LIGHT_BLUE}> points </StyledText>
              by including them in your words.
            </StyledText>
          </p>
          <p>
            <StyledText>happy </StyledText>
            <StyledText color={Color.YELLOW}>
              <LinkText href="/linky">linking!</LinkText>
            </StyledText>
          </p>
          <Spacer height={1} />
          <IconButton
            icon={HiMiniPlay}
            label="ready to play?"
            onClick={() => navigate("/")}
          />
        </AboutText>
      </Container>
      <Footer>
        <Row center>
          <StyledText color={Color.SECONDARY_TEXT}>
            {"made with <3 by "}
            <LinkText href="https://gracewgao.me/">grace</LinkText>
          </StyledText>
        </Row>
        <Spacer height={0.5} />
        <Scroller
          wordList={ABOUT_SCROLLER_WORDS}
          scrollChunk={FormattedWords}
        />
      </Footer>
    </PageWrapper>
  );
}

export default About;
