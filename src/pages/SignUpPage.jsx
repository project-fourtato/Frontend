import React from "react";
import styled from "styled-components";
import SignUpCard from "../components/login/SignUpCard";
import "../App.css"

function SignUpPage(props) {
  return (
    <SignUpContainer>
      <SignUpCard />
    </SignUpContainer>
  );
}

export default SignUpPage;

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin-top: 5px;
`;
