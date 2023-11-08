import React from "react";
import styled from "styled-components";
import { mainPersonList } from "../../data/maindata";
import texticon from "../../assets/texticon.png";

function MyPersonListCard(props) {
  return (
    <CardContainer>
      <MainTitleContainer>
        <CardIcon src={texticon} />
        <CardTitle>내가 구독한 사람들의 현재 활동</CardTitle>
      </MainTitleContainer>

      {mainPersonList.map((book) => {
        return (
          <BookListContainer key={book.id}>
            <img src={book.img} alt="bookimg" />
            <BookListContent>
              <ContentTitleText>{book.name}</ContentTitleText>
              <ContentText>{book.contents}</ContentText>
              <SubText>{book.subtitle}</SubText>
            </BookListContent>
          </BookListContainer>
        );
      })}
    </CardContainer>
  );
}

export default MyPersonListCard;

const CardContainer = styled.div`
  border-radius: 40px;
  background: #f9f9f9;
  box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.3);
  width: 700px;
  padding: 40px 60px;
  margin-bottom: 50px;
`;

const MainTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
`;

const CardIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 20px;
`;

const CardTitle = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const BookListContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
`;

const BookListContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  width: 100%;
`;

const ContentTitleText = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ContentText = styled.p`
  margin-top: 10px;
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const SubText = styled.p`
  margin-top: 10px;
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  justify-content: flex-end;
`;
