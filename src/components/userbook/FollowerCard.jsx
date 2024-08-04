import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import "../../App.css"
import { useNavigate } from "react-router-dom";

function FollowerCard(props) {
  const profile = sessionStorage.getItem("profile");
  const p = JSON.parse(profile);
  const [followerList, setFollowerList] = useState([]);
  const navigate = useNavigate();
  const lastSegment = props.lastSegment; //uid

  const axiosBaseURL = axios.create({
    withCredentials: true,
  }
  );

  useEffect(() => {
    const fetchFollowerList = async () => {
      try {
        const response = await axiosBaseURL.post("http://localhost:8080/follow/followersList");
        setFollowerList(response.data);
      } catch (error) {
        // console.error("팔로워 목록을 불러오는 중 오류 발생:", error);
      }
    };

    fetchFollowerList();
  }, []);

  const studyPage = (uid) => {
    // console.log(uid);
    navigate("/studyPage/"+uid);
  };


  return (
    <>
      <FollowingContainer>
        <FollowingBox>팔로워</FollowingBox>
      </FollowingContainer>
      {followerList.map((follower, index) => (
        <BookListCardContainer key={index} onClick={() => studyPage(follower.profileUid)}>
          <ProfileImage src={follower.userimageUrl} alt="프로필 사진" />
          <ProfileName>{follower.nickname}</ProfileName>
          <BookListCardHeader>
            <LeftBox>
              <LeftBoxText>{follower.usermessage}</LeftBoxText>
            </LeftBox>
          </BookListCardHeader>
        </BookListCardContainer>
      ))}
    </>
  );
}

export default FollowerCard;

const BookListCardContainer = styled.div`
  display: flex; /* Make the container flex */
  width: 1200px;
  // margin-bottom: 30px;
  padding-top:20px;
  padding-bottom:10px;
  border-bottom: 1px solid #c1c1c1;
  align-items: center; /* Align items vertically */
  &:hover{
  background: #fff;
  cursor: pointer;
  border-radius : 25px;
  opacity : 0.8;
  box-shadow : 2px 2px 2px 2px #dbdbdb;

  }
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
  cursor : default;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
  margin-top : -50px;
  
  
`;

const FollowingBox = styled.p`
  border-radius: 25px;
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
  cursor: default;
  
`;