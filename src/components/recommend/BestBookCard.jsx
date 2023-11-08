import React from "react";
import { FaBookMedical } from "react-icons/fa";
import { booksearchList } from "../../data/recommenddata";
import styled from "styled-components";
function BestBookCard(props) {
  return (
    <Container>
      <TitleText>
        <FaBookMedical /> 베스트 셀러
      </TitleText>

      {booksearchList.map((book) => {
        return (
          <BookListBox key={book.id}>
            <BookImgBox>
              <img src={book.img} />
            </BookImgBox>
            <div>
              <BookTitleText>{book.title}</BookTitleText>
              <BookSubText>{book.author}</BookSubText>
              <BookSubText>{book.publisher}</BookSubText>
            </div>
          </BookListBox>
        );
      })}
    </Container>
  );
}

export default BestBookCard;

const Container = styled.div`
  width: 620px;
  margin-right: 50px;
`;

const TitleText = styled.h5`
  color: #000;
  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  svg {
    margin-right: 13px;
    width: 30px;
    height: 30px;
  }
`;

const BookListBox = styled.div`
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 40px;
`;

const BookImgBox = styled.div`
  margin-right: 25px;
  margin-bottom: 40px;
`;

const BookTitleText = styled.h5`
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 109.867%; /* 37.37px */
  letter-spacing: -0.17px;
  margin-bottom: 10px;
`;

const BookSubText = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
