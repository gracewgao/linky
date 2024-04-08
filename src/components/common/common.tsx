import styled from "styled-components";
import { Color } from "../../constants/constants";

export interface IWord {
  fullWord: string;
  chunks: IChunk[];
}

export interface IChunk {
  chunk: string;
  color: Color;
}

export const LinkText = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${Color.PRIMARY_TEXT};
  }
`;

export const Footer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 2rem;
`;

export const Container = styled.div`
  width: auto;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem;
`;

export const PageWrapper = styled.div`
  background-color: ${Color.BACKGROUND};
  color: white;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;
