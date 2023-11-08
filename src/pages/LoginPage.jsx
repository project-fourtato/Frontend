import React from "react";
import styled from "styled-components";
import SignInCard from "../components/login/SignInCard";

function LoginPage(props) {
  return (
    <LoginContainer>
      <SignInCard />
    </LoginContainer>
  );
}

export default LoginPage;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 6rem;
  height: 100%;
  width: 100%;
`;
