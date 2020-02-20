import styled from "utils/styled";

export const Text = styled.p<{ updated: boolean }>`
  font-size: 0.8em;
  text-align: center;
  margin: 0 0.2rem;
  color: ${(props) => (props.updated ? "orange" : "gray")};

  @media (min-width: 480px) {
    text-align: center;
  }
`;
