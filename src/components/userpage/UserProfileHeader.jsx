import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faUser, faUserLarge, faUserPlus, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import MsgModal from "../common/MsgModal";
import UserBookListCard from "./UserBookListCard";
import axios from "axios";
import { profileState } from "../../recoil/atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";


const UserProfileHeader = (props) => {
  const navigate = useNavigate();
  const pro = sessionStorage.getItem("profile");
  const pSession = JSON.parse(pro); //session uid 가져오기
  const p = props.UserUid;
  const [showMsgModal, setShowMsgModal] = useState(false);

  const [count, setCount] = useState(0);
  const [FollowButtonText, setFollowButtonText] = useState("");

  const axiosBaseURL = axios.create({
    withCredentials: true,
  }
  );

  const handleButtonClick = async () => {
    if (FollowButtonText === "팔로잉") { //팔로우 취소를 한다면
      swal({
        title: "팔로우 취소하시겠습니까?",
        icon: "warning",
        buttons: ["취소", "확인"]
      })
        .then(async (value) => {
          if (value) {
            try {
              const url = 'http://localhost:8080/follow/delete';
              const response = await axiosBaseURL.post(url,{
                toUserId : "0", //가짜
                fromUserId : pSession.uid
              });
              // console.log(response);
              const responseData = response.data;
              setCount(count + 1);
            } catch (error) {
              swal({
                title: "일시적으로 문제가 생겼습니다",
                text: "다시 시도해주십시오",
                icon: "error",
              });
            }
          }
          else {
            swal({
              title: "삭제가 취소되었습니다",
              // text: "삭제가 취소되었습니다.",
              icon: "error",
            });
          }

        });

    }
    else { //팔로우를 한다면
      swal({
        title: "팔로우 하시겠습니까?",
        icon: "warning",
        buttons: ["취소", "확인"]
      })
        .then(async (value) => {
          if (value) {
            try {
              const url = 'http://localhost:8080/follow/new';
              const response = await axiosBaseURL.post(url,{
                toUserId : "0", //가짜
                fromUserId : pSession.uid
              });
              setCount(count + 1);
            } catch (error) {
              swal({
                title: "잠시 후 다시 시도해주세요!",
                // text: "취소되었습니다.",
                icon: "error",
              });
            }
          }
          else {
            swal({
              title: "팔로우가 취소되었습니다",
              // text: "취소되었습니다.",
              icon: "error",
            });
          }

        });
    }
  };

  


  //팔로우 유무 조회
  useEffect(() => {
    const UserData = async () => {
      try {
        const response = await axiosBaseURL.post(`http://localhost:8080/follow/followCheck`,{
          toUserId : "0", //가짜
          fromUserId : pSession.uid
        });
        const data = response.data;
        if (data === true) {
          setFollowButtonText("팔로잉");
        }
        else {
          setFollowButtonText("팔로우");
        }
      } catch (error) {
        console.error("팔로우 유무 조회 에러", error);
      }
    };

    UserData();
  }, [count]);

  useEffect(() => {
  }, [FollowButtonText]);

  const [profile, setProfile] = useRecoilState(profileState);
  const [userData, setUserData] = useState(null);
  const [followingData, setFollowingData] = useState(0);
  const [followerData, setFollowerData] = useState(0);

  useEffect(() => {
    const UserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/profile/` + p);
        // console.log(response);
        const data = response.data;
        setUserData(data);
        if(data.length === 0) {
          throw new Error("is Null");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        swal("페이지 이동 실패", "유효하지 않은 값입니다.", "error")
          .then(() => {
            navigate("/");
          })
      }
    };

    UserData();
  }, []);

  const followerPage = () => {
    navigate("/follower/" + p);
    setProfile('aa');
  };

  const followingPage = () => {
    navigate("/following/" + p);
    setProfile('aa');
  };

  useEffect(() => {
    const FollowingData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/follow/followingsCount/` + p);
        // console.log(response);
        const data = response.data;
        setFollowingData(data.fromUserId_Count);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
      try {
        const response = await axios.get(`http://localhost:8080/follow/followersCount/` + p);
        // console.log(response);
        const data = response.data;
        setFollowerData(data.toUserId_Count);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    FollowingData();
    // console.log(followingData);
    // console.log(followerData);
  }, [count, p]);

  const [userInterest, setUserInterest] = useState([]);
  useEffect(() => {
    if (userData) {
      props.setUsermessage(userData.usermessage);
      props.setNickname(userData.nickname);
      setUserInterest([userData.uinterest1, userData.uinterest2, userData.uinterest3, userData.uinterest4, userData.uinterest5]);
    }
  }, [userData]);

  return (
    <>
      {userData && userData.nickname ? (
        <>
          <ProfileSection>
            <ProfileLeftContainer>
              <div>
                <ProfileImage src={userData.useriamgeUrl} alt="userprofile" />
              </div>
              <div>
                <ProfileNameDirectM>
                  <ProfileName>
                    <UserNameColor>{userData.nickname}</UserNameColor> 님의 개인서재
                  </ProfileName>
                </ProfileNameDirectM>
                <InterestOutDiv>
                  {userInterest && userInterest.map((interest) => (
                    !!interest && <MyTag key={interest}>{interest}</MyTag>
                  ))}
                </InterestOutDiv>
              </div>
            </ProfileLeftContainer>
            <div>
              <SendMsgButton
                onClick={() => {
                  setShowMsgModal(true);
                }}
              >
                <FontAwesomeIcon icon={faPaperPlane} className="icon-mypage-paper-plane" />
                쪽지 보내기
              </SendMsgButton>
            </div>
          </ProfileSection>
          <FollowAndFollower>
            <FollowAndFollowerText onClick={followerPage}>팔로워</FollowAndFollowerText>
            <FollowAndFollowerNumberText>{followerData}</FollowAndFollowerNumberText>
            <Dot>•</Dot>
            <FollowAndFollowerText onClick={followingPage}>팔로잉</FollowAndFollowerText>
            <FollowAndFollowerNumberText>{followingData}</FollowAndFollowerNumberText>
          </FollowAndFollower>
          <BookListCardHeader>
            <LeftBox>
              <LeftBoxText>{props.usermessage}</LeftBoxText>
            </LeftBox>
            <FollowButton
              onClick={() => {
                handleButtonClick();
              }}
            >
              <FontAwesomeIcon icon={ FollowButtonText === "팔로우" ? faUserPlus : faUserMinus } className="icon-mypage-paper-plane" />
              {FollowButtonText}</FollowButton>
          </BookListCardHeader>
          {showMsgModal && <MsgModal setShowMsgModal={setShowMsgModal} msgName={'writeToUser'} userId={p} nickname={userData.nickname} userimageUrl={userData.useriamgeUrl} />}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default UserProfileHeader;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 850px;
`;

const ProfileLeftContainer = styled.div`
  display: flex;
`;

const ProfileImage = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  margin-right: 20px;
`;

const ProfileNameDirectM = styled.div`
  display: flex;
  margin-top: 12px;
  margin-left: 6px;
  margin-bottom: 1px;
`;

const InterestOutDiv = styled.div`
  display: flex;
  margin-left: 6px;
`;

const ProfileName = styled.h2`
  color: #000;
  font-size: 23px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 12px;
`;

const DisrectMDiv = styled.div`
  width: 160px;
  height: 35px;
  border: 1px solid #BABABA;
  border-radius: 43px;
  text-align: center;
  line-height: 35px;
  margin-left: 15px;
`;

const MyTag = styled.p`
  border-radius: 43px;
  border: 1px solid #c1c1c1;
  background: #fff;
  text-align: center;
  padding: 10px 10px;
  width: 5rem;
  height: 8px;
  color: #000;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 9px;
  margin-right: 8px;
`;

const SendFollowButtonOutDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const SendMsgButton = styled.button`
  border-radius: 43px;
  border: 1px solid #c1c1c1;
  background: #fff;
  cursor: pointer;
  padding: 10px 20px;
  width: 165px;
  height: 43px;
  transform: rotate(-0.001deg);
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  &:hover {
    background: #5f749f;
    color: #fff;
  }
`;

const FollowButton = styled.button`
  border-radius: 43px;
  border: 1px solid #c1c1c1;
  background: #fff;
  cursor: pointer;
  padding: 10px 20px;
  width: 140px;
  height: 42px;
  line-height: 4px;
  transform: rotate(-0.001deg);
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  > svg {
    margin-right: 10px;
  }
  &:hover {
    background: #5f749f;
    color: #fff;
  }
`;

const FollowAndFollower = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: flex-start; */
  width: 850px;
  margin-left: 30px;
  margin-bottom: 20px;
`;

const FollowAndFollowerText = styled.h5`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 109.867%; /* 30.763px */
  letter-spacing: -0.14px;
  margin-right: 8px;
  cursor : pointer;
  &:hover{
    color: #5f749f;
  }
`;

const Dot = styled.p`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 109.867%; /* 30.763px */
  letter-spacing: -0.14px;
  margin-right: 8px;
  margin-left: 8px;
`;

const FollowAndFollowerNumberText = styled.p`
  color: #344a39;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 109.867%;
  letter-spacing: -0.14px;
`;

const UserNameColor = styled.span`
  color: #5f749f;
`;

const BookListCardHeader = styled.div`
  display: flex;
  margin-bottom: 25px;
  justify-content: space-between;
  width: 80%;
`;

const LeftBox = styled.div`
  position: relative;
  background: #5f749f;
  border-radius: 1em;
  padding: 1em 5em;
  height: 10px;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 65%;
    width: 0;
    height: 0;
    border: 1.719em solid transparent;
    border-right-color: #5f749f;
    border-left: 0;
    border-bottom: 0;
    margin-top: -0.959em;
    margin-left: -0.519em;
  }
`;

const LeftBoxText = styled.h5`
  color: #fff;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 70%;
  letter-spacing: -0.17px;
`;
