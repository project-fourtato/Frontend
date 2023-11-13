import React from "react";
import styled from "styled-components";
import profile2 from "../../assets/profile2.png";
import userprofile from "../../assets/userprofile.png";

function FollowingCard(props) {
  return (
    <>
      <BookListCardContainer>   
        <FollowingContainer>
          <FollowingBox>팔로잉</FollowingBox>
        </FollowingContainer>     
        <ProfileLeftContainer>
          <ProfileImage src={userprofile} />
          <ProfileName>감자 님의 개인서재</ProfileName>
        </ProfileLeftContainer>
        {/* 헤더 */}
        <BookListCardHeader>
          <LeftBox>
            <LeftBoxText>저는 해리포터 좋아해요!</LeftBoxText>
          </LeftBox>
        </BookListCardHeader>
      </BookListCardContainer>

      <BookListCardContainer>
        <ProfileLeftContainer>
          <ProfileImage src={profile2} />
          <ProfileName>고구마가 되고 싶어 님의 개인서재</ProfileName>
        </ProfileLeftContainer>
        {/* 헤더 */}
        <BookListCardHeader>
          <LeftBox>
            <LeftBoxText>
              저는 판타지랑 액션을 좋아합니당 재미있는 책 있으면 추천해주세요!
            </LeftBoxText>
          </LeftBox>
        </BookListCardHeader>
      </BookListCardContainer>
    </>
  );
}

export default FollowingCard;

const BookListCardContainer = styled.div`
  width: 1200px;
  margin-bottom: 55px;
  border-bottom: 1px solid #c1c1c1;

`;

const ProfileLeftContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
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

const BookListCardHeader = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  position: relative;
  background: #B2CCFF;
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
    border-right-color: #B2CCFF;
    border-left: 0;
    border-bottom: 0;
    margin-top: -0.959em;
    margin-left: -0.519em;
  }
`;

const LeftBoxText = styled.h5`
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 109.867%;
  letter-spacing: -0.17px;
`;

const FollowingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
  margin-top : -50px;
`;

const FollowingBox = styled.p`
  border-radius: 10px;
  border: 1px solid #c1c1c1;
  background: #B2CCFF;
  text-align: center;
  padding: 12px 20px;
  min-width: 200px;
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-right: 10px;
  cursor: pointer;
`;