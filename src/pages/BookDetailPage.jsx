import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import IntroAndIndexFooter from "../components/bookdetail/IntroAndIndexFooter";
import ReviewBox from "../components/bookdetail/ReviewBox";
function BookDetailPage(props) {
  const location = useLocation();
  const bookimg = location.state.bookimg;
  const title = location.state.title;
  const contents = location.state.contents;
  const auther = location.state.auther;
  const publisher = location.state.publisher;

  return (
    <BookDetailContainer>
      <BookDetailBox>
        <BookDetailInnerContainer>
          <BookDetailImg>
            <img src={bookimg} alt="책 이미지" />
          </BookDetailImg>
          <BookDetailTextBox>
            <h2>{title}</h2>
            <h5>{contents}</h5>
            <p>{auther}</p>
            <p>{publisher}</p>
          </BookDetailTextBox>
        </BookDetailInnerContainer>
        <IntroAndIndexFooter />
      </BookDetailBox>
      <ReviewBox />
    </BookDetailContainer>
  );
}

export default BookDetailPage;

const BookDetailContainer = styled.div`
  display: flex;
  margin-top: 5rem;
  /* padding: 0 7rem; */
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const BookDetailInnerContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const BookDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-left: 50px; */
`;

const BookDetailImg = styled.div`
  margin-right: 1.3rem;
  img {
    width: 100%;
    height: 100%;
  }
`;

const BookDetailTextBox = styled.div`
  margin-top: 15px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  > h2 {
    color: #344a39;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 5px;
  }
  > h5 {
    color: #000;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 25px;
  }
  > p {
    color: #000;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
