import React from "react";
import styled from "styled-components";
import userprofile from "../../assets/userprofile.png";
import { useNavigate } from "react-router-dom";
import {profileState} from "../../recoil/atom";
import { useRecoilState } from "recoil";
function ProfileHeader(props) {
  const navigate = useNavigate();
  const [profile, setProfile] = useRecoilState(profileState);

  const goMyProfileEditPage = () => {
    navigate("/edit");
    setProfile('edit');
  };

  return (
    <>
      <ProfileSection>
        <ProfileLeftContainer>
          <div>
            <ProfileImage src={userprofile} alt="userprofile" />
          </div>
          <div>
            <ProfileName>감자 님의 개인서재</ProfileName>
            <MyTag>판타지</MyTag>
          </div>
        </ProfileLeftContainer>

        <div>
          <EditProfileButton
            onClick={() => {
              goMyProfileEditPage();
            }}
          >
            프로필 편집
          </EditProfileButton>
        </div>
      </ProfileSection>
      <FollowAndFollower>
        <FollowAndFollowerText>팔로워</FollowAndFollowerText>
        <FollowAndFollowerNumberText>10</FollowAndFollowerNumberText>
        <Dot>•</Dot>
        <FollowAndFollowerText>팔로잉</FollowAndFollowerText>
        <FollowAndFollowerNumberText>15</FollowAndFollowerNumberText>
      </FollowAndFollower>
    </>
  );
}

export default ProfileHeader;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 850px;
`;

const ProfileLeftContainer = styled.div`
  display: flex;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
`;

const ProfileName = styled.h2`
  color: #000;
  font-family: Inter;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 10px;
`;

const MyTag = styled.p`
  border-radius: 43px;
  border: 1px solid #c1c1c1;
  background: #fff;
  text-align: center;
  padding: 10px 10px;
  width: 70px;
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const EditProfileButton = styled.button`
  border-radius: 43px;
  border: 1px solid #c1c1c1;
  background: #fff;
  cursor: pointer;
  padding: 10px 20px;
  width: 150px;
  height: 50px;
  transform: rotate(-0.001deg);
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  &:hover {
    background: #344a39;
    color: #fff;
  }
`;

const FollowAndFollower = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: flex-start; */
  width: 850px;
  margin-left: 30px;
  margin-bottom: 50px;
`;

const FollowAndFollowerText = styled.h5`
  color: #000;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 109.867%; /* 30.763px */
  letter-spacing: -0.14px;
  margin-right: 8px;
`;

const Dot = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 109.867%; /* 30.763px */
  letter-spacing: -0.14px;
  margin-right: 8px;
  margin-left: 8px;
`;

const FollowAndFollowerNumberText = styled.p`
  color: #344a39;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 109.867%;
  letter-spacing: -0.14px;
`;
