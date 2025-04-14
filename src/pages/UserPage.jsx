import styled from "styled-components";
import UserBookListCard from "../components/userpage/UserBookListCard";
import UserProfileHeader from "../components/userpage/UserProfileHeader";
import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const UserPage = (props) => {
  const [usermessage, setUsermessage] = useState('');
  const [nickname, setNickname] = useState('');
  const p = props.UserUid;
  const navigate = useNavigate();

  const [myBookList, setMyBookList] = useState([]);
  useEffect(() => {
    // console.log(usermessage);
    // console.log(nickname);
  },[usermessage, nickname]);
  useEffect(() => {
    const UserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/booksList/`+p);
        // console.log(response);
        const data = response.data.data;
        console.log(data);

        setMyBookList(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    UserData();
  }, []); 
  return (
    <Container>
      <AllOutDiv>
        <UserProfileHeader usermessage={usermessage} setUsermessage={setUsermessage} setNickname={setNickname} UserUid={p}/>
        <UserBookListCard usermessage={usermessage} nickname={nickname} myBookList={myBookList}/>
      </AllOutDiv>
    </Container>
  );
};

export default UserPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1.5rem;
  height: 100%;
  width: 100%;
`;

const AllOutDiv = styled.div`
  background-color: white;
  width: 68%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 45px;
  padding-top: 70px;
  padding-bottom: 43px;
  box-shadow: 3px 8px 8px 3px rgba(0,0,0,0.16), 2px 3px 6px rgba(0,0,0,0.23);
`
