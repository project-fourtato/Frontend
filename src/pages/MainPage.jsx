import { React, useState, useEffect, useRef } from "react";
import backgoundimg from "../assets/booker-main-v3.gif";
import { styled, createGlobalStyle } from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState } from "../recoil/atom";
import main1 from "../assets/main1.gif";
import main2 from "../assets/main2.gif";
import main3 from "../assets/main3.gif";
import main4 from "../assets/main4.gif";
import main5 from "../assets/main5.gif";
import BookListCard from "../components/main/BookListCard";
import MyPersonListCard from "../components/main/MyPersonListCard";
import axios from "axios";
import "../../src/App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";


function MainPage(props) {
  const profile = sessionStorage.getItem("profile");
  const p = JSON.parse(profile);
  const setLoginState = useSetRecoilState(loginState);
  const navigate = useNavigate();
  
  //api
  const axiosBaseURL = axios.create({ //cors 해결
    withCredentials: true,
  });
  const checkForSession = () => {
    if (p) {
      setLoginState({ isLogin: true });
    }
  };
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [nickname, setNickname] = useState('');
  const [useriamgeUrl, setUseriamgeUrl] = useState('');
  useEffect(() => {
    (async () => {
      try {
        const url = 'http://localhost:8080/profile';
        const response = await axiosBaseURL.get(url);
        setNickname(response.data.nickname);
        setUseriamgeUrl(response.data.useriamgeUrl);
        setLoginState({ isLogin: true });
        checkForSession();
      } catch (error) {
        setLoginState({ isLogin: false });
        navigate("/login");
      }
    })();
  }, [nickname]);

  const images = [main1, main2, main3, main4, main5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentImageIndex]);

  const handleArrowClick = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
  };

  return (
    <>
      {isLogin.isLogin ? (
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
            <Backgoundimg src={backgoundimg} type="video/mp4" />
            {images.map((image, index) => (
              <Backgoundsub
                key={index}
                id={`main${index + 1}`}
                src={image}
                type="video/mp4"
                ref={index === currentImageIndex ? scrollRef : null}
              />
            ))}
            <ArrowButton onClick={handleArrowClick}>
              <ArrowIcon><FontAwesomeIcon icon={faChevronDown} /></ArrowIcon>
            </ArrowButton>
          </BackgroundImgeOutDiv>
        </>
      )
      }
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
const Backgoundsub = styled.img`
  background-color: rgb(248, 249, 193);
  display: inline-block;
  width: 90%;
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
const ArrowButton = styled.button`
  position: fixed;
  bottom: 35px;
  right: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: rgba(32, 35, 63, 0.2);
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  width: 100px;
  height: 20px;
  animation: bounce 2s infinite;
  @keyframes bounce {
    0% {
      bottom: 20px;
    }
    50% {
      bottom: 40px;
       height: 20px;
    }
   
    95% {
      bottom: 20px;
    }
    100% {
      bottom: 20px;
    }
  }
`;

const ArrowIcon = styled.span`
  font-size: 35px;
  transition: all 0.3s ease-out;
  &:hover {
    color: rgb(32, 35, 63);
  }
`;