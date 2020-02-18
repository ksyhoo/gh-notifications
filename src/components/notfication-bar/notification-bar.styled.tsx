import styled from "utils/styled";
import { mainTheme } from "themes";

export const Wrapper = styled.div`
  display: flex;
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
