import React from "react";
import backgoundimg from "../assets/backgroundimg.png";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loginState } from "../recoil/atom";
import userprofile from "../assets/userprofile.png";
import BookListCard from "../components/main/BookListCard";
import MyPersonListCard from "../components/main/MyPersonListCard";

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
          <Backgoundimg src={backgoundimg} alt="backgroundimg" />
        </>
      )}
    </>
  );
}

export default MainPage;

const Backgoundimg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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
