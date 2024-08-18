import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStore, faStoreSlash, faBook, faBookOpenReader, faSquareCheck, faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// 완료
const axiosBaseURL = axios.create({    withCredentials: true,
});

const MyBookListCard = (props) => {
  const navigate = useNavigate();
  const [usermessage, setUsermessage] = useState('');
  const [myBookList, setMyBookList] = useState([]);
  const chunkedBooks = myBookList.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 4);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // 초기화
    }

    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  useEffect(() => {
    setUsermessage(props.usermessage);
  }, [props.usermessage]);

  useEffect(() => {
    setMyBookList(props.myBookList);
  }, [props.myBookList]);

  const goDetailPage = (isbn, bookUid) => {
    navigate(`/myDetail`, {
      state: { isbn, bookUid },
    });
  };

  const goaddbook = () => {
    navigate("/search");
  };

  const [selectedBookUid, SetSeletectedBookUid] = useState('');
  const [selectedSaleStatus, SetSelectedSaleStatus] = useState(-1);
  const [count, setCount] = useState(0);

  const handleButtonClick = async () => {
    if (selectedBookUid) {
      try {
        const url = `http://localhost:8080/saleStatusUpdate/${selectedBookUid}`;
        const response = await axiosBaseURL.put(url, {
          readStatus: 1,
          saleStatus: selectedSaleStatus
        });
        const responseData = response.data.data;
        console.log(responseData);
        if (responseData === "bookstate update success") {
          setCount(count + 1);
          props.setCount(count);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  function fetchOne(saleStatus, bookUid) {
    SetSelectedSaleStatus(saleStatus === 0 ? 1 : 0);
    SetSeletectedBookUid(bookUid);
  }

  useEffect(() => {
    handleButtonClick();
  }, [selectedSaleStatus, selectedBookUid]);

  return (
    <BookListCardContainer>
      <BookListCardHeader>
        <LeftBox>
          <LeftBoxText>{usermessage}</LeftBoxText>
        </LeftBox>
        <AddBookButton onClick={goaddbook}>
          <FontAwesomeIcon icon={faPlus} />
          책 추가
        </AddBookButton>
      </BookListCardHeader>
      <TopStatusContainer>
        <StatusText><FontAwesomeIcon icon={faStore} />  거래 가능</StatusText>
        <StatusText><FontAwesomeIcon icon={faStoreSlash} /> 거래 불가능</StatusText>
      </TopStatusContainer>
      {myBookList && myBookList.reduce((chunks, book, index) => {
        if (index % 5 === 0) chunks.push([]);
        chunks[chunks.length - 1].push(book);
        return chunks;
      }, []).map((chunk, chunkIndex) => (
        <BookListBodyContainer key={chunkIndex}>
          {chunk.map((book) => (
            <BookItem key={book.bookUid}>
              <BookimgBox
                src={book.coverImageUrl}
                onClick={() =>
                  goDetailPage(
                    book.isbn,
                    book.bookUid
                  )
                }
              />
              <BookButtonsContainer>
                <ActionButton completed0={book.readStatus} id='book'>
                  {(book.readStatus === 0 ? <FontAwesomeIcon icon={faBook} /> :
                    book.readStatus === 1 ? <FontAwesomeIcon icon={faHeart} /> :
                      book.readStatus === 2 ? <FontAwesomeIcon icon={faBookOpenReader} /> :
                        book.readStatus === 3 ? <FontAwesomeIcon icon={faSquareCheck} /> : null)}
                </ActionButton>
                <ActionButton
                  completed1={book.salestate} id='sale'
                  onClick={() => { fetchOne(book.saleStatus, book.bookUid); }}
                >
                  {(book.saleStatus) === 0 ? <FontAwesomeIcon icon={faStoreSlash} /> : <FontAwesomeIcon icon={faStore} />}
                </ActionButton>
              </BookButtonsContainer>
            </BookItem>
          ))}
        </BookListBodyContainer>
      ))}
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
  border-radius: 10px;
  width: 100px;
  height: 140px;
  cursor: pointer;
  margin-left:20px;
`;

const BookItem = styled.div`
  display: flex;
`;

const BookButtonsContainer = styled.div`
  display: flex;
  width: 40px;
  flex-direction: column;
`;

const ActionButton = styled.button`
  background : rgba(90,90,90,0);
  font-color: ${({ completed0, completed1, id }) => {
    if (id === 'book') {
      if (completed0 === 0 || completed0 === 2 || completed0 === 3) {
        return "#fff";
      }
      else { return "#5f749f"; }
    } else {
      if (completed1 === 0) {
        return "#fff";
      }
      else { return "#5f749f"; }
    }
  }};
  color: ${({ completed0, completed1, id }) => {
    if (id === 'book') {
      if (completed0 === 0 || completed0 === 2 || completed0 === 3) {
        return "#5f749f";
      }
      else { return "#ff7676"; }
    } else {
      if (completed1 === 0) {
        return "#5f749f";
      }
      else { return "#5f749f"; }
    }
  }};
  cursor: pointer;
  margin-top: 10px;
  padding: 0px;
  margin-left: 5px;
  width: 30px;
  border: none;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  transition: background-color 0.3s, color 0.3s;

  // &:hover {
  //   background-color: ${({ completed1, id }) => {
    //     if (id === 'sale') {
    //       if ( completed1 === 1){
    //         return "#fff";
    //       }
    //       else { return "#5f749f";}
    //     }
    //   }};
    //   color: ${({completed1, id }) => {
    //     if (id === 'sale') {
    //       if ( completed1 === 1){
    //         return "#5f749f";
    //       }
    //       else { return "#fff";}
    //     } 
    //     }
  }};
  }
`;

const TopStatusContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const StatusText = styled.p`
  font-size: 16px;
  margin: 0 10px;
  color: #afafaf;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
`;