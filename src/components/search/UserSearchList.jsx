import React from "react";
import styled from "styled-components";
import { usersearchList } from "../../data/searchdata";

function UserSearchList(props) {
  return (
    <UserListCardContainer>
      {usersearchList.map((user) => (
        <UserListBox key={user.id}>
          <UserImgBox src={user.img} />
          <UserInfoOutDiv>
            <UserTitleText><span>{user.name}</span> 님</UserTitleText>
            <UserSpeechBox>
              <UserSpeechBoxText>{user.contents}</UserSpeechBoxText>
            </UserSpeechBox>
          </UserInfoOutDiv>
        </UserListBox>
      ))}
    </UserListCardContainer>
  );
}

export default UserSearchList;

const UserListCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: 5.5%;
`;

const UserListBox = styled.div`
  display: flex;
  cursor: pointer;
  width: 37rem;
  &:hover {
    opacity: 0.8;
  }
`;

const UserImgBox = styled.img`
  margin-right: 25px;
  margin-bottom: 40px;
  width: 85px;
  height: 85px;
`;

const UserInfoOutDiv = styled.div`
  margin-top: 5px;
  margin-left: 1px;
`

const UserTitleText = styled.h5`
  color: #000;
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
  line-height: 109.867%; /* 37.37px */
  letter-spacing: -0.17px;
  margin-bottom: 10px;
  >span {
    color: #32497B
  }
`;

const UserSpeechBox = styled.div`
  position: relative;
  background: #37d15d;
  border-radius: 1em;
  padding: 1em 5em;
  height: 0.8rem;
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
    margin-top: -1.2em;
    margin-left: -0.519em;
  }
`;

const UserSpeechBoxText = styled.h5`
  color: #fff;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 80%;
  letter-spacing: -0.17px;
`;
