import styled from "styled-components";

interface IRow {
  center?: boolean;
}

export const Row = styled.div<IRow>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => (props.center ? "center" : "auto")};
`;
