import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import searchIcon from "../../assets/searchIcon.png";
import Session from 'react-session-api';
import axios from "axios";
import SearchList from "../searchbooklist/SearchList"

function ExchangeSearchBar(props) {
  
  const [searchValue, setSearch] = useState('');
  const [bookList, setBookList] = useState([]); //책 리스트
  const saveSearchValue = event => {
    setSearch(event.target.value);
  };

    const fetchData = async() => { //3. 해당 함수 실행됨
      try{
        console.log(searchValue);
        const stringWithoutSpaces = searchValue.replace(/\s/g, ''); //공백제거 코드
        const url = 'http://localhost:8080/books/sale/searchOne/'+stringWithoutSpaces;
        const response = (await axios.get(url)).data.data;
        console.log(url);
        console.log("왜 안됑");
        console.log(response);
        setBookList(response);
      } catch(error) {
        console.log(error)
      }
    };

   useEffect(() => { //2. 변경감지 후 함수실행
    fetchData();
    console.log(bookList);
   }, []);

   const clickBtn = () => { //1. 버튼 클릭하면 함수실행
    fetchData();
  };

  return (
    <>
    <SearchBarContainer>
      <span>책 이름 : </span>
      <SearchInput
        type="text"
        placeholder="도서관에서 대출하고 싶은 책이나, 교환하고 싶은 책을 검색해보세요!"
        value={searchValue}
        onChange={saveSearchValue}
      />
      <StyledSearchIcon src={searchIcon} onClick={clickBtn}/>
    </SearchBarContainer>
    <SearchList bookList={bookList}/>
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