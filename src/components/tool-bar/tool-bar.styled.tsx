import styled from "utils/styled";
import { mainTheme } from "themes";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem;
`;

export const Selection = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  &:after {
    content: "";
    height: 1rem;
    border-bottom: ${(props) =>
      props.selected ? "0.1rem solid orange" : "none"};
  }
`;
export const Button = styled.button<{ selected?: boolean }>`
  display: flex;
  outline: none;
  border: none;
  cursor: pointer;
  background: ${mainTheme.colors.background};
`;

export const Notification = styled.div<{ status: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 45px;
  width: 2rem;
  height: 2rem;
  font-family: ${mainTheme.fonts.notifications};
  background: ${(props) => (props.status === "ACCEPTED" ? "green" : "red")};
  color: ${mainTheme.colors.white};
`;
