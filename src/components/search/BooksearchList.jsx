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
            <AddbookContainer>
              <AddbookBox>책 추가하기</AddbookBox>
            </AddbookContainer>
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
  width: 400px;
`;

const BookSubText = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const AddbookContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
  margin-top : 50px;
`;

const AddbookBox = styled.p`
  border-radius: 10px;
  border: 1px solid #c1c1c1;
  background: #fff;
  text-align: center;
  padding: 12px 20px;
  min-width: 200px;
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-right: 10px;
  cursor: pointer;
`;