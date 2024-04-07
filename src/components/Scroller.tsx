import styled from "styled-components";
import { IWord } from "./common/common";

interface IScroller {
  wordList: IWord[];
  scrollChunk: any;
}

const ScrollContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
`;

const ScrollContent = styled.div`
  @keyframes scroll {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-50%);
    }
  }
  display: inline-flex;
  animation: scroll 60s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

function Scroller(props: IScroller) {
  const totalLength = props.wordList.reduce(
    (acc, currentWord) => acc + currentWord.fullWord.length,
    0
  );
  return (
    <ScrollContainer>
      <ScrollContent>
        {[...Array(totalLength == 0 ? 0 : Math.floor(300 / totalLength))].map(
          (i) => (
            <props.scrollChunk isScroll wordList={props.wordList} />
          )
        )}
      </ScrollContent>
    </ScrollContainer>
  );
}

export default Scroller;
