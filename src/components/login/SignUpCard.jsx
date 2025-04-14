import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loginState, profileState } from "../../recoil/atom";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import swal from "sweetalert";
import axios from "axios";
function SignUpCard(props) {
  const domain = process.env.REACT_APP_API_DOMAIN;
  const axiosBaseURL = axios.create({
    baseURL: domain,
    withCredentials: true,
  });
  //api
  let posts = "hello";
  let [emailCheck, setEmailCheck] = useState(0); //email형식 맞지X
  useEffect(() => {}, [emailCheck]);

  let [DuplicatedIdCheck, setDuplicatedIdCheck] = useState(0); //아이디 중복체크 시 1로 바뀜
  useEffect(() => {}, [DuplicatedIdCheck]);
  const [idValue, setId] = useState("");
  const [pwValue, setPw] = useState("");
  const [emailValue, setEmail] = useState("");
  const [birthValue, setBirth] = useState("");
  const saveUserId = (event) => {
    setId(event.target.value);
  };
  const saveUserPw = (event) => {
    setPw(event.target.value);
  };

  // 이메일 형식을 확인하는 정규표현식
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // 이메일 값이 정규표현식과 일치하는지 확인하는 함수
  const isEmailValid = (email) => emailRegex.test(email);
  const saveUserEmail = (event) => {
    const newValue = event.target.value;

    // 새로운 값이 정규표현식과 일치하면 setEmail을 호출하여 상태 업데이트
    if (isEmailValid(newValue)) {
      setEmail(newValue);
      setEmailCheck(1);
    } else {
      setEmail(newValue);
      setEmailCheck(0);
    }
  };
  const saveUserBirth = (event) => {
    setBirth(event.target.value);
  };

  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [profile, setProfile] = useRecoilState(profileState);
  const navigate = useNavigate();

  const goSignInPage = () => {
    navigate("/login");
  };

  useEffect(() => {
    // emailCheck가 변경될 때 수행할 동작
  }, [emailCheck]);

  useEffect(() => {
    // DuplicatedIdCheck가 변경될 때 수행할 동작
  }, [DuplicatedIdCheck]);

  const handleCheckDuplicate = () => {
    //중복 확인 버튼 눌렀을 시
    // 중복 확인 로직을 여기에 구현
    (async () => {
      try {
        if (idValue.includes(" ")) {
          swal("경고", "닉네임에 띄어쓰기를 사용할 수 없어요.", "error");
          return;
        }
        const url = "/login/checkId/" + idValue;
        const response = await axiosBaseURL.get(url);
        posts = response.data.data;

        if (posts === false) {
          swal("경고", "다른 아이디를 입력해주세요.", "error").then(() => {
            setDuplicatedIdCheck(0);
            navigate("/signup");
          });
        } else {
          swal({
            title: "사용 가능한 아이디입니다.",
            icon: "success",
            buttons: "확인",
          }).then(() => {
            setDuplicatedIdCheck(1);
            navigate("/signup");
          });
        }
      } catch (error) {}
    })();
  };

  const handleNextBtn = () => {
    //다음으로 버튼 눌렀을 시
    (async () => {
      if (
        idValue === "" ||
        pwValue === "" ||
        emailValue === "" ||
        birthValue === ""
      ) {
        swal({
          title: "모든 항목에 값을 기입해주세요.",
          icon: "warning",
          buttons: "확인",
        }).then(() => {
          navigate("/signup");
        });
      } else if (DuplicatedIdCheck == 0) {
        swal({
          title: "아이디 중복확인을 해주세요.",
          icon: "warning",
          buttons: "확인",
        }).then(() => {
          navigate("/signup");
        });
      } else if (emailCheck == 0) {
        swal({
          title: "이메일을 다시 확인해주세요.",
          icon: "warning",
          buttons: "확인",
        }).then(() => {
          navigate("/signup");
        });
      } else {
        //로그인 성공
        try {
          const url = "/login/new";
          const response = await axiosBaseURL.post(url, {
            uid: idValue,
            pw: pwValue,
            email: emailValue,
            birth: new Date(birthValue).toISOString(),
          });
          posts = response;
          if (posts) {
            navigate("/edit", { state: { idValue } });
          }
        } catch (error) {
          swal({
            title: "이미 존재하는 회원입니다.",
            icon: "warning",
            buttons: "확인",
          }).then(() => {
            navigate("/signup");
          });
        }
      }
    })();
    setProfile("setting");
  };

  return (
    <LoginCardbox>
      <TitleHeaderContainer>
        <Title>회원가입</Title>
        <Subtitle>회원가입을 통해 BOOKER을 사용해 보세요!</Subtitle>
      </TitleHeaderContainer>
      <IconInputContainer>
        <StyledIconFaUserAlt />
        <AuthInput
          placeholder="아이디를 입력하세요."
          value={idValue}
          onChange={saveUserId}
        />
        <CheckButton onClick={handleCheckDuplicate}>중복확인</CheckButton>
      </IconInputContainer>

      <IconInputContainer>
        <StyledIconFaLock />
        <AuthInput
          placeholder="비밀번호를 입력하세요."
          value={pwValue}
          onChange={saveUserPw}
        />
      </IconInputContainer>

      <IconInputContainer>
        <StyledIconMdEmail />
        <AuthInput
          placeholder="이메일을 입력하세요."
          value={emailValue}
          onChange={saveUserEmail}
        />
      </IconInputContainer>

      <IconInputContainer>
        <StyledIconDate />
        <AuthInput
          type="date"
          placeholder="생일을 입력해 주세요."
          value={birthValue}
          onChange={saveUserBirth}
        />
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
  color: #142343;
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
  height: 53px;
  padding-left: 50px;
  font-size: 15px;
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
  background-color: #32497b;
  color: white;
  font-weight: bold;
  font-size: 18px;
  line-height: normal;
  margin-bottom: 20px;
  height: 53px;
`;

const CheckButton = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #32497b;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    opacity: 0.8;
  }
`;
