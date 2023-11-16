import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const MyBookListCard = ({ myBookList }) => {
  const navigate = useNavigate();

  const goDetailPage = (id, bookimg, title, contents, auther, publisher) => {
    navigate(`/detail/${id}`, {
      state: { bookimg, title, contents, auther, publisher },
    });
  };

  const goaddbook = () => {
    navigate("/search");
  };

  const handleButtonClick = (bookId) => {
    if (completedBooks.includes(bookId)) {
      setCompletedBooks(completedBooks.filter((id) => id !== bookId));
    } else {
      setCompletedBooks([...completedBooks, bookId]);
    }
  };

  const [completedBooks, setCompletedBooks] = useState([]);

  return (
    <BookListCardContainer>
      <BookListCardHeader>
        <LeftBox>
          <LeftBoxText>저는 해리포터 좋아해요!</LeftBoxText>
        </LeftBox>
        <AddBookButton onClick={goaddbook}>
          <FontAwesomeIcon icon={faPlus} />
          책 추가
        </AddBookButton>
      </BookListCardHeader>
      <BookListBodyContainer>
        {myBookList.map((book) => (
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
              <ActionButton disabled>
                읽기 전용
              </ActionButton>
              <ActionButton
                completed={completedBooks.includes(book.id)}
                onClick={() => handleButtonClick(book.id)}
              >
                {completedBooks.includes(book.id) ? "거래불가능" : "거래가능"}
              </ActionButton>
            </BookButtonsContainer>
          </BookItem>
        ))}
      </BookListBodyContainer>
    </BookListCardContainer>
  );
};

export default MyBookListCard;

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
  background: #5f749f;
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
    border-right-color: #5f749f;
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
    background: #5f749f;
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
  width: 80px;
  height: 140px;
  margin-right: 15px;
  cursor: pointer;
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
`;

const ActionButton = styled.button`
  border-radius: 5px;
  background-color: ${({ completed }) => (completed ? "#5f749f" : "#fff")};
  color: ${({ completed }) => (completed ? "#fff" : "#000")};
  cursor: pointer;
  margin-top: 10px;
  padding: 5px;
  border: 1px solid #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ completed }) => (completed ? "#5f749f" : "#000")};
    color: ${({ completed }) => (completed ? "#fff" : "#fff")};
  }
`;