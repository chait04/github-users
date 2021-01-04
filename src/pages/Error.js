import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <Wrapper>
      <div>
        <h1>404</h1>
        <h3>Your intension dosent seems to be good</h3>
        <_Link to="/">Back to Home</_Link>
      </div>
    </Wrapper>
  );
};

const _Link = styled(Link)`
  padding: 20px;
  color: #132c07;
  margin-top: 10px;
  text-decoration: none;
  border-radius: 2rem;
  background: #bad0e9;
  font-weight: bolder;
  &:hover {
    color: white;
    background: #093531;
    transition: var(--transition);
  }
`;

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--clr-primary-10);
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    color: var(--clr-grey-3);
    margin-bottom: 1.5rem;
  }
`;
export default Error;
