import {React, useState, useEffect} from "react";
import styled from "styled-components";
// import { usersearchList } from "../../data/searchdata";
import axios from "axios";
import Session from 'react-session-api';
import { useNavigate } from "react-router-dom";


function UserSearchList(props) {
  const [searchValue, setSearch] = useState('');
  const [usersearchList, setUsersearchList] = useState([])
  useEffect(() => {
    const a = props.searchValue;
    setSearch(a);
  },[props.searchValue]);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(searchValue);
        const stringWithoutSpaces = searchValue.replace(/\s/g, ''); //공백제거 코드
        const url = 'http://localhost:8080/profile/search/'+stringWithoutSpaces;
        // console.log(url);
        const response = await axios.get(url);
        const responseData = JSON.parse(response.request.responseText);
        setUsersearchList(responseData.data);
        // console.log(responseData);
        
      } catch(error) {
        console.log(error);
      }
    };
    if(props.searchValue){
    fetchData();
    }
  }, [searchValue]);

  const navigate = useNavigate();
  const studyPage = (uid) => {
    // console.log(uid);
    navigate("/studyPage/"+uid);
  };

  return (
    <UserListCardContainer>
      {usersearchList.map((user) => (
        <UserListBox key={user.uid} onClick={() => studyPage(user.uid)}>
          <UserImgBox src={user.useriamgeUrl} />
          <UserInfoOutDiv> 
            <UserTitleText><span>{user.nickname}</span> 님</UserTitleText>
            <UserSpeechBox>
              <UserSpeechBoxText>{user.usermessage}</UserSpeechBoxText>
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
  &:hover {
    opacity: 0.8;
  }
`;

const UserImgBox = styled.img`
  margin-right: 25px;
  margin-bottom: 40px;
  width: 85px;
  height: 85px;
  border-radius: 50%;
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
  background: #5f749f;
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
    border-right-color: #5f749f;
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
