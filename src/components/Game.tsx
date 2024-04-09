import { useEffect, useState } from "react";
import styled from "styled-components";
import { useWordChecker } from "react-word-checker";
import {
  CHUNK_COLORS,
  Color,
  LANGUAGE_OPTIONS,
  SCORE_SCALE,
  TAB_OPTIONS,
  TIME_OPTIONS,
} from "../constants/constants";
import Spacer from "./common/Spacer";
import Timer from "./Timer";
import { HiMiniArrowPath } from "react-icons/hi2";
import IconButton from "./common/IconButton";
import Scroller from "./Scroller";
import StyledText from "./common/StyledText";
import Setting from "./Setting";
import { Row } from "./common/Row";
import TopBar from "./TopBar";
import {
  CHUNKS_EN_2,
  CHUNKS_EN_3,
  CHUNKS_ES_2,
  CHUNKS_ES_3,
  CHUNKS_FR_2,
  CHUNKS_FR_3,
} from "../constants/chunks";
import { Container, Footer, IChunk, IWord, PageWrapper } from "./common/common";
import FormattedWords from "./FormattedWords";
import { useWindowSize } from "./common/windowSize";

const WordInput = styled.input`
  background-color: transparent;
  border: none;
  color: white;
  caret-color: orange;
  padding: 0;
  margin: 0;
  width: 100%;
  outline: none;
  font-size: 5.5rem;
  font-weight: 800;
`;

// todo: absolute width is kinda hacky
const GhostWord = styled.div`
  color: ${Color.SECONDARY_TEXT};
  position: absolute;
  left: -10000px;
  width: 10000px;
  text-align: right;
  overflow: hidden;
`;

const WordRow = styled(Row)`
  font-size: 5.5rem;
  font-weight: 800;
  position: relative;
`;

const Score = styled.div`
  color: ${Color.SECONDARY_TEXT};
  width: 100%;
  font-size: 3.5rem;
  font-weight: 600;
  text-align: right;
`;

const ErrorMsg = styled.p`
  color: ${Color.RED};
  min-height: 1.5rem;
`;

const InfoMsg = styled.p`
  color: ${Color.SECONDARY_TEXT};
  font-size: 1.25rem;
  min-height: 1.25rem;
`;

const ChunkHistoryBlock = styled.div`
  white-space: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;
  width: 100%;
`;

const ActiveChunkRow = styled(Row)`
  align-items: center;
  justify-content: center;
`;

const ActiveChunk = styled.button<IChunk>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: ${(props) => props.color ?? "white"};
  background-color: ${Color.DARK_GREY};
  font-weight: 600;
  font-size: 1.5rem;
  cursor: pointer;
  border: none;

  &:hover {
    color: ${Color.PRIMARY_TEXT};
  }
`;

function Game() {
  const [word, setWord] = useState("");
  const [wordList, setWordList] = useState<IWord[]>([]);
  const [firstLetter, setFirstLetter] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeChunks, setActiveChunks] = useState<IChunk[]>([]);
  const [totalChunks, setTotalChunks] = useState(0);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);

  // settings
  const [timeSetting, setTimeSetting] = useState(60);
  const [languageSetting, setLanguageSetting] = useState("en");
  const [tabSetting, setTabSetting] = useState(true);

  const { words, isLoading, wordExists } = useWordChecker(languageSetting);
  const { width, height, isMobile } = useWindowSize();

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (isLoading) {
      setErrorMsg("still setting things up, try again in a moment!");
    } else {
      setErrorMsg("");
    }
  }, [isLoading]);

  useEffect(() => {
    resetGame();
  }, [languageSetting, timeSetting]);

  useEffect(() => {
    const handleTabKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();
        resetGame();
      }
    };
    if (tabSetting) {
      document.addEventListener("keydown", handleTabKeyDown);
      return () => {
        document.removeEventListener("keydown", handleTabKeyDown);
      };
    } else {
      document.removeEventListener("keydown", handleTabKeyDown);
    }
  }, [tabSetting]);

  const resetGame = () => {
    const initialChunks = [
      getRandomChunk(false),
      getRandomChunk(true),
      getRandomChunk(false),
    ];
    setActiveChunks(initialChunks);
    setWord("");
    setFirstLetter("");
    setErrorMsg("");
    setWordList([]);
    setScore(0);
    setTotalChunks(0);
    setStarted(false);
  };

  const getRandomChunk = (isThreeLetters: boolean) => {
    let CHUNKS;
    switch (languageSetting) {
      case "fr":
        CHUNKS = isThreeLetters ? CHUNKS_FR_3 : CHUNKS_FR_2;
        break;
      case "es":
        CHUNKS = isThreeLetters ? CHUNKS_ES_3 : CHUNKS_ES_2;
        break;
      default:
        CHUNKS = isThreeLetters ? CHUNKS_EN_3 : CHUNKS_EN_2;
        break;
    }
    const i = Math.floor(Math.random() * CHUNKS.length);
    const j = Math.floor(Math.random() * CHUNK_COLORS.length);
    return { chunk: CHUNKS[i], color: CHUNK_COLORS[j] };
  };

  const checkWord = (input: string) => {
    // return undefined if word is invalid
    if (!wordExists(input.toLowerCase())) return;

    let chunkCount = 0;
    const letterChunks: IChunk[] = [];
    for (const letter of input) {
      letterChunks.push({ chunk: letter, color: Color.PRIMARY_TEXT });
    }
    const lowerInput = input.toLowerCase();
    activeChunks.forEach((chunk, i) => {
      if (lowerInput.includes(chunk.chunk)) {
        const start = lowerInput.indexOf(chunk.chunk);
        const end = start + chunk.chunk.length;
        // get random chunk to replace old chunk (second chunk is 3 letters)
        activeChunks[i] = getRandomChunk(i == 1 ? true : false);
        for (let i = start; i < end; i++) {
          letterChunks[i].color = chunk.color;
        }
        chunkCount++;
        setScore(score + SCORE_SCALE * (i == 1 ? 2 : 1));
      }
    });
    setTotalChunks(totalChunks + chunkCount);
    return { fullWord: input, chunks: letterChunks };
  };

  const handleInputChange = (event: any) => {
    setWord(event.target.value);
    if (!started) setStarted(true);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const fullWord = firstLetter + word;
    const resultWord = checkWord(fullWord);
    if (resultWord !== undefined) {
      setWordList([...wordList, resultWord]);
      setFirstLetter(fullWord.charAt(fullWord.length - 1));
      setWord("");
      setErrorMsg("");
    } else {
      setErrorMsg(`'${fullWord}' is not a valid word`);
    }
  };

  const history = wordList
    .slice(-10)
    .map((prevWord) => prevWord.fullWord)
    .join("");

  return (
    <PageWrapper>
      <Timer time={timeSetting} started={started} setEnded={setEnded} />
      <Spacer height={1} />
      <Container>
        <TopBar homepage />
        <Spacer height={2.5} />
        {ended ? (
          <>
            <Row center>
              <StyledText color={Color.PRIMARY_TEXT} size={7} weight={800}>
                {score}
              </StyledText>
            </Row>
            <Row center>
              <StyledText color={Color.LIGHT_PURPLE} size={2.5} weight={600}>
                {totalChunks}
              </StyledText>
              <StyledText size={2.5} weight={600}>
                chunk{totalChunks != 1 ? "s" : ""}
              </StyledText>
            </Row>
            <Row center>
              <StyledText color={Color.LIGHT_BLUE} size={2.5} weight={600}>
                {wordList.length}
              </StyledText>
              <StyledText size={2.5} weight={600}>
                word{wordList.length != 1 ? "s" : ""}
              </StyledText>
            </Row>
            <Spacer height={2} />
            <Row center>
              <IconButton
                icon={HiMiniArrowPath}
                onClick={resetGame}
                size={24}
                label={"play again"}
              />
            </Row>
            <Spacer height={2} />
          </>
        ) : (
          <>
            <ActiveChunkRow>
              {activeChunks.map((chunk, i) => (
                <>
                  <ActiveChunk
                    {...chunk}
                    onClick={() => setWord(word + chunk.chunk)}
                  >
                    {chunk.chunk}
                  </ActiveChunk>
                  {i != 2 ? <Spacer width={1.25} /> : null}
                </>
              ))}
              <br />
            </ActiveChunkRow>
            <Spacer height={2} />
            <WordRow>
              <GhostWord>{history.slice(0, history.length - 1)}</GhostWord>
              {firstLetter}
              <form onSubmit={handleSubmit}>
                <WordInput
                  type="text"
                  value={word}
                  onChange={handleInputChange}
                  placeholder={started ? "" : "start"}
                />
              </form>
            </WordRow>
            {started ? null : <InfoMsg>type a word + hit enter</InfoMsg>}
            <ErrorMsg>{errorMsg}</ErrorMsg>
            <ChunkHistoryBlock>
              <FormattedWords wordList={wordList} />
            </ChunkHistoryBlock>
            <Spacer height={3} />
          </>
        )}
      </Container>
      <Footer>
        <Spacer height={0.25} />
        {started && !ended && !isMobile ? (
          <Row center>
            <IconButton
              icon={HiMiniArrowPath}
              onClick={resetGame}
              label={"restart game"}
            />
          </Row>
        ) : null}
        {ended ? (
          <>
            <Scroller wordList={wordList} scrollChunk={FormattedWords} />
            <Spacer height={1.5} />
          </>
        ) : (
          <Container>
            <Score>{score}</Score>
          </Container>
        )}
        <Row center>
          <Setting
            options={TIME_OPTIONS}
            label="set timer to"
            color={Color.PINK}
            defaultChoice={1}
            setOptionValue={setTimeSetting}
            isMobile={isMobile}
          />
          <Spacer width={1.25} />
          <Setting
            options={LANGUAGE_OPTIONS}
            label="language"
            color={Color.GREEN}
            defaultChoice={0}
            setOptionValue={setLanguageSetting}
            isMobile={isMobile}
          />
          <Spacer width={1.25} />
          {isMobile ? null : (
            <Setting
              options={TAB_OPTIONS}
              label="tab to restart"
              color={Color.ORANGE}
              defaultChoice={0}
              setOptionValue={setTabSetting}
              isMobile={isMobile}
            />
          )}
        </Row>
      </Footer>
    </PageWrapper>
  );
}

export default Game;
