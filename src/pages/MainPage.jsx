import React from "react";
import backgoundimg from "../assets/booker-main2.gif";
import { styled, createGlobalStyle } from "styled-components";
import { useRecoilState } from "recoil";
import { loginState } from "../recoil/atom";
import userprofile from "../assets/userprofile.png";
import BookListCard from "../components/main/BookListCard";
import MyPersonListCard from "../components/main/MyPersonListCard";
import "../../src/App.css";

function MainPage(props) {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  console.log('isLogin',isLogin)
  return (
    <>
      {isLogin.isLogin  ? (
        <>
          <MainContainer>
            <MainTitleContainer>
              <ProfileImg src={userprofile} />
              <MainTitleText>감자님, 안녕하세요!</MainTitleText>
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
width: 55%;
margin-top: 3.5%;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 6rem;
  height: 100%;
  width: 100%;
  color: #000000;
  font-size: 2.5rem;
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
  justify-content: center;
  margin-bottom: 5rem;
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
`;

const MainTitleText = styled.h5`
  font-size: 1.6rem;
  font-weight: 600;
`;
