import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { reviewList } from "../../data/reviewpage";
import { useNavigate } from "react-router-dom";
import owlImg from "../../assets/owl.png"
import axios from "axios";
import "../../App.css"

function ReviewBox(props) {
  const [journalsData, setJournalsData] = useState(null);
  const userbid = props.userbid;
  const type = props.type; //user인지 my인지 new인지
  const nickname = props.nickname;
  const navigate = useNavigate();

  // 현재 URL에서 경로 추출
  const currentPath = window.location.pathname;
  // 예시: 경로에서 마지막 부분 추출 (마지막 슬래시 이후의 부분)
  const lastSegment = currentPath.substring(currentPath.lastIndexOf('/') + 1); //유저 누르면 여기 값 넣어줘서 확인

  useEffect(()=>{
    // console.log(props.nickname);
  }, [nickname]);
  const moveJournalAdd = () => {
    navigate("/journals", { state : {userbid} });
  }
  const journalAdd = () => {
    if (type == 'user') {
      return '';
    } else if(type == 'my'){
      return <JournalAddButton onClick={moveJournalAdd}>독서록 추가</JournalAddButton>;
    } else {
      return '';
    }
  };
  const textAdd = () => {
    if (type == 'new') { 
      return <BookAddMent><img src={owlImg} style={{ width: "70%" }}/>
      <div>"책 추가하기" 버튼을 눌러 독서록을 작성해보세요!</div></BookAddMent>;
    }
  };
  useEffect(()=>{
    journalAdd();
  }, [type]);
  useEffect(() => {
    const JournalsData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/journalsList/`+userbid);
        // console.log(response);
        const data = response.data.data;
        // console.log(data);
        setJournalsData(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    if(type!=='new'){
    JournalsData();
    }
  }, []);
  const handleMoveJournalDetail = (jid) => {
    navigate("/journals/" + jid, { state : {jid, lastSegment} });
  }
  return (
    <ReviewBoxContainer>
      <ReviewTitleText><FontAwesomeIcon icon={faPenToSquare} className="icon-review-box" />{nickname} 님이 남긴 감상평</ReviewTitleText>
      <JournalListOutDiv>
        {textAdd()}
      {journalsData && journalsData.map((journal) => {
        return (
          <ReviewBoxOutDiv onClick={() => handleMoveJournalDetail(journal.jid)}>
            <JournalTitleText>{journal.ptitle}</JournalTitleText>
            <JournalDateText>{journal.pdatetime.split("T")[0]}</JournalDateText>
          </ReviewBoxOutDiv>
        )
      })}
      </JournalListOutDiv>
      {journalAdd()}
    </ReviewBoxContainer>
  );
}

export default ReviewBox;

const ReviewBoxContainer = styled.div`
  border-radius: 40px;
  box-shadow: 3px 8px 8px 3px rgba(0, 0, 0, 0.16), 2px 3px 6px rgba(0, 0, 0, 0.23);
  width: 460px;
  height: 470px;
  padding: 45px 55px;
  background-color: white;

  /* 스크롤바 커스텀 스타일링 */
  ::-webkit-scrollbar {
    width: 8px; /* 스크롤바 너비 */
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* 스크롤바 트랙 배경색 */
    border-radius: 10px; /* 트랙의 모양을 변경하려면 조정 */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ddd; /* 연한 회색으로 수정 */
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #eee; /* 마우스를 올렸을 때 더 연한 회색 */
  }
`;

const ReviewTitleText = styled.h3`
  color: #000;
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 14px;
`;

const JournalListOutDiv = styled.div`
  margin-top : ${({ type }) => {
    if(type === 'user'){
      return "20px";
    }
    else if(type === 'my'){
      return "0";
    }
    else{
      return "0";
    }
  }};
  overflow: auto;
  height: ${({ type }) => {
    if(type === 'user'){
      return "90%";
    }
    else if(type === 'my'){
      return "81%";
    }
    else{
      return "81%";
    }
  }};
`

const JournalTitleText = styled.div`
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 300px;
`;

const JournalDateText = styled.p`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ReviewBoxOutDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #CDCDCD;
  padding: 20px 15px;
  &:hover {
    background-color: #EEEEEE;
    border-radius: 5px;
    cursor: pointer;
  }
`

const JournalAddButton = styled.div`
  width: 150px;
  height: 50px;
  background-color: #f9f9f9;
  border-radius: 15px;
  font-weight: bold;
  font-size: 17px;
  text-align: center;
  line-height: 50px;
  box-shadow: 2.5px 2.5px rgba(0,0,0,0.23);
  margin-left: 70%;
  margin-top: 13px;
  &:hover {
    cursor: pointer;
  }
`

const BookAddMent = styled.div`
  // padding-top : 10px;
  font-weight : bold;
  font-size : 110%;
  text-align: center;
`