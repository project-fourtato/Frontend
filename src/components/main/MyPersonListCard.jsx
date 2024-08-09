import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { mainPersonList } from "../../data/maindata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import texticon from "../../assets/texticon.png";
import Session from 'react-session-api';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyPersonListCard(props) {
  const profile = sessionStorage.getItem("profile");
  const p = JSON.parse(profile);
  const [ProfileResponse, setProfileResponse] = useState([]);
  const axiosBaseURL = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
  }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = '/follow/followingsLatestJournals';
        const response = await axiosBaseURL.post(url);
        setProfileResponse(response.data);        
      } catch(error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  const navigate = useNavigate();
  const studyPage = (uid) => {
    // console.log(uid);
    navigate("/studyPage/"+uid);
  };

  return (
    <CardContainer>
      <MainTitleContainer>
        <FontAwesomeIcon icon={faEnvelopeOpenText} className="icon-open-text" />
        <CardTitle>내가 구독한 사람들의 현재 활동</CardTitle>
      </MainTitleContainer>

      {ProfileResponse.map((book) => {
        return (
          <BookListContainer key={book.toUserId} onClick={() => studyPage(book.toUserId)}>
            
            <ProfileImage src={book.userimageUrl} alt="bookimg" />
            <BookListContent>
              <ContentTitleText><NicknameSpan>{book.nickname}</NicknameSpan> 님</ContentTitleText>
              <ContentText>{book.pcontents}</ContentText>
              <SubText>{book.pdatetime.split("T")[0]+" "+book.pdatetime.split("T")[1]}</SubText>
            </BookListContent>
          </BookListContainer>
        );
      })}
    </CardContainer>
  );
}

export default MyPersonListCard;

const CardContainer = styled.div`
  border-radius: 40px;
  background: white;
  box-shadow: 3px 8px 8px 3px rgba(0,0,0,0.16), 2px 3px 6px rgba(0,0,0,0.23); 
  width: 700px;
  padding: 48px 60px 21px 60px;
  margin-bottom: 40px;
`;

const MainTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.p`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const BookListContainer = styled.div`
  display: flex;
  margin-bottom: 9px;
  padding: 15px;
  cursor: pointer;
  &:hover {
    border-radius: 15px;
    background: #F8F8F8;
  }
`;

const ProfileImage = styled.img`
  width: 62px;
  height: 62px;
  border-radius: 50%;
`

const BookListContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  width: 90%;
  padding-top: 0.5%;
`;

const ContentTitleText = styled.p`
  color: #000;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const NicknameSpan = styled.span`
  color: #7283A6;
`

const ContentText = styled.p`
  margin-top: 10px;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const SubText = styled.p`
  margin-top: 10px;
  color: #A2A2A2;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  justify-content: flex-end;
`;
