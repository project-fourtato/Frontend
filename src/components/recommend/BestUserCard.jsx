import React from "react";
import { FaUserTag } from "react-icons/fa";
import styled from "styled-components";
import { usersearchList } from "../../data/recommenddata";

function BestUserCard(props) {
  return (
    <Container>
      <TitleText>
        <FaUserTag />
        취향이 비슷한 유저
      </TitleText>

      {usersearchList.map((user) => {
        return (
          <UserListBox key={user.id}>
            <UserImgBox>
              <img src={user.img} />
            </UserImgBox>
            <div>
              <UserTitleText>{user.name}</UserTitleText>

              <TagContainer>
                {user.tag.map((tag) => {
                  return <Tagbox>{tag}</Tagbox>;
                })}
              </TagContainer>
            </div>
          </UserListBox>
        );
      })}
    </Container>
  );
}

export default BestUserCard;

const Container = styled.div`
  width: 620px;
`;

const TitleText = styled.h5`
  color: #000;
  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  svg {
    margin-right: 13px;
    width: 30px;
    height: 30px;
  }
`;

const UserListBox = styled.div`
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 40px;
`;

const UserImgBox = styled.div`
  margin-right: 25px;
  margin-bottom: 40px;
`;

const UserTitleText = styled.h5`
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 109.867%; /* 37.37px */
  letter-spacing: -0.17px;
  margin-bottom: 10px;
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Tagbox = styled.p`
  border-radius: 43px;
  border: 1px solid #c1c1c1;
  background: #fff;
  text-align: center;
  padding: 10px 10px;
  width: 80px;
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    color: #37d15d;
  }
`;
