import { React, useState, useEffect } from "react";
import backgoundimg from "../assets/booker-main-v3.gif";
import { styled, createGlobalStyle } from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState } from "../recoil/atom";
import userprofile from "../assets/userprofile.png";
import BookListCard from "../components/main/BookListCard";
import MyPersonListCard from "../components/main/MyPersonListCard";
import axios from "axios";
import "../../src/App.css";
import Session from 'react-session-api';
import { useLocation, useNavigate } from "react-router-dom";

function MainPage(props) {
  const profile = sessionStorage.getItem("profile");
  const p = JSON.parse(profile);
  //api
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [nickname, setNickname] = useState('');
  const [useriamgeUrl, setUseriamgeUrl] = useState('');
  const setLoginState = useSetRecoilState(loginState);
  const checkForSession = () => {
    if(p) {
      setLoginState({isLogin: true});
    }
  };
  useEffect(() => {
    (async() => {
      try{
        const url = 'http://localhost:8080/profile/'+p.uid;
        const response = await axios.get(url);
        setNickname(response.data.nickname);
        setUseriamgeUrl(response.data.useriamgeUrl);
        checkForSession();
      } catch(error) {
        sessionStorage.removeItem("profile");
      }
    }) ();
  }, [nickname]);

    useEffect(() => {
    (async() => {
      try{
        const url = 'http://localhost:8080/profile/'+p.uid;
        const response = await axios.get(url);
        setNickname(response.data.nickname);
        setUseriamgeUrl(response.data.useriamgeUrl);
        checkForSession();
      } catch(error) {
        sessionStorage.removeItem("profile");
      }
    }) ();
  }, [nickname]);


  // console.log('isLogin',isLogin)
  return (
    <>
      {isLogin.isLogin  ? (
        <>
          <MainContainer>
            <MainTitleContainer>
              <ProfileImg src={useriamgeUrl} />
              <MainTitleText><NicknameSpan>{nickname}</NicknameSpan> 님, 안녕하세요!</MainTitleText>
            </MainTitleContainer>
          </MainContainer>
          <MainContentContainer>
            <BookListCard />
            <MyPersonListCard />
          </MainContentContainer>
        </>
      ) : (
        <>
        <GlobalStyle></GlobalStyle>
        <BackgroundImgeOutDiv>
        <Backgoundimg src={backgoundimg} type="video/mp4"/>
        </BackgroundImgeOutDiv>
        </>
      )}
    </>
  );
}

export default MainPage;

const GlobalStyle = createGlobalStyle`
#root,
html,
body {
    background: #FDF9EF;
}
`

const BackgroundImgeOutDiv = styled.div`
  background-color: #FDF9EF;
  width: 100%;
  text-align: center;
`

const Backgoundimg = styled.img`
  background-color: rgb(248, 249, 193);
  display: inline-block;
  width: 70%;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  height: 100%;
  width: 100%;
  color: #000000;
  font-weight: 600;
`;

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 46rem;
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
`;

const MainTitleText = styled.h5`
  font-size: 1.5rem;
  font-weight: 600;
`;

const NicknameSpan = styled.span`
  color: #5F749F;
`
