import { React, useRef } from "react";
import { useEffect, useState } from "react";
import { FaBookMedical } from "react-icons/fa";
import { booksearchList } from "../../data/recommenddata";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookBookmark,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Session from "react-session-api";

import "../../App.css";

function BestBookCard(props) {
  const domain = process.env.REACT_APP_API_DOMAIN;
  const axiosBaseURL = axios.create({
    baseURL: domain,
    withCredentials: true,
  });

  const profile = sessionStorage.getItem("profile");
  const navigate = useNavigate();
  const p = JSON.parse(profile);
  const scrollRef = useRef(null);
  const handleScrollDown = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const [booksearchList, setBooksearchList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosBaseURL.get("/bestseller");

        // response.data가 이미 배열 형태일 것이므로 추가적인 JSON.parse가 필요하지 않음
        setBooksearchList(response.data.result);
        // console.log("확인");
        // console.log(booksearchList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const goDetailPage = async (uid, isbn) => {
    try {
      const response = await axiosBaseURL.get("/readStatus?isbn=" + isbn);
      const responseData = response.data;
      // console.log(responseData);
      if (responseData.readStatus === -1) {
        navigate(`/newDetail`, {
          state: { uid, isbn },
        });
      } else {
        const bookUid = responseData.bookUid;
        navigate(`/myDetail`, {
          state: { uid, isbn, bookUid },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <TitleText>
        <FontAwesomeIcon icon={faBookBookmark} /> 베스트 셀러
      </TitleText>

      {booksearchList &&
        booksearchList.map((book) => (
          <BookListBox
            key={book.isbn}
            onClick={() => goDetailPage(p.uid, book.isbn)}
          >
            <BookImg src={book.coverImageUrl} />
            <BookInfoOutDiv>
              <BookTitleText>{book.bookTitle}</BookTitleText>
              <BookSubText>{book.author}</BookSubText>
              <BookSubText>{book.publisher}</BookSubText>
            </BookInfoOutDiv>
          </BookListBox>
        ))}

      {booksearchList.length === 3 && (
        <FontAwesomeIcon
          icon={faChevronDown}
          className="icon-bestbook-arrow"
          size="lg"
          onClick={handleScrollDown}
        />
      )}

      <div ref={scrollRef}></div>
    </Container>
  );
}

export default BestBookCard;

const Container = styled.div`
  width: 35%;
  height: 27rem;
  margin-right: 50px;
  background-color: white;
  padding: 45px 50px;
  border-radius: 40px;
  box-shadow: 3px 8px 8px 3px rgba(0, 0, 0, 0.16),
    2px 3px 6px rgba(0, 0, 0, 0.23);
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TitleText = styled.h5`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 15px;
    width: 24px;
    height: 24px;
  }
`;

const BookListBox = styled.div`
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  padding-left: 8px;
  padding-bottom: 25px;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const BookImg = styled.img`
  width: 6rem;
  border-radius: 2px;
`;

const BookInfoOutDiv = styled.div`
  padding-top: 5px;
  margin-left: 20px;
`;

const BookTitleText = styled.h5`
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 109.867%; /* 37.37px */
  letter-spacing: -0.17px;
  margin-bottom: 9px;
`;

const BookSubText = styled.p`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
