import styled from "styled-components";
import { Color } from "../constants/constants";
import { ReactNode } from "react";

interface IGameWrapper {
  children: ReactNode;
}

const Wrapper = styled.div`
  background-color: ${Color.BACKGROUND};
  color: white;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

function GameWrapper(props: IGameWrapper) {
  return <Wrapper>{props.children}</Wrapper>;
}

export default GameWrapper;
