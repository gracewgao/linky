import styled from "styled-components";
import { Color } from "../constants/constants";
import { Dispatch, SetStateAction, useState } from "react";
import { Row } from "./common/Row";
import Spacer from "./common/Spacer";

interface IOption {
  option: string;
  value: any;
}

interface ISetting {
  color: Color;
  label: string;
  options: IOption[];
  defaultChoice: number;
  isMobile: boolean;
  setOptionValue: Dispatch<SetStateAction<any>>;
}

const SettingRow = styled(Row)`
  color: ${Color.SECONDARY_TEXT};
`;

const Chip = styled.button<ISetting>`
  padding: 5px 10px;
  border-radius: 5px;
  color: ${Color.BACKGROUND};
  background-color: ${Color.DARK_GREY};
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  border: none;

  &:hover {
    color: ${(props) => props.color};
  }
`;

function Setting(props: ISetting) {
  const [choice, setChoice] = useState(props.defaultChoice);

  const cycleChoice = () => {
    const newChoice = (choice + 1) % props.options.length;
    props.setOptionValue(props.options[newChoice].value);
    setChoice(newChoice);
  };

  return (
    <SettingRow>
      {props.isMobile ? null : (
        <>
          {props.label}
          <Spacer width={8} isFixed />
        </>
      )}
      <Chip {...props} onClick={cycleChoice}>
        {props.options[choice].option}
      </Chip>
    </SettingRow>
  );
}

export default Setting;
