import React, { useState } from "react";
import styled from "styled-components";
import { mainBookList } from "../../data/maindata";
import bookicon from "../../assets/bookicon.png";
import downarrow from "../../assets/downarrow.png";
function BookListCard(props) {

  const [showDropdown, setShowDropdown] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  
  const toggleDropdown = (id) => {
    if (activeDropdownId === id) {
      setActiveDropdownId(null);
    } else {
      setActiveDropdownId(id);
    }
  };
  return (
    <CardContainer>
      <MainTitleContainer>
        <CardIcon src={bookicon} />
        <CardTitle>읽고 있는 책 목록</CardTitle>
      </MainTitleContainer>

      {mainBookList.map((book) => {
  return (
    <BookListContainer key={book.id}>
      <BookImage src={book.img} alt="bookimg" />
      <BookDetailContainer>
        <BookListContent>
          <ContentTitleText>{book.title}</ContentTitleText>
          <ContentText>{book.contents}</ContentText>

          <SubBtnBox>
            <SubBtn onClick={()=>toggleDropdown(book.id)}>
              나와 같이 읽는 사람
              <DownArrowImg src={downarrow} />
            </SubBtn>
          </SubBtnBox>
        </BookListContent>
        {activeDropdownId === book.id && (
          <Dropdown>
            <DropdownItem>이름 1</DropdownItem>
            <DropdownItem>이름 2</DropdownItem>
            <DropdownItem>이름 3</DropdownItem>
            <DropdownItem>이름 4</DropdownItem>
            <DropdownItem>이름 5</DropdownItem>
          </Dropdown>
        )}
      </BookDetailContainer>
    </BookListContainer>
  );
})}


    </CardContainer>
  );
}

export default BookListCard;

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
  align-items: start;
`;

const BookImage = styled.img`
  width: 150px;
  height: auto;
  flex-shrink: 0;
`;

const BookListContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
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

const SubBtnBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
  :active {
    scale: 0.99;
  }
`;

const DownArrowImg = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;

const SubBtn = styled.button`
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;

  display: flex;
  align-items: center;
  justify-content: center;
  background: fff;

  border-radius: 11px;
  border: 1px solid #ddd;
  background: #fff;
  box-shadow: 0px 4px 1px 0px rgba(0, 0, 0, 0.25);

  width: 200px;
  height: 40px;
  cursor: pointer;
`;


const Dropdown = styled.div`
  max-height: 100px;
  overflow-y: auto;
  margin-left:30px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 1px 0px rgba(0, 0, 0, 0.25);
  width: 200px;
  background-color: #fff;
`;

const DropdownItem = styled.div`
  padding: 10px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f5f5f5;
  }
`;
const BookDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  `;
