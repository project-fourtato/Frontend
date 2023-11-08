import React from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { myBookList } from "../../data/mypagedata";
import { useNavigate } from "react-router-dom";
function MyBookListCard(props) {
  const navigate = useNavigate();

  const goDetailPage = (id, bookimg, title, contents, auther, publisher) => {
    navigate(`/detail/${id}`, {
      state: { bookimg, title, contents, auther, publisher },
    });
  };

  return (
    <BookListCardContainer>
      {/* 헤더 */}
      <BookListCardHeader>
        <LeftBox>
          <LeftBoxText>저는 해리포터 좋아해요!</LeftBoxText>
        </LeftBox>
        <AddBookButton>
          <FaPlus />책 추가
        </AddBookButton>
      </BookListCardHeader>
      {/* 책 리스트 */}
      <BookListBodyContainer>
        {myBookList.map((book) => {
          return (
            <>
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
            </>
          );
        })}
      </BookListBodyContainer>
      <BookListBodyContainer></BookListBodyContainer>
    </BookListCardContainer>
  );
}

export default MyBookListCard;

const BookListCardContainer = styled.div`
  width: 850px;
`;

const BookListCardHeader = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  position: relative;
  background: #37d15d;
  border-radius: 1em;
  padding: 1em 5em;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 70%;
    width: 0;
    height: 0;
    border: 1.719em solid transparent;
    border-right-color: #37d15d;
    border-left: 0;
    border-bottom: 0;
    margin-top: -0.959em;
    margin-left: -0.519em;
  }
`;

const LeftBoxText = styled.h5`
  color: #fff;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 109.867%;
  letter-spacing: -0.17px;
`;

const AddBookButton = styled.button`
  border-radius: 43px;
  border: 1px solid #c1c1c1;
  background: #fff;
  cursor: pointer;
  padding: 10px 20px;
  width: 150px;
  height: 50px;
  transform: rotate(-0.001deg);
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  > svg {
    margin-right: 10px;
  }
  &:hover {
    background: #344a39;
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
  height: 200px;
`;

const BookimgBox = styled.img`
  width: 120px;
  height: 180px;
  margin-right: 15px;
  cursor: pointer;
`;
