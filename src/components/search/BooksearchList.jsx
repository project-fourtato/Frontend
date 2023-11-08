import React from "react";
import styled from "styled-components";
import { booksearchList } from "../../data/searchdata";

function BooksearchList(props) {
  return (
    <BookListCardContainer>
      {booksearchList.map((book) => (
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
      ))}
    </BookListCardContainer>
  );
}

export default BooksearchList;

const BookListCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const BookListBox = styled.div`
  display: flex;
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
