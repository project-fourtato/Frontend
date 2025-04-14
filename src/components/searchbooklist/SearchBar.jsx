import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import searchIcon from "../../assets/searchIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Session from 'react-session-api';
import axios from "axios";
import SearchList from "../searchbooklist/SearchList"

function ExchangeSearchBar(props) {

  const [searchValue, setSearch] = useState('');
  const [bookList, setBookList] = useState([]); //책 리스트
  const saveSearchValue = event => {
    setSearch(event.target.value);
  };

  const fetchData = async () => { //3. 해당 함수 실행됨
    try {
      // console.log(searchValue);
      const stringWithoutSpaces = searchValue.replace(/\s/g, ''); //공백제거 코드
      const url = 'http://localhost:8080/books/sale/searchOne/' + stringWithoutSpaces;
      const response = (await axios.get(url)).data.data;
      // console.log(url);
      // console.log("왜 안됑");
      // console.log(response);
      setBookList(response);
    } catch (error) {
      // console.log(error)
    }
  };

  useEffect(() => { //2. 변경감지 후 함수실행
    fetchData();
    // console.log(bookList);
  }, []);

  /*const clickBtn = () => { //1. 버튼 클릭하면 함수실행
    fetchData();
  };*/

  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      fetchData(); // 1. Enter 입력이 되면 함수실행
    }
  };

  return (
    <>
      <SearchBarContainer>
        {/* <span>책 이름 : </span> */}
        <SearchBarOutDiv>
          <SearchInput
            type="text"
            //도서관에서 대출하고 싶은 책이나, 교환하고 싶은 책을 검색해보세요!
            placeholder="도서관 소장도서 확인이나 BOOKER 유저와 교환을 원하는 도서의 제목이나 저자를 검색해보세요!"
            value={searchValue}
            onChange={saveSearchValue}
            onKeyDown={handleOnKeyPress}
          />
          {/* <StyledSearchIcon onClick={clickBtn} /> */}
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchBarOutDiv>
      </SearchBarContainer>
      <SearchList bookList={bookList} />
    </>
  );
};

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
    margin-right: 17px;
    color: #142343;
  }
`;

const SearchBarOutDiv = styled.div`
  display: flex;
  width: 550px;
  align-items: center;
  background: #fff;
  width: 650px;
  height: 3px;
  padding: 22px 15px 22px 25px;
  border-radius: 50px;
  border: 1px solid #e5e5e5;
  color: #71717a;
  box-shadow: 1px 1px rgba(0,0,0,0.16), 1px 1px 1px rgba(0,0,0,0.23);
  svg {
    font-size: 30px;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    color: #142343;
    cursor: pointer;
  }
  &:hover {
    border: 1px solid #344a39;
  }
`

const SearchInput = styled.input`
  margin-left: 5px;
  margin-right: 5px;
  border: none;
  font-size: 15px;
  width: 100%;
  outline: none;
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