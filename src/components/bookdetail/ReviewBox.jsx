import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import owlImg from "../../assets/owl.png";
import axios from "axios";
import "../../App.css";
import { useNavigate, useLocation } from "react-router-dom";
// 닉네임 뻬고 다 됨
function ReviewBox(props) {
  const [journalsData, setJournalsData] = useState([]);
  const [bookUid, setBookUid] = useState("");
  const [type, setType] = useState(""); // 기본값 설정
  const nickname = props.nickname;
  const navigate = useNavigate();
  const location = useLocation();
  const axiosBaseURL = axios.create({
    baseURL: "https://our-booker.site:8080",
    withCredentials: true,
  });

  // 상태에서 값 추출
  useEffect(() => {
    try {
      // setBookUid(location.state?.bookUid || "");
      setBookUid(props.bookUid);
      // setType(location.state?.type || ""); // type 상태 설정
      setType(props.type);
    } catch (error) {
      navigate("/error");
    }
  }, [location.state, navigate]);

  // URL에서 경로 추출
  const currentPath = window.location.pathname;
  const lastSegment = currentPath.substring(currentPath.lastIndexOf("/") + 1);

  useEffect(() => {
    // bookUid와 type이 유효한 경우에만 데이터 요청
    if (bookUid && type !== "new") {
      const fetchJournalsData = async () => {
        try {
          const response = await axiosBaseURL.get(
            `/journals/journalsList/${bookUid}`
          );
          setJournalsData(response.data.data);
        } catch (error) {
          console.error("Error fetching journals data", error);
        }
      };
      fetchJournalsData();
    }
  }, [bookUid, type]); // bookUid와 type이 변경될 때마다 실행

  const moveJournalAdd = () => {
    navigate("/journals", { state: { bookUid } });
  };

  const journalAdd = () => {
    if (type === "user") {
      return null;
    } else if (type === "my") {
      return (
        <JournalAddButton onClick={moveJournalAdd}>
          독서록 추가
        </JournalAddButton>
      );
    } else {
      return null;
    }
  };

  const textAdd = () => {
    if (type === "new") {
      return (
        <BookAddMent>
          <img src={owlImg} style={{ width: "70%" }} alt="Owl illustration" />
          <div>"책 추가하기" 버튼을 눌러 독서록을 작성해보세요!</div>
        </BookAddMent>
      );
    }
    return null;
  };

  const handleMoveJournalDetail = (journalId) => {
    navigate(`/journals/${journalId}`, { state: { journalId, lastSegment } });
  };

  return (
    <ReviewBoxContainer>
      <ReviewTitleText>
        <FontAwesomeIcon icon={faPenToSquare} className="icon-review-box" />
        {nickname} 님이 남긴 감상평
      </ReviewTitleText>
      <JournalListOutDiv>
        {textAdd()}
        {journalsData &&
          journalsData.map((journal) => {
            return (
              <ReviewBoxOutDiv
                onClick={() => handleMoveJournalDetail(journal.journalId)}
              >
                <JournalTitleText>{journal.jtitle}</JournalTitleText>
                <JournalDateText>
                  {journal.jdatetime.split("T")[0]}
                </JournalDateText>
              </ReviewBoxOutDiv>
            );
          })}
      </JournalListOutDiv>
      {journalAdd()}
    </ReviewBoxContainer>
  );
}

export default ReviewBox;

const ReviewBoxContainer = styled.div`
  border-radius: 40px;
  box-shadow: 3px 8px 8px 3px rgba(0, 0, 0, 0.16),
    2px 3px 6px rgba(0, 0, 0, 0.23);
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
  margin-top: ${({ type }) => {
    if (type === "user") {
      return "20px";
    } else if (type === "my") {
      return "0";
    } else {
      return "0";
    }
  }};
  overflow: auto;
  height: ${({ type }) => {
    if (type === "user") {
      return "90%";
    } else if (type === "my") {
      return "81%";
    } else {
      return "81%";
    }
  }};
`;

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
  border-bottom: 1px solid #cdcdcd;
  padding: 20px 15px;
  &:hover {
    background-color: #eeeeee;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const JournalAddButton = styled.div`
  width: 150px;
  height: 50px;
  background-color: #f9f9f9;
  border-radius: 15px;
  font-weight: bold;
  font-size: 17px;
  text-align: center;
  line-height: 50px;
  box-shadow: 2.5px 2.5px rgba(0, 0, 0, 0.23);
  margin-left: 70%;
  margin-top: 13px;
  &:hover {
    cursor: pointer;
  }
`;

const BookAddMent = styled.div`
  // padding-top : 10px;
  font-weight: bold;
  font-size: 110%;
  text-align: center;
`;
