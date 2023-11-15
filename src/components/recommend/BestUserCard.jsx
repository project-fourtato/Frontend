import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";

function BestUserCard() {
  // 프로필 정보는 세션 스토리지에서 가져오기
  const profile = sessionStorage.getItem("profile");
  const p = JSON.parse(profile);

  const [usersearchList, setUsersearchList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('p.uid:', p.uid);
        const url = 'http://localhost:8080/profile/interests/' + p.uid;
        const response = await axios.get(url);
        console.log(response);
        setUsersearchList(response.data.data);
        console.log('호잇호잇');
        console.log(usersearchList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <TitleText>
        <FontAwesomeIcon icon={faUserCheck} />
        취향이 비슷한 유저
      </TitleText>

      {Array.isArray(usersearchList) && usersearchList.map((user) => {
        return (
          <UserListBox key={user.uid}>
            <UserImgBox>
              <UserImg src={user.useriamgeUrl} />
            </UserImgBox>
            <UserInfoOutDiv>
              <UserTitleText><NicknameSpan>{user.nickname}</NicknameSpan> 님</UserTitleText>
              <TagContainer>
                {[
                  user.uinterest1,
                  user.uinterest2,
                  user.uinterest3,
                  user.uinterest4,
                  user.uinterest5,
                ].map((interest, index) => (
                  <Tagbox key={index}>{interest}</Tagbox>
                ))}
              </TagContainer>
            </UserInfoOutDiv>
          </UserListBox>
        );
      })}
      {(usersearchList.length == 4) ? <FontAwesomeIcon icon={faChevronDown} className="icon-bestbook-arrow" size="lg" /> : ""}
    </Container>
  );
}


export default BestUserCard;

const Container = styled.div`
  width: 35%;
  height: 27rem;
  background-color: white;
  padding: 45px 50px;
  border-radius: 40px;
  box-shadow: 3px 8px 8px 3px rgba(0, 0, 0, 0.16), 2px 3px 6px rgba(0, 0, 0, 0.23);
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TitleText = styled.h5`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  align-items: center;
  margin-bottom: 28px;
  svg {
    margin-right: 15px;
    width: 25px;
    height: 25px;
  }
`;

const UserListBox = styled.div`
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  padding-left: 8px;
  margin-bottom: 25px;
  margin-top: 20px;
  cursor: pointer;
  height: 5.6rem;
  &:hover {
    opacity: 0.8;
  }
`;

const UserImgBox = styled.div`
  margin-right: 25px;
  margin-bottom: 40px;
`;

const UserImg = styled.img`
  width: 4.2rem;
`;

const UserInfoOutDiv = styled.div`
  margin-top: 4px;
`;

const UserTitleText = styled.h5`
  color: #000;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 109.867%; /* 37.37px */
  letter-spacing: -0.17px;
  margin-bottom: 10px;
`;

const NicknameSpan = styled.span`
  color: #7283a6;
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 2.1rem;
  padding-bottom: 0.3rem;
`;

const Tagbox = styled.p`
  border-radius: 43px;
  border: 1px solid #c1c1c1;
  background: #fff;
  text-align: center;
  padding: 10px 10px;
  width: 70px;
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  margin-right: 10px;
`;
