import styled from "styled-components";
import { ABOUT_SCROLLER_WORDS, Color } from "../constants/constants";
import { Row } from "./common/Row";
import Spacer from "./Spacer";
import StyledText from "./common/StyledText";
import TopBar from "./TopBar";
import Scroller from "./Scroller";
import IconButton from "./common/IconButton";
import { HiArrowRight, HiMiniPlay } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { Footer, LinkText, PageWrapper } from "./common/common";
import FormattedWords from "./FormattedWords";

const AboutContainer = styled.div`
  width: auto;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding: 24px;
`;

const AboutText = styled.div`
  max-width: 600px;
  text-align: center;
  margin: auto;
`;

function About() {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <AboutContainer>
        <Spacer height={24} />
        <TopBar />
        <Spacer height={24} />
        <Row center>
          <StyledText weight={600} size={60}>
            how
          </StyledText>
          <StyledText weight={600} size={60} color={Color.YELLOW}>
            2
          </StyledText>
          <StyledText weight={600} size={60}>
            play
          </StyledText>
        </Row>
        <Spacer height={24} />
        <AboutText>
          <p>
            <StyledText>hey there -- you’ve found </StyledText>
            <StyledText color={Color.PINK}>linky</StyledText>
            <StyledText>
              , a word connection game that blends in a bit of vocabulary and
              strategy.
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
              <LinkText href="/">linking!</LinkText>
            </StyledText>
          </p>
          <Spacer height={24} />
          <IconButton
            icon={HiMiniPlay}
            label="ready to play?"
            onClick={() => navigate("/")}
          />
        </AboutText>
      </AboutContainer>
      <Footer>
        <Row center>
          <StyledText color={Color.SECONDARY_TEXT}>
            {"made with <3 by "}
            <LinkText href="https://gracewgao.me/">grace</LinkText>
          </StyledText>
        </Row>
        <Spacer height={8} />
        <Scroller
          wordList={ABOUT_SCROLLER_WORDS}
          scrollChunk={FormattedWords}
        />
      </Footer>
    </PageWrapper>
  );
}

export default About;
