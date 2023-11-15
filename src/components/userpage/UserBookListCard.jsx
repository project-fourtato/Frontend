import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const UserBookListCard = ({ myBookList }) => {
  const [completedBooks, setCompletedBooks] = useState([]);

  const goDetailPage = (id, bookimg, title, contents, auther, publisher) => {
    console.log("Details not available for other user's books");
  };

  // dummyMyBookList를 myBookList로 변경
  return (
    <BookListCardContainer>
      {/* 헤더 */}
      <BookListCardHeader>
        <LeftBox>
          <LeftBoxText>저는 해리포터 좋아해요!</LeftBoxText>
        </LeftBox>
        {/* 타인 서재에서는 책 추가 버튼이 필요하지 않을 것이므로 숨김 */}
      </BookListCardHeader>
      {/* 책 리스트 */}
      <BookListBodyContainer>
        {/* dummyMyBookList 삭제 */}
        {myBookList && myBookList.length > 0 ? (
          myBookList.map((book) => (
            <BookItem key={book.id}>
              <BookimgBox
                src={book.img}
                onClick={() =>
                  goDetailPage(
                    book.id,
                    book.img,
                    book.title,
                    book.contents,
                    book.author,
                    book.publisher
                  )
                }
              />
              <BookButtonsContainer>
                <ActionButton
                  completed={completedBooks.includes(book.id)}
                  onClick={() => handleButtonClick(book.id)}
                >
                  {completedBooks.includes(book.id) ? "독서완료" : "독서중"}
                </ActionButton>
                <ActionButton
                  completed={completedBooks.includes(book.id)}
                  onClick={() => handleButtonClick(book.id)}
                >
                  {completedBooks.includes(book.id) ? "거래불가능" : "거래가능"}
                </ActionButton>
              </BookButtonsContainer>
            </BookItem>
          ))
        ) : (
          <div>No books available</div>
        )}
      </BookListBodyContainer>
    </BookListCardContainer>
  );

  // handleButtonClick 함수 추가
  function handleButtonClick(bookId) {
    console.log("Status change not allowed for other user's books");
  }
};

export default UserBookListCard;


const BookListCardContainer = styled.div`
  width: 850px;
`;

const BookListCardHeader = styled.div`
  display: flex;
  margin-bottom: 25px;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  position: relative;
  background: #6089B7;
  border-radius: 1em;
  padding: 1em 5em;
  height: 10px;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 65%;
    width: 0;
    height: 0;
    border: 1.719em solid transparent;
    border-right-color: #6089B7;
    border-left: 0;
    border-bottom: 0;
    margin-top: -0.959em;
    margin-left: -0.519em;
  }
`;

const LeftBoxText = styled.h5`
  color: #fff;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 70%;
  letter-spacing: -0.17px;
`;

const AddBookButton = styled.button`
  border-radius: 43px;
  border: 1px solid #c1c1c1;
  background: #fff;
  cursor: pointer;
  padding: 10px 20px;
  width: 140px;
  height: 42px;
  line-height: 4px;
  transform: rotate(-0.001deg);
  color: #000;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  > svg {
    margin-right: 10px;
  }
  &:hover {
    background: #5F749F;
    color: #fff;
  }
`;

const BookListBodyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #c1c1c1;
  margin-bottom: 30px;
  height: 150px;
`;

const BookimgBox = styled.img`
  width: 40%;
  height: 100%;
  cursor: pointer;
  border-radius: 5px;
`;

const BookItem = styled.div`
  display: flex;
`;

const BookButtonsContainer = styled.div`
  display: flex;
  width: 100px; 
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 1px;
`;

const ActionButton = styled.button`
  border-radius: 8px;
  background-color: ${({ completed }) => (completed ? '#5F749F' : '#fff')};
  color: ${({ completed }) => (completed ? '#fff' : '#000')};
  cursor: pointer;
  margin-bottom: 7px;
  padding: 5px;
  border: 1px solid #BABABA;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  transition: background-color 0.3s, color 0.3s;
  height: 33px;
  width: 95px;

  &:hover {
    background-color: ${({ completed }) => (completed ? '#5F749F' : '#000')};
    color: ${({ completed }) => (completed ? '#fff' : '#fff')};
  }
`;