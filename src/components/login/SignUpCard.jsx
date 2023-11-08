import React from "react";

import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loginState, profileState } from "../../recoil/atom";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import {MdOutlineDateRange} from "react-icons/md";
function SignUpCard(props) {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [profile, setProfile] = useRecoilState(profileState);
  const navigate = useNavigate();

  const goSignInPage = () => {
    navigate("/login");
  };

  const handleCheckDuplicate = () => {
    // 중복 확인 로직을 여기에 구현
    console.log("중복 확인!");
  };

  const handleNextBtn = () => {
    navigate("/edit");
    setProfile('setting')
  };
  

  return (
    <LoginCardbox>
      <TitleHeaderContainer>
        <Title>회원가입</Title>
        <Subtitle>회원가입을 통해 BOOKER을 사용해 보세요!</Subtitle>
      </TitleHeaderContainer>
      <IconInputContainer>
        <StyledIconFaUserAlt />
        <AuthInput placeholder="아이디를 입력하세요." />
        <CheckButton onClick={handleCheckDuplicate}>중복확인</CheckButton>
      </IconInputContainer>

      <IconInputContainer>
        <StyledIconFaLock />
        <AuthInput placeholder="비밀번호를 입력하세요." />
      </IconInputContainer>

      <IconInputContainer>
        <StyledIconMdEmail />
        <AuthInput placeholder="이메일을 입력하세요." />
      </IconInputContainer>

      <IconInputContainer>
        <StyledIconDate />
        <AuthInput placeholder="생일을 입력해 주세요." />
      </IconInputContainer>

      <LoginBtn onClick={handleNextBtn}>다음으로</LoginBtn>
      <SignUpTextContainer>
        <p onClick={goSignInPage}>로그인</p>
      </SignUpTextContainer>
    </LoginCardbox>
  );
}

export default SignUpCard;

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
  color: #344a39;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #000;
  font-family: Inter;
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
    /* color: #344a39; */
    font-family: Inter;
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

const StyledIconMdEmail = styled(MdEmail)`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: #b4b4b4;
`;

const StyledIconDate = styled(MdOutlineDateRange)`
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
  background-color: #DBE8D9;
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  line-height: normal;
  margin-bottom: 20px;
`;

const CheckButton = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #DBE8D9;
  font-weight : bold;
  color: #000000;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    opacity: 0.8;
  }
`;