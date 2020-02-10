import styled from "utils/styled";

export const Wrapper = styled.section`
  font-size: 16px;
  display: grid;
  height: 50vh;
  align-items: top;
  grid-template-columns: 1fr;
  border-bottom: 0.1rem solid black;
  @media (min-width: 400px) {
    font-size: 20px;
    grid-template-columns: repeat(2, 1fr);
  }
`;
export const Details = styled.div`
  margin: 0.5rem 0.2rem;
  display: flex;
  flex-direction: row;
  @media (min-width: 400px) {
  }
`;

export const Text = styled.p`
  color: gray;
  font-size: 0.8em;
  text-align: left;
  margin: 0 0.2rem;
  span {
    color: black;
    font-weight: bold;
  }
`;
export const Description = styled.div`
  margin: 0.5rem 0.2rem;
  display: flex;
  align-items: baseline;
  flex-direction: column;
  span {
    color: gray;
  }
  svg {
    padding-right: 0.3rem;
  }
  @media (min-width: 400px) {
    flex-direction: row;
  }
`;
