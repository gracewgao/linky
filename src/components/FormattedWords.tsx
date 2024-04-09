import styled from "styled-components";
import { Color } from "../constants/constants";
import { IWord, IChunk } from "./common/common";

export interface IFormattedWords {
  wordList: IWord[];
  isScroll?: boolean;
}

// todo: fix the hover to highlight words?
const FormattedChunk = styled.span<IChunk>`
  font-size: 2rem;
  color: ${(props) => props.color};

  &:hover {
    color: ${(props) =>
      props.color == Color.SECONDARY_TEXT ? Color.PRIMARY_TEXT : props.color};
  }
`;

function FormattedWords(props: IFormattedWords) {
  let letters: IChunk[] = [];
  props.wordList.forEach(
    (prevWord) =>
      (letters = [
        ...letters,
        ...prevWord.chunks.filter((_, j) => j != prevWord.chunks.length - 1),
      ])
  );
  // add last letter to combined word list
  letters = [
    ...letters,
    ...(props.wordList.length > 0
      ? props.wordList.slice(-1)[0].chunks.slice(-1)
      : []),
  ];

  return (
    <>
      {letters.map((letter) => (
        <FormattedChunk
          color={
            props.isScroll && letter.color == Color.PRIMARY_TEXT
              ? Color.SECONDARY_TEXT
              : letter.color
          }
          chunk={letter.chunk}
        >
          {letter.chunk}
        </FormattedChunk>
      ))}
    </>
  );
}

export default FormattedWords;
