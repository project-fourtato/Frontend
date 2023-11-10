import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Search from "./Search";
import logo from "../../assets/logo.png";
import profileimg from "../../assets/Star-change.png";
import { useRecoilState } from "recoil";
import { loginState, profileState } from "../../recoil/atom";
import swal from "sweetalert";
import MsgModal from "./MsgModal";
import { BiMessageRounded } from "react-icons/bi";
import { LuBell } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineProfile } from "react-icons/ai";
import "../../../src/App.css";

const Header = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [profile, setProfile] = useRecoilState(profileState);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showMsgModal, setShowMsgModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isProfileSettingPage =
    profile === "setting" && location.pathname === "/edit";
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const isMainPage = (location.pathname === "/");

  const isUrl = isLoginPage || isSignupPage;

  const hideBorder = isLogin.isLogin || location.pathname === "/";

  console.log("hideBorder", isUrl);

  const goReadingPage = () => {
    if (isLogin.isLogin) {
      navigate("/userbook");
    } else {
      swal({
        title: "로그인이 필요합니다.",
        icon: "warning",
        buttons: "확인",
      }).then(() => {
        navigate("/login");
      });
    }
  };

  const goRecommendPage = () => {
    if (isLogin.isLogin) {
      navigate("/recommend");
    } else {
      swal({
        title: "로그인이 필요합니다.",
        icon: "warning",
        buttons: "확인",
      }).then(() => {
        navigate("/login");
      });
    }
  };

  const goExchangePage = () => {
    if (isLogin.isLogin) {
      navigate("/exchange");
    } else {
      swal({
        title: "로그인이 필요합니다.",
        icon: "warning",
        buttons: "확인",
      }).then(() => {
        navigate("/login");
      });
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <HeaderWrapper isLogin={hideBorder}>
        <LinkStyle to="/">
          <LogoOutDiv>
            <StarImage src={logo} alt="logo" />
            <LogoTitle>BOOKER</LogoTitle>
          </LogoOutDiv>
        </LinkStyle>

        <HeaderRight>
          {isUrl || isProfileSettingPage ? null : (
            <HeaderMenuContainer>
              <HeaderMenuText
                onClick={() => {
                  goReadingPage();
                }}
              >
                개인서재
              </HeaderMenuText>
              <HeaderMenuText
                onClick={() => {
                  goRecommendPage();
                }}
              >
                책 추천
              </HeaderMenuText>
              <HeaderMenuText
                onClick={() => {
                  goExchangePage();
                }}
              >
                책 교환
              </HeaderMenuText>
            </HeaderMenuContainer>
          )}
          {isLogin.isLogin ? <Search /> : null}

          {isLogin.isLogin ? (
            <IconContainer>
              <InfoRound
                src={profileimg}
                onClick={() => {
                  toggleDropdown();
                }}
              />
              {dropdownVisible && (
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      setDropdownVisible(false);
                      navigate("/mypage");
                    }}
                  >
                    <AiOutlineProfile
                      size={18}
                      color="#fff"
                      style={{ marginRight: "10px" }}
                    />
                    프로필 편집
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setShowMsgModal(true);
                      setDropdownVisible(false);
                    }}
                  >
                    <BiMessageRounded
                      size={18}
                      color="#fff"
                      style={{ marginRight: "10px" }}
                    />
                    쪽지 목록
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => {
                      setIsLogin(false);
                      setDropdownVisible(false);
                      navigate("/");
                    }}
                  >
                    <FiLogOut
                      size={18}
                      color="#fff"
                      style={{ marginRight: "10px" }}
                    />
                    로그아웃
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => {
                      setDropdownVisible(false);
                      navigate("/declaration");
                    }}
                  >
                    <LuBell
                      size={14}
                      color="#fff"
                      style={{ marginRight: "10px" }}
                    />
                    신고하기
                  </DropdownItem>
                </DropdownMenu>
              )}
            </IconContainer>
          ) : (
            <CustomBtn
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </CustomBtn>
          )}
        </HeaderRight>
      </HeaderWrapper>
      {showMsgModal && <MsgModal setShowMsgModal={setShowMsgModal} />}
    </>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 78px;
  /* border-radius: 20px; */
  /* border-bottom: 1px solid #b8b8b8; */
  border-bottom: ${(props) => (props.isLogin ? "none" : "1px solid #b8b8b8")};
  background: ${(props) => (props.isMainPage ? "#FDF9EF" : "#FDF9EF")};
  /* box-shadow: 0px 4px 2px 0px rgba(165, 165, 165, 0.25); */
  /* z-index: 10; */
  /* position: fixed; */
  /* top: 0;
  left: 0; */
  /*width: ${(props) => (props.isLogin ? "90vw" : "96vw")};*/
  padding: 0.3rem 6vw /*${(props) => (props.isLogin ? "0 6vw" : "0 2vw")}*/;
  /*padding-top: 0.9rem*/
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 200px;
`;

const LogoOutDiv = styled.div`
  display: flex;
`

const StarImage = styled.img`
  width: 25px;
  height: 25px;
`

const LogoTitle = styled.div`
  color: #1E3F48;
  font-size: 25px;
  margin-left: 18px;
  font-family: NanumEBold;
`

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: #212529;
  font-size: 20px;
  font-weight: 600;
  position: relative;
  > img {
    position: absolute;
    top: -23px;
    width: 220px;
    height: 45px;
    object-fit: cover;
  }
`;

const CustomBtn = styled.button`
  height: 3rem;
  width: 12rem;
  margin-left: 1.5rem;
  margin-right: 1rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  font-size: 1rem;
  border-radius: 1.5rem;
  outline: none;
  font-weight: bold;
  word-break: keep-all;
  background: #FDFDFD;
  border: 1px solid #C1C1C1;
  color: #142343;
  transition: all 0.125s ease-in 0s;
  cursor: pointer;
  font-family: nanum;
  font-size: 20px;
  font-style: normal;
  &:hover {
    background: #142343;
    color: #fff;
  }
  /* 미디어쿼리 */
  @media (max-width: 768px) {
    display: none;
  }
  padding-top: 0.2rem;
`;

const InfoRound = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const HeaderMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-right: 2rem;
  @media (max-width: 1068px) {
    display: none;
  }
`;

const HeaderMenuText = styled.p`
  color: #142343;
  /*font-family: Inter;*/
  font-size: 23px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 25px;
  cursor: pointer;
  &:hover {
    color: #212529;
  }
`;

const IconContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 65px;
  right: -15px;
  width: 188px;
  border: 1px solid #b8b8b8;
  background-color: #a2b29f;
  border-radius: 15px;
  box-shadow: 0px 4px 2px 0px rgba(165, 165, 165, 0.25);
  z-index: 20;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 60%;
    width: 0;
    height: 0;
    border: 16px solid transparent;
    border-bottom-color: #a2b29f;
    border-top: 0;
    margin-left: 0px;
    margin-top: -16px;
  }
`;

const DropdownItem = styled.div`
  padding: 15px 20px;
  width: 120px;
  display: flex;
  align-items: center;
  /*font-family: Inter;*/
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: #fff;
  cursor: pointer;
  border-bottom: 1px solid #fff;
  /* &:hover {
    background-color: #212529;
  } */
  &:last-child {
    border-bottom: none;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 15px 0px;
  }
`;
