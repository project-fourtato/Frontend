import React from "react";
import NickName from "../components/edtiprofile/NickName";
import Setting from "../components/edtiprofile/Setting";
import styled from "styled-components";
function MyProfileEditPage(props) {
  return (
    <Container>
      <NickName />
      <MiddleLine/>
      <Setting />
    </Container>
  );
}

export default MyProfileEditPage;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  height: 80%;
  width: 100%;
`;

const MiddleLine = styled.div`
  width: 0.1rem;         
  height: 530px;     
  background-color: #DBDBDB;
  margin: 0 40px; 
`;