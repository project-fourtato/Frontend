import React, { useState } from "react";
import styled from "styled-components";
import userprofile from "../../assets/userprofile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import MsgModal from "../common/MsgModal";
import UserBookListCard from "./UserBookListCard";
import book2 from "../../assets/book2.png";

const UserProfileHeader = ({ userProfileData }) => {
  const [showMsgModal, setShowMsgModal] = useState(false);

  const followerPage = () => {
  };

  const followingPage = () => {
  };

  const dummyUserProfileData = {
    username: "왕감자",
    userInterest: ["요리", "판타지","여행","에세이"],
    followerCount: 100,
    followingCount: 50,
    myBookList: [ 
      {
        id: 1,
        img: book2,
        title: "책1",
        contents: "book.",
        author: "감자",
        publisher: "네알",
      },
    ],
  };

  return (
    <>
      {dummyUserProfileData && dummyUserProfileData.username ? (
        <>
          <ProfileSection>
            <ProfileLeftContainer>
              <div>
                <ProfileImage src={userprofile} alt="userprofile" />
              </div>
              <div>
                <ProfileNameDirectM>
                  <ProfileName>
                    <UserNameColor>{dummyUserProfileData.username}</UserNameColor> 님의 개인서재
                  </ProfileName>
                </ProfileNameDirectM>
                <InterestOutDiv>
                  {dummyUserProfileData.userInterest.map((interest) => (
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
                <FontAwesomeIcon icon={faPaperPlane} className="icon-mypage-paper-plane" />
                쪽지 보내기
              </SendMsgButton>
            </div>
          </ProfileSection>
          <FollowAndFollower>
            <FollowAndFollowerText onClick={followerPage}>팔로워</FollowAndFollowerText>
            <FollowAndFollowerNumberText>{dummyUserProfileData.followerCount}</FollowAndFollowerNumberText>
            <Dot>•</Dot>
            <FollowAndFollowerText onClick={followingPage}>팔로잉</FollowAndFollowerText>
            <FollowAndFollowerNumberText>{dummyUserProfileData.followingCount}</FollowAndFollowerNumberText>
          </FollowAndFollower>
          {/* UserProfileHeader에서는 해당 사용자의 도서 목록을 표시하는 UserBookListCard 컴포넌트 추가 */}
          <UserBookListCard myBookList={dummyUserProfileData.myBookList} username={dummyUserProfileData.username} />
          {showMsgModal && <MsgModal setShowMsgModal={setShowMsgModal} />}
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
