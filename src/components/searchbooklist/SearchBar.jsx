import { React, useState } from 'react';
import styled from 'styled-components';
import searchIcon from "../../assets/searchIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function ExchangeSearchBar(props) {
  return (
    <SearchBarContainer>
      <span>책 이름 : </span>
      <SearchWrapper>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <SearchInput
        type="text"
        placeholder="도서관에서 대출하고 싶은 책이나, 교환하고 싶은 책을 검색해보세요!"
      />
      </SearchWrapper>
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
  border: 1px solid #BCBCBC;
  width: 100%;
  background: #FFF;
  height: 26px;
  /*padding: 10px 10px 10px 15px;*/
  ::placeholder{
    color:#828282;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  width: ${(props) => ((props.activeTabProps == 2) ? "410px" : "550px")};
  height: 3px;
  padding: 22px 0px 22px 25px;
  border-radius: 50px;
  border: 1px solid #e5e5e5;
  color: #71717a;
  box-shadow: 1px 1px rgba(0,0,0,0.16), 1px 1px 1px rgba(0,0,0,0.23);
  &:hover {
    border: 1px solid #344a39;
  }
  > svg {
    font-size: 30px;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    color: #142343;
  }
  > input {
    margin-left: 5px;
    margin-right: 5px;
    border: none;
    font-size: 15px;
    width: 100%;
  }
  > input:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;