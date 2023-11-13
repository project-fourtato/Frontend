import { React, useState } from 'react';
import styled from 'styled-components';
import searchIcon from "../../assets/searchIcon.png";

function ExchangeSearchBar(props) {
  return (
    <SearchBarContainer>
      <span>책 이름 : </span>
      <SearchInput
        type="text"
        placeholder="도서관에서 대출하고 싶은 책이나, 교환하고 싶은 책을 검색해보세요!"
      />
      <StyledSearchIcon src={searchIcon} />
    </SearchBarContainer>
  );
}

export default ExchangeSearchBar;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
  margin-top: 40px;
  >span {
    font-size : 19px;
    font-weight: bold;
    margin-right: 15px;
    color: #142343;
  }
`;

const StyledSearchIcon = styled.img`
  cursor: pointer;
  font-size: 30px;
  width: 42.5px;
  height: 42.5px;
  margin-left: 8px;
`;


const SearchInput = styled.input`
  border-radius: 10px;
  border: 1px solid gray;
  width: 420px;
  background: #FFF;
  height: 26px;
  padding: 10px 10px 10px 15px;
  ::placeholder{
    color:#828282;
  }
`;