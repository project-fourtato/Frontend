import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import IntroAndIndexFooter from "../components/bookdetail/IntroAndIndexFooter";
import ReviewBox from "../components/bookdetail/ReviewBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faHeart,
  faBookOpenReader,
  faSquareCheck,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import swal from "sweetalert";

const MyBookDetailPage = (props) => {
  const [bookData, setBookData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const [firstPart, setFirstPart] = useState("");
  const [secondPart, setSecondPart] = useState("");

  let uid = "";
  let isbn = "";
  let bookUid = "";
  try {
    uid = location.state.uid;
    isbn = location.state.isbn;
    bookUid = location.state.bookUid;
  } catch (error) {
    navigate("/error");
  }

  const axiosBaseURL = axios.create({
    baseURL: "https://our-booker.site:8080",
    withCredentials: true,
  });

  // 책 상세정보 조회 API 호출
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axiosBaseURL.get(
          `/journals/bookDetailsByISBN/${isbn}`
        );
        const data = response.data;
        setBookData(data);

        const title = data.bookTitle;
        const firstHyphenIndex = title.indexOf(" - ");
        if (firstHyphenIndex === -1) {
          setFirstPart(title);
          setSecondPart("");
        } else {
          setFirstPart(title.slice(0, firstHyphenIndex));
          setSecondPart(title.slice(firstHyphenIndex));
        }
      } catch (error) {
        console.error("Error fetching book data", error);
      }
    };

    fetchBookData();
  }, [isbn]);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // 독서 상태 조회 API 호출
  const [selectedOption, setSelectedOption] = useState(null); // 초기 값을 null로 설정
  const [count, setCount] = useState(0);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosBaseURL.get(`/readStatus?isbn=${isbn}`);
        const data = response.data;
        setSelectedOption(data.readStatus); // 서버에서 받아온 값 그대로 사용
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, [isbn, uid, count]);

  // 드롭다운 아이템 클릭 핸들러
  const handleDropdownItemClick = (option) => {
    if (option !== selectedOption) {
      // 선택한 옵션이 기존과 다를 때만 상태 업데이트
      setSelectedOption(option);
      setIsDropdownVisible(false);

      if (option === -1) {
        // 삭제 옵션을 숫자로 표현
        swal({
          title: "책을 삭제하시겠습니까?",
          text: "삭제 시 독서록까지 삭제됩니다!",
          icon: "warning",
          buttons: ["취소", "삭제"],
        }).then((willDelete) => {
          if (willDelete) {
            (async () => {
              try {
                const response = await axiosBaseURL.post(
                  `/books/${bookUid}/delete`
                );
                console.log(response);
                navigate("/mypage");
              } catch (error) {
                console.error("Error deleting book", error);
              }
            })();
            swal({
              title: "책 삭제",
              text: "삭제되었습니다.",
              icon: "success",
            });
          } else {
            swal({
              title: "책 삭제 취소",
              text: "삭제가 취소되었습니다.",
              icon: "error",
            });
          }
        });
      } else {
        handleOption(option);
      }
    } else {
      setIsDropdownVisible(false);
    }
  };

  const handleOption = async (option) => {
    try {
      const url = `/readStatusUpdate/${bookUid}`;
      await axiosBaseURL.put(url, {
        readStatus: option, // 숫자로 전송
        saleStatus: 0,
      });
      setCount(count + 1); // 성공적으로 업데이트되면 count 증가
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BookDetailContainer>
      <BookDetailBox>
        <BookDetailInnerContainer>
          <BookImg src={bookData.coverImageUrl} alt="책 이미지" />
          <BookDetailTextBox>
            <h2>{firstPart}</h2>
            <h5>{secondPart}</h5>
            <p>{bookData.author}</p>
            <p className="p2">
              {bookData.publisher} | {bookData.pubDate}
            </p>
            <ProgressContainer>
              <ProgressBox
                onClick={() => setIsDropdownVisible(!isDropdownVisible)}
              >
                <FontAwesomeIcon
                  icon={
                    selectedOption === 0
                      ? faBook
                      : selectedOption === 1
                      ? faHeart
                      : selectedOption === 2
                      ? faBookOpenReader
                      : selectedOption === 3
                      ? faSquareCheck
                      : ""
                  }
                />
                {selectedOption === 0
                  ? "읽기 전"
                  : selectedOption === 1
                  ? "읽고 싶은 책"
                  : selectedOption === 2
                  ? "읽는 중"
                  : selectedOption === 3
                  ? "독서 완료"
                  : ""}
                {isDropdownVisible && (
                  <DropdownMenu>
                    <DropdownItem onClick={() => handleDropdownItemClick(0)}>
                      <FontAwesomeIcon icon={faBook} /> 읽기 전
                    </DropdownItem>
                    <DropdownItem onClick={() => handleDropdownItemClick(1)}>
                      <FontAwesomeIcon icon={faHeart} /> 읽고 싶은 책
                    </DropdownItem>
                    <DropdownItem onClick={() => handleDropdownItemClick(2)}>
                      <FontAwesomeIcon icon={faBookOpenReader} /> 읽는 중
                    </DropdownItem>
                    <DropdownItem onClick={() => handleDropdownItemClick(3)}>
                      <FontAwesomeIcon icon={faSquareCheck} /> 독서 완료
                    </DropdownItem>
                    <DropdownItem onClick={() => handleDropdownItemClick(-1)}>
                      <FontAwesomeIcon icon={faTrashCan} /> 책 삭제하기
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </ProgressBox>
            </ProgressContainer>
          </BookDetailTextBox>
        </BookDetailInnerContainer>
        <IntroAndIndexFooter
          categoryName={bookData.categoryName}
          description={bookData.description}
        />
      </BookDetailBox>
      <ReviewBox bookUid={bookUid} type={"my"} nickname={"회원"} />
    </BookDetailContainer>
  );
};

export default MyBookDetailPage;

const BookDetailContainer = styled.div`
  display: flex;
  margin-top: 1.2rem;
  /* padding: 0 7rem; */
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const BookDetailInnerContainer = styled.div`
  display: flex;
`;

const BookDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-left: 50px; */
  margin-right: 50px;
  height: 29.4rem;
  width: 30rem;
  background-color: white;
  border-radius: 40px;
  box-shadow: 3px 8px 8px 3px rgba(0, 0, 0, 0.16),
    2px 3px 6px rgba(0, 0, 0, 0.23);
  padding: 45px 55px;
`;

const BookImg = styled.img`
  margin-right: 1.3rem;
  width: 30%;
  border-radius: 10px;
`;

const BookDetailTextBox = styled.div`
  margin-top: 6px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  > h2 {
    color: #142343;
    font-size: 19px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 5px;
  }
  > h5 {
    color: #000;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 10px;
  }
  > p {
    color: #000;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .p2 {
    margin-top: 3px;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 15px;
  position: relative;
`;

const ProgressBox = styled.div`
  position: relative;
  border-radius: 10px;
  border: 1px solid #c1c1c1;
  background: #fff;
  text-align: center;
  padding: 12px 25px 12px 20px;
  min-width: 115px;
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-right: 10px;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    border-style: solid;
    border-width: 6px 6px 0;
    border-color: #000 transparent transparent transparent;
  }
  > svg {
    margin-right: 10px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.23);
  z-index: 1;
  min-width: 150px;
  padding-top: 3px;
  padding-bottom: 3px;
`;

const DropdownItem = styled.p`
  padding: 12px 20px;
  margin: 0;
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  text-align: center;
  width: 116px;
  > svg {
    margin-right: 7px;
  }
`;
