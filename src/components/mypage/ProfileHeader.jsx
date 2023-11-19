import React, { useEffect, useState } from "react";
import styled from "styled-components";
import userprofile from "../../assets/userprofile.png";
import { useNavigate } from "react-router-dom";
import { profileState } from "../../recoil/atom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import MsgModal from "../common/MsgModal";

function ProfileHeader(props) {
  const pro = sessionStorage.getItem("profile");
  const p = JSON.parse(pro); //session uid 가져오기
  
  const navigate = useNavigate();
  const [profile, setProfile] = useRecoilState(profileState);
  const [userData, setUserData] = useState(null);
  const [followingData, setFollowingData] = useState(0);
  const [followerData, setFollowerData] = useState(0);

  const [showMsgModal, setShowMsgModal] = useState(false);

  useEffect(() => {
    const UserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/profile/`+p.uid);
        // console.log(response);
        const data = response.data;
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    UserData();
  }, []);

  useEffect(() => {
    const FollowingData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/follow/followingsCount/`+p.uid);
        // console.log(response);
        const data = response.data;
        setFollowingData(data.fromUserId_Count);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
      try {
        const response = await axios.get(`http://localhost:8080/follow/followersCount/`+p.uid);
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
  }, []);


  useEffect(() => {
    if(userData){
    props.setUsermessage(userData.usermessage);
  }
  }, [userData]);

  const followerPage = () => {
    navigate("/follower");
    setProfile('aa');
  };

  const followingPage = () => {
    navigate("/following");
    setProfile('aa');
  };

  if (!userData) {
    return <div>데이터가 없습니다.</div>;
  }

  const userInterest = [userData.uinterest1,userData.uinterest2,userData.uinterest3,userData.uinterest4,userData.uinterest5];
  return (
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
              !!interest && <MyTag key={interest}>{interest}</MyTag> //관심사 개수에 맞게 띄어주기 위해 쓰임
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
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="icon-mypage-paper-plane"
          />
          쪽지 목록
        </SendMsgButton>
      </div>
    </ProfileSection>
      <FollowAndFollower>
        <FollowAndFollowerText
                    onClick={() => {
                      followerPage();
                    }}>팔로워</FollowAndFollowerText>
        <FollowAndFollowerNumberText>{followerData}</FollowAndFollowerNumberText>
        <Dot>•</Dot>
        <FollowAndFollowerText
                     onClick={() => {
                      followingPage();
                    }}>팔로잉</FollowAndFollowerText>
        <FollowAndFollowerNumberText>{followingData}</FollowAndFollowerNumberText>
      </FollowAndFollower>
      {showMsgModal && <MsgModal setShowMsgModal={setShowMsgModal} msgName={'mailbox'}/>}
    </>
  );
}

export default ProfileHeader;

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
  width: 4rem;
  height: 8px;
  color: #000;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 9px;
  margin-right: 8px;
`;

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

const FollowAndFollower = styled.div`
  display: flex;
  align-items: center;
  width: 850px;
  margin-left: 30px;
  margin-bottom: 20px;
`;

const FollowAndFollowerText = styled.h5`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 109.867%;
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
  line-height: 109.867%;
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