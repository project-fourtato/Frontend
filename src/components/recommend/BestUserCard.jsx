import React from "react";
import { FaUserTag } from "react-icons/fa";
import styled from "styled-components";
import { usersearchList } from "../../data/recommenddata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "../../App.css"

function BestUserCard(props) {
  return (
    <Container>
      <TitleText>
        <FontAwesomeIcon icon={faUserCheck} />
        취향이 비슷한 유저
      </TitleText>

      {usersearchList.map((user) => {
        return (
          <UserListBox key={user.id}>
            <UserImgBox>
              <UserImg src={user.img} />
            </UserImgBox>
            <UserInfoOutDiv>
              <UserTitleText><NicknameSpan>{user.name}</NicknameSpan> 님</UserTitleText>
              <TagContainer>
                {user.tag.map((tag) => {
                  return <Tagbox>{tag}</Tagbox>;
                })}
              </TagContainer>
            </UserInfoOutDiv>
          </UserListBox>
        );
      })}
      { (usersearchList.length == 4) ? <FontAwesomeIcon icon={faChevronDown} className="icon-bestbook-arrow" size="lg" /> : "" }
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
  box-shadow: 3px 8px 8px 3px rgba(0,0,0,0.16), 2px 3px 6px rgba(0,0,0,0.23);
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
`

const UserInfoOutDiv = styled.div`
  margin-top: 4px;
`

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
  color: #7283A6;
`

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
