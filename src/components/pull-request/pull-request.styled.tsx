import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 2px solid black;
`;
export const Details = styled.div`
  padding: 0 1em;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-self: flex-start;
`;
export const Title = styled.h1`
  font-size: 1em;
  font-weight: bold;
  padding: 0 1em;
  span {
    padding-right: 1em;
    color: gray;
  }
`;
export const Text = styled.p`
  color: gray;
  font-size: 1em;
  text-align: left;
  padding-right: 1em;
  span {
    color: black;
    font-weight: bold;
  }
`;
export const Description = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  padding: 0 1em;
`;
