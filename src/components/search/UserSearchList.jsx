import React from "react";
import styled from "styled-components";
import { usersearchList } from "../../data/searchdata";

function UserSearchList(props) {
  return (
    <UserListCardContainer>
      {usersearchList.map((user) => (
        <UserListBox key={user.id}>
          <UserImgBox>
            <img src={user.img} />
          </UserImgBox>
          <div>
            <UserTitleText>{user.name}</UserTitleText>
            <UserSpeechBox>
              <UserSpeechBoxText>{user.contents}</UserSpeechBoxText>
            </UserSpeechBox>
          </div>
        </UserListBox>
      ))}
    </UserListCardContainer>
  );
}

export default UserSearchList;

const UserListCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const UserListBox = styled.div`
  display: flex;
  cursor: pointer;
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

const UserSpeechBox = styled.div`
  position: relative;
  background: #37d15d;
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
    border-right-color: #37d15d;
    border-left: 0;
    border-bottom: 0;
    margin-top: -0.959em;
    margin-left: -0.519em;
  }
`;

const UserSpeechBoxText = styled.h5`
  color: #fff;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 109.867%;
  letter-spacing: -0.17px;
`;
