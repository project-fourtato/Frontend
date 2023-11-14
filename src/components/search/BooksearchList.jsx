import React from "react";
import styled from "styled-components";
import { booksearchList } from "../../data/searchdata";
import "../../App.css"

function BooksearchList(props) {
  return (
    <AllOutDiv>
    <BookListCardContainer>

      {booksearchList.map((book) => (
        <BookListBox key={book.id}>
          <BookImgBox src={book.img} />
          <BookInfoOutDiv>  
            <BookTitleText>{book.title}</BookTitleText>
            <BookSubText>{book.author}</BookSubText>
            <BookSubText>{book.publisher}</BookSubText>
            <AddbookBox>책 추가하기</AddbookBox>
          </BookInfoOutDiv>
          
        </BookListBox>
        
      ))}
    </BookListCardContainer>
    </AllOutDiv>
  );
}

export default BooksearchList;

const AllOutDiv = styled.div`
  margin-left: 13.8%;
  margin-bottom: 5%;
`

const BookListCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const BookListBox = styled.div`
  display: flex;
`;

const BookImgBox = styled.img`
  margin-right: 18px;
  margin-bottom: 40px;
  width: 24%;
  border-radius: 5px;
`;

const BookInfoOutDiv = styled.div`
  padding-top: 5px;
`

const BookTitleText = styled.h5`
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 109.867%; /* 37.37px */
  letter-spacing: -0.17px;
  margin-bottom: 8px;
  width: 400px;
`;

const BookSubText = styled.p`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 2px;
`;

const AddbookBox = styled.p`
  border-radius: 10px;
  border: 1px solid #c1c1c1;
  background: #fff;
  text-align: center;
  padding: 12px 20px;
  width: 110px;
  height: 16px;
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  margin-top: 10px;
`;