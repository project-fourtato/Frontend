import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const UserBookListCard = (props) => {
  const navigate = useNavigate();
  const [usermessage, setUsermessage] = useState('');
  const [myBookList, setMyBookList] = useState([]);
  const [nickname, setNickname] = useState('');
  useEffect(() => {
    setUsermessage(props.usermessage);
    setNickname(props.nickname);
    // console.log(usermessage);
  },[props.usermessage, props.nickname]);

  useEffect(() =>{
    setMyBookList(props.myBookList);
    // console.log(props.myBookList);
  },[props.myBookList]);

  const goDetailPage = (uid, isbn, userbid, bookstate, nickname) => {
    navigate(`/userDetail`, {
      state: { uid, isbn, userbid, bookstate, nickname },
    });
  };

  // dummyMyBookList를 myBookList로 변경
  return (
    <BookListCardContainer>
      <BookListCardHeader>
        <LeftBox>
          <LeftBoxText>{usermessage}</LeftBoxText>
        </LeftBox>
        {/* 타인 서재에서는 책 추가 버튼이 필요하지 않을 것이므로 숨김 */}
        </BookListCardHeader>
      {myBookList && myBookList.reduce((chunks, book, index) => {
        if (index % 4 === 0) chunks.push([]);
        chunks[chunks.length - 1].push(book);
        return chunks;
      }, []).map((chunk, chunkIndex) => (
        <BookListBodyContainer key={chunkIndex}>
          {chunk.map((book) => (
            <BookItem key={book.id}>
              <BookimgBox
                src={book.cover}
                onClick={() =>
                  goDetailPage(
                    book.uid,
                    book.isbn,
                    book.userbid
                  )
                }
              />
              <BookButtonsContainer>
                <ActionButton
                  completed0={book.bookstate} id='book'
                >
                  {(book.bookstate === 0 ? "독서전" :
                    book.bookstate === 1 ? "관심도서" :
                    book.bookstate === 2 ? "독서중" :
                    book.bookstate === 3 ? "독서완료" : null)} 
                </ActionButton>
                <ActionButton
                  completed1={book.salestate} id='sale' 
                >
                  {book.salestate ===0 ? "거래불가능" : "거래가능"}
                </ActionButton>
              </BookButtonsContainer>
            </BookItem>
          ))}
        </BookListBodyContainer>
      ))}
    </BookListCardContainer>
  );
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
  width: 80px;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 15px;
`;

const ActionButton = styled.button`
  border-radius: 8px;
  background-color: ${({ completed0,completed1, id }) => {
    if (id === 'book') {
      if ( completed0 === 0 || completed0 === 2 || completed0 ===3){
        return "#fff";
      }
      else { return "#5f749f";}
    } else {
      if ( completed1 === 0){
        return "#fff";
      }
      else { return "#5f749f";}
    }
  }};
  color: ${({ completed0,completed1, id }) => {
    if (id === 'book') {
      if ( completed0 === 0 || completed0 === 2 || completed0 ===3){
        return "#5f749f";
      }
      else { return "#fff";}
    } else {
      if ( completed1 === 0){
        return "#5f749f";
      }
      else { return "#fff";}
    }
  }};
  cursor: pointer;
  margin-top: 10px;
  padding: 5px;
  border: 1px solid #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  transition: background-color 0.3s, color 0.3s;

`;