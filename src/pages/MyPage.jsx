import styled from "styled-components";
import MyBookListCard from "../components/mypage/MyBookListCard";
import ProfileHeader from "../components/mypage/ProfileHeader";
import { myBookList } from "../data/mypagedata"; 
import {useEffect, useState} from "react";
import axios from "axios";


const MyPage = (props) => {
  const axiosBaseURL = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
  });

  const [usermessage, setUsermessage] = useState('');
  const [nickname, setNickname] = useState('');
  const pro = sessionStorage.getItem("profile");
  const p = JSON.parse(pro); //session uid 가져오기
  const [myBookList, setMyBookList] = useState([]);
  useEffect(() => {
    // console.log(usermessage);
  },[usermessage]);
  const [count, setCount] = useState('');

  useEffect(() => {
    const UserData = async () => {
      try {
        // console.log("부모까지왔다");
        const response = await axiosBaseURL.get(`/booksList`);
        setMyBookList(response.data.result);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    UserData();
  }, [count]);
  return (
    <Container>
      <AllOutDiv>
        <ProfileHeader setUsermessage={setUsermessage}/>
        <MyBookListCard usermessage={usermessage} myBookList={myBookList} setCount={setCount}/> {/* 데이터를 전달 */}
      </AllOutDiv>
    </Container>
  );
};

export default MyPage;

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
`;
