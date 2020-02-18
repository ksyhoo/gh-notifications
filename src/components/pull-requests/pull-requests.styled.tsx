import styled from "utils/styled";

export const Wrapper = styled.section`
  font-size: 16px;
  display: grid;
  height: 50vh;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 0.1rem solid black;
  @media (min-width: 480px) {
    font-size: 20px;
    grid-template-columns: repeat(2, 1fr);
  }
`;
export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled.p`
  color: gray;
  font-size: 0.8em;
  text-align: center;
  margin: 0 0.2rem;

  @media (min-width: 480px) {
    text-align: left;
  }
`;
