import React from "react";
import styled from "styled-components";
import SignInCard from "../components/login/SignInCard";
import "../App.css";

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
  margin-top: 2.5rem;
  height: 100%;
  width: 100%;
  color: #142343;
`;
