import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { styled, createGlobalStyle } from "styled-components";
import Search from "./Search";
import logo from "../../assets/14.png";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState, profileState } from "../../recoil/atom";
import swal from "sweetalert";
import MsgModal from "./MsgModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import {
  faComment,
  faAddressCard,
  faBell,
} from "@fortawesome/free-regular-svg-icons";
import "../../../src/App.css";
import axios from "axios";

const Header = () => {
  const profile = sessionStorage.getItem("profile");
  const p = JSON.parse(profile);

  const axiosBaseURL = axios.create({
    baseURL: "https://our-booker.site:8080",
    withCredentials: true,
  });

  const setLoginState = useSetRecoilState(loginState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const checkForSession = () => {
    if (p) {
      setLoginState({ isLogin: true });
    }
  };

  useEffect(() => {
    checkForSession();
  }, []);

  const logOut = async () => {
    try {
      const url = `http://localhost:8080/login/logout`;
      const response = await axiosBaseURL.get(url);
    } catch (error) {}
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showMsgModal, setShowMsgModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isProfileSettingPage =
    profile === "setting" && location.pathname === "/edit";
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const isMainPage = location.pathname === "/";

  const isUrl = isLoginPage || isSignupPage;
  const isMain = isMainPage && !isLogin.isLogin;

  const hideBorder = isLogin.isLogin || isMainPage;

  //console.log("hideBorder", isUrl);

  const goReadingPage = () => {
    if (isLogin.isLogin) {
      navigate("/mypage");
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
      <HeaderWrapper
        isLogin={hideBorder}
        isMainPage={isMain}
        isLoginPage={isLoginPage}
      >
        <LinkStyle to="/">
          {isMain ? null : (
            <LogoOutDiv>
              <StarImage src={logo} alt="logo" />
            </LogoOutDiv>
          )}
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
                책 거래
              </HeaderMenuText>
            </HeaderMenuContainer>
          )}
          {isLogin.isLogin ? <Search /> : null}

          {isLogin.isLogin ? (
            <IconContainer>
              <FontAwesomeIcon
                icon={faCircleUser}
                onClick={() => {
                  toggleDropdown();
                }}
                className="icon-circle-user"
              />
              {dropdownVisible && (
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      setDropdownVisible(false);
                      navigate("/edit");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faAddressCard}
                      className="icon-modal-profile"
                    />
                    프로필 편집
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setShowMsgModal(true);
                      setDropdownVisible(false);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faComment}
                      className="icon-modal-directM"
                    />
                    쪽지 목록
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => {
                      setIsLogin(false);
                      setDropdownVisible(false);
                      sessionStorage.removeItem("profile");
                      logOut();
                      navigate("/");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      className="icon-modal-logout"
                    />
                    로그아웃
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => {
                      setDropdownVisible(false);
                      navigate("/declaration");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faBell}
                      className="icon-modal-bell"
                    />
                    신고하기
                  </DropdownItem>
                </DropdownMenu>
              )}
            </IconContainer>
          ) : (
            <>
              <CustomBtn
                onClick={() => {
                  navigate("/login");
                }}
              >
                로그인
              </CustomBtn>
            </>
          )}
        </HeaderRight>
      </HeaderWrapper>
      {showMsgModal && (
        <MsgModal setShowMsgModal={setShowMsgModal} msgName={"mailbox"} />
      )}
    </>
  );
};

export default Header;

const GlobalStyle = createGlobalStyle`
#root,
html,
body {
    background: #FDF9EF;
}
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 78px;
  /* border-radius: 20px; */
  /* border-bottom: 1px solid #b8b8b8; */
  border-bottom: ${(props) => (props.isLogin ? "none" : "1px solid #D9D9D9")};
  background: ${(props) => (props.isMainPage ? "#FDF9EF" : "#f9f9f9")};
  /* box-shadow: 0px 4px 2px 0px rgba(165, 165, 165, 0.25); */
  /* z-index: 10; */
  /* position: fixed; */
  /* top: 0;
  left: 0; */
  /*width: ${(props) => (props.isLogin ? "90vw" : "96vw")};*/
  padding: 0.3rem 3.5vw
    /*${(props) => (props.isLogin ? "0.9rem 0 6vw" : "0 1vw")}*/;
  /*padding-top: 0.9rem;*/
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 200px;
`;

const LogoOutDiv = styled.div`
  display: flex;
`;

const StarImage = styled.img`
  width: 118px;
  margin-top: 2px;
`;

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
  max-width: 8rem;
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
  background: #fdfdfd;
  border: 1px solid #c1c1c1;
  color: #142343;
  transition: all 0.125s ease-in 0s;
  cursor: pointer;
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

const HeaderMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 21rem;
  margin-right: 2rem;
  @media (max-width: 1068px) {
    display: none;
  }
`;

const HeaderMenuText = styled.p`
  color: #142343;
  font-size: 23px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 30px;
  cursor: pointer;
  &:hover {
    color: #5f749f;
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
  top: 75px;
  right: -18.5px;
  width: 190px;
  height: 205px;
  border: 1px solid #b8b8b8;
  background-color: white; //#32497B
  border-radius: 10px;
  box-shadow: 2.5px 2.5px #dddddd;
  z-index: 20;
  /*&::after {
    content: "";
    position: absolute;
    top: 0;
    left: 81%;
    width: 0;
    height: 0;
    border: 16px solid transparent;
    border-bottom-color: #32497B;
    border-top: 0;
    margin-left: 0px;
    margin-top: -16px;
  }*/

  &::after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 0 16px 20px 15.5px;
    border-color: #ffffff transparent;
    display: block;
    width: 0;
    z-index: 1;
    top: -18.5px;
    left: 135px;
  }

  &::before {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 0 16px 20px 15.5px;
    border-color: #b8b8b8 transparent;
    display: block;
    width: 0;
    z-index: 0;
    top: -20px;
    left: 135px;
  }
`;

const DropdownItem = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  width: 120px;
  border-bottom: 1px solid #c6c6c6;
  justify-content: center;
  font-size: 14px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  color: black;
  margin: 2px 0;
  cursor: pointer;
  &:hover {
    color: #5f749f;
  }
  &:last-child {
    border-bottom: none;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px 0px;
    margin-right: -18px;
  }
`;
