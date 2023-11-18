import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import userprofile from "../../assets/userprofile.png";

function FollowingCard() {
  const profile = sessionStorage.getItem("profile");
  const p = JSON.parse(profile);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/follow/followingsList/"+p.uid);
        setFollowingList(response.data.data);
      } catch (error) {
        console.error("팔로잉 목록을 불러오는 중 오류 발생:", error);
      }
    };

    fetchFollowingList();
  }, []);

  return (
    <>
      <FollowingContainer>
        <FollowingBox>팔로잉</FollowingBox>
      </FollowingContainer>
      {followingList.map((following, index) => (
        <BookListCardContainer key={index}>
          <ProfileImage src={following.userimageUrl || userprofile} alt="프로필 사진" />
          <ProfileName>{following.nickname} 님의 개인서재</ProfileName>
          <BookListCardHeader>
            <LeftBox>
              <LeftBoxText>{following.usermessage}</LeftBoxText>
            </LeftBox>
          </BookListCardHeader>
        </BookListCardContainer>
      ))}
    </>
  );
}

export default FollowingCard;


const BookListCardContainer = styled.div`
  display: flex; /* Make the container flex */
  width: 1200px;
  margin-bottom: 30px;
  border-bottom: 1px solid #c1c1c1;
  align-items: center; /* Align items vertically */
`;

const ProfileImage = styled.img`
  min-width:80px;
  min-height: 80px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-left: 150px;
  margin-right: 30px;
  margin-bottom: 20px;
`;

const ProfileName = styled.h2`
  color: #000;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 10px;
  min-width: 300px;
`;

const BookListCardHeader = styled.div`
  display: flex;
  align-items: center;
`;

const LeftBox = styled.div`
  margin-top: -20px;
  margin-left: 70px;
  width: clamp(200px, 60%, 350px);
  position: relative;
  background: #5f749f;
  border-radius: 1em;
  padding: 1em 5em;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 70%;
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
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 109.867%;
  letter-spacing: -0.17px;
  white-space: nowrap; /* 텍스트가 줄 바꿈되지 않도록 설정 */
  overflow: hidden; /* 넘치는 텍스트를 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 대해 생략 부호(...) 표시 */
`;

const FollowingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 80px;
  margin-top : -50px;
`;

const FollowingBox = styled.p`
  border-radius: 10px;
  border: 1px solid #c1c1c1;
  background: #fff;
  text-align: center;
  padding: 12px 20px;
  min-width: 200px;
  color: #5f749f;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-right: 10px;
  cursor: pointer;
`;