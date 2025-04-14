import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import IntroAndIndexFooter from "../components/bookdetail/IntroAndIndexFooter";
import ReviewBox from "../components/bookdetail/ReviewBox";
import axios from "axios";
import swal from "sweetalert";

const NewBookDetailPage = (props) => {
  const [bookData, setBookData] = useState({
    cover: "hi",
  });
  const location = useLocation();
  const navigate = useNavigate();
  let uid = "";
  let isbn = "";
  try {
    uid = location.state.uid;
    isbn = location.state.isbn;
  } catch (error) {
    navigate("/error");
  }

  const nickname = "회원";
  const [firstPart, setFirstPart] = useState("");
  const [secondPart, setSecondPart] = useState("");

  const domain = process.env.REACT_APP_API_DOMAIN;
  const axiosBaseURL = axios.create({
    baseURL: domain,
    withCredentials: true,
  });

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axiosBaseURL.get(
          `/journals/bookDetailsByISBN/${isbn}`
        );

        const data = response.data;
        console.log(response);
        console.log(data);
        setBookData(data);
        const title = data.bookTitle;

        // Handling title split by "-"
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
        navigate("/error"); // Navigate to error page on failure
      }
    };

    fetchBookData();
  }, []);

  function handleDropdownItemClick(option) {
    const showAlert = (title, text, icon) => {
      swal({
        title,
        text,
        icon,
      });
    };

    if (option === "책 추가하기") {
      swal({
        title: "책을 추가하시겠습니까?",
        text: "책을 추가하시면 개인서재로 이동합니다.",
        buttons: ["취소", "추가"],
      }).then(async (willAdd) => {
        if (willAdd) {
          try {
            const url = `/search/books/new/`;
            await axiosBaseURL.post(url, {
              isbn: isbn,
              readStatus: 0,
              saleStatus: 0,
            });
            navigate("/mypage");
            showAlert("책 추가", "추가되었습니다.", "success");
          } catch (error) {
            console.error("Error adding book", error);
            showAlert("책 추가 실패", "추가에 실패했습니다.", "error");
          }
        } else {
          showAlert("책 추가 취소", "추가가 취소되었습니다.", "error");
        }
      });
    }
  }

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
              <DropdownMenu>
                <DropdownItem
                  onClick={() => handleDropdownItemClick("책 추가하기")}
                >
                  책 추가하기
                </DropdownItem>
              </DropdownMenu>
            </ProgressContainer>
          </BookDetailTextBox>
        </BookDetailInnerContainer>
        <IntroAndIndexFooter
          categoryName={bookData.categoryName}
          description={bookData.description}
        />
      </BookDetailBox>
      <ReviewBox userbid={""} type={"new"} nickname={nickname} />
    </BookDetailContainer>
  );
};

export default NewBookDetailPage;

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
  height: 190px;
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
  padding: 12px 20px;
  min-width: 120px;
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
`;
