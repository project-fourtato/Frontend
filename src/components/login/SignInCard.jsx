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
  //일단 이 페이지는 세션으로 관리가 안되도록 수정했음
  //나중에 필요하면 수정하도록
  const setLoginState = useSetRecoilState(loginState);
  const navigate = useNavigate();


  const axiosBaseURL = axios.create({
    withCredentials: true,
  }
  );

  const profile = sessionStorage.getItem("profile");
  const p = JSON.parse(profile);
  
  ////뒤로가기 버튼을 통해 해당 페이지에 왔을 때 처리///////
  const checkForSession = () => {
    if(p) {
      setLoginState({isLogin: true});
    }
  };
  checkForSession();
  sessionStorage.removeItem("profile");


  ///////////////////////////////////////////////////////
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
        const url = 'http://localhost:8080/login';
        const response = await axiosBaseURL.post(url, {
          id : idValue,
          pw : pwValue
        });
        handleLogin();
      } catch(error) {
        if (error.response.status == 404){
          if (error.response.data.message == "login 데이터가 존재하지 않는 회원입니다."){
            swal({
                  title: "로그인 실패했습니다.",
                  icon: "warning",
                  buttons: "확인",
                }).then(() => {
                  setIsLogin({ isLogin: false });
                  navigate("/login");
                })
          }
          else if(error.response.data.message == "회원정보를 입력하지 않은 회원입니다."){
            swal({
                  title: "회원가입을 완료하지 않았습니다.",
                  text: "회원정보 입력 페이지로 이동합니다. \n (해당 ID로 회원가입을 원할 시 문의바랍니다.) ",
                  icon: "warning",
                  buttons: "확인",
                }).then(() => {
                  setIsLogin({ isLogin: false });
                  navigate("/signup");
                })
              }
        }
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

    swal({
      title: "로그인 되었습니다.",
      icon: "success",
      buttons: "확인",
    }).then(() => {
      setIsLogin({ isLogin: true });
      let profile = {"uid": idValue};
      sessionStorage.setItem("profile", JSON.stringify(profile)); // sessionStorage에 저장(추후에 사용안하게 되면 삭제)
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
