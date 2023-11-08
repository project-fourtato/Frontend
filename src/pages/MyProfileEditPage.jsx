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
  margin-top: 6rem;
  height: 100%;
  width: 100%;
`;

const MiddleLine = styled.div`
  width: 2px;         
  height: 700px;     
  background-color: #C1C1C1;
  margin: 0 40px; 
`;