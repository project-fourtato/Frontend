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

function ProfileHeader({ userId }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useRecoilState(profileState);
  const [userData, setUserData] = useState(null);
  const [showMsgModal, setShowMsgModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        const data = response.data;
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, [userId]);

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

  const { username, userInterest } = userData;

  return (
    <>
    <ProfileSection>
      <ProfileLeftContainer>
        <div>
          <ProfileImage src={userprofile} alt="userprofile" />
        </div>
        <div>
          <ProfileNameDirectM>
            <ProfileName>
              <UserNameColor>{username}</UserNameColor> 님의 개인서재
            </ProfileName>
          </ProfileNameDirectM>
          <InterestOutDiv>
            {userInterest.map((interest) => (
              <MyTag key={interest}>{interest}</MyTag>
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
          쪽지 보내기
        </SendMsgButton>
      </div>
    </ProfileSection>
      <FollowAndFollower>
        <FollowAndFollowerText
                    onClick={() => {
                      followerPage();
                    }}>팔로워</FollowAndFollowerText>
        <FollowAndFollowerNumberText>10</FollowAndFollowerNumberText>
        <Dot>•</Dot>
        <FollowAndFollowerText
                     onClick={() => {
                      followingPage();
                    }}>팔로잉</FollowAndFollowerText>
        <FollowAndFollowerNumberText>15</FollowAndFollowerNumberText>
      </FollowAndFollower>
      {showMsgModal && <MsgModal setShowMsgModal={setShowMsgModal} />}
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
  width: 55px;
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