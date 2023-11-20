import React, { useState } from "react";
import NickName from "../components/edtiprofile/NickName";
import Setting from "../components/edtiprofile/Setting";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

function MyProfileEditPage(props) {
  const [formData, setFormData] = useState();
  const [nickname, setNickname] = useState();
  const [userMessage, setUserMessage] = useState();
  let location = useLocation();

  const profileSession = sessionStorage.getItem("profile");
  const p = JSON.parse(profileSession);


  return (
    <Container>
      <NickName setImage={setFormData} setUserNickname={setNickname} setUserMessage={setUserMessage} nickname={nickname} userMessage={userMessage}  />
      {
        (profileSession !== null) ? <MiddleLine2 /> : <MiddleLine />
      }
      {
        (profileSession !== null) ? <Setting formData={formData} nickname={nickname} userMessage={userMessage} />
        : <Setting formData={formData} nickname={nickname} userMessage={userMessage} uid={location.state.idValue} setImage={setFormData}  />
      }
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

const MiddleLine2 = styled.div`
  width: 0.1rem;         
  height: 550px;     
  background-color: #DBDBDB;
  margin: 0 40px; 
`