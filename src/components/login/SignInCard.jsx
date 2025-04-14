import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState } from "../../recoil/atom";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import swal from "sweetalert";
import "../../App.css";
import axios from "axios";
import { async } from "q";
import Session from 'react-session-api';


function SignInCard(props) {
  const profile = sessionStorage.getItem("profile");
  const p = JSON.parse(profile);
  const setLoginState = useSetRecoilState(loginState);

  ////뒤로가기 버튼을 통해 해당 페이지에 왔을 때 처리///////
  const checkForSession = () => {
    if(p) {
      setLoginState({isLogin: true});
    }
  };
  checkForSession();
  sessionStorage.removeItem("profile");


  ///////////////////////////////////////////////////////
  const navigate = useNavigate();
  //api
  let posts = "hello";
  const [idValue, setId] = useState('');
  const [pwValue, setPw] = useState('');
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const saveUserId = event => {
    setId(event.target.value);
  };
  const saveUserPw = event => {
    setPw(event.target.value);
  };
  const LoginEffect = () => {
    (async() => {
      try{
        const url = 'http://localhost:8080/login/uid='+idValue+'&pw='+pwValue;
        const response = await axios.get(url);
        posts = response.data.uid;
        

        if(typeof posts === "undefined"){
          swal({
            title: "로그인 실패했습니다.",
            icon: "warning",
            buttons: "확인",
          }).then(() => {
            setIsLogin({ isLogin: false });
            navigate("/login");
          })
        }
        else{
          handleLogin();      
        }

        
      } catch(error) {
        // console.log(error)
      }
    }) ();
  };

  useEffect(() => {
    if (idValue && pwValue) {
      LoginEffect();
    }
  }, []);


  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      LoginEffect(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };


  const goSignUpPage = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    
    // 로그인 로직을 여기에 구현
    
    // console.log("로그인!");
    swal({
      title: "로그인 되었습니다.",
      icon: "success",
      buttons: "확인",
    }).then(() => {
      let profile = {"uid": idValue};
      sessionStorage.setItem("profile", JSON.stringify(profile)); // 여기가 session 전달하는 부분
      setIsLogin({ isLogin: true });
      navigate("/");
    })
  }


  return (
    <LoginCardbox>
      <TitleHeaderContainer>
        <Title>로그인</Title>
        <Subtitle>로그인을 통해 BOOKER을 사용해 보세요!</Subtitle>
      </TitleHeaderContainer>
      <IconInputContainer>
        <StyledIconFaUserAlt />
        <AuthInput placeholder="아이디를 입력하세요." value={idValue} onChange={saveUserId}/>
      </IconInputContainer>

      <IconInputContainer>
        <StyledIconFaLock />
        <AuthInput placeholder="비밀번호를 입력하세요." value={pwValue} onChange={saveUserPw} onKeyDown={handleOnKeyPress} type="password"/>
      </IconInputContainer>

      <LoginBtn onClick={LoginEffect}>로그인</LoginBtn>
      <SignUpTextContainer>
        <p onClick={goSignUpPage}>회원가입</p>
      </SignUpTextContainer>
    </LoginCardbox>
  );
}

export default SignInCard;

const LoginCardbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  width: 410px;
`;

const TitleHeaderContainer = styled.div`
  margin-bottom: 30px;
  border-bottom: 1px solid #b4b4b4;
  padding-bottom: 30px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 30px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const IconInputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const AuthInput = styled.input`
  box-sizing: border-box;
  border: 1px solid #b4b4b4;
  border-radius: 5px;
  width: 100%;
  height: 60px;
  padding-left: 50px;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  &:focus {
    outline: none;
    border: 1px solid #344a39;
  }
`;

const SignUpTextContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 20px;
  > p {
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StyledIconFaUserAlt = styled(FaUserAlt)`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: #b4b4b4;
`;

const StyledIconFaLock = styled(FaLock)`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: #b4b4b4;
`;

const ButtonStyle = styled.button`
  border: none;
  border-radius: 5px;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 20px;
  img {
    width: 30px;
    height: 30px;
    margin-right: 15px;
    align-self: center;
    margin-right: 10px;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const LoginBtn = styled(ButtonStyle)`
  background-color: #32497B;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 20px;
`;
