import styled from "utils/styled";

export const Wrapper = styled.div`
  display: flex;
  width: 200px;
`;

export const Notification = styled.div<{ status: string }>`
  display: flex;
  text-align: center;
  border-radius: 45px;
  width: 2rem;
  height: 2rem;
  background: ${(props) => (props.status === "ACCEPTED" ? "green" : "red")};
`;
