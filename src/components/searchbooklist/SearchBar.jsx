import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import SearchList from "../searchbooklist/SearchList";
// 완료
function ExchangeSearchBar(props) {
  const [searchValue, setSearch] = useState("");
  const [bookList, setBookList] = useState([]); // 검색된 책 리스트 상태
  const saveSearchValue = (event) => {
    setSearch(event.target.value);
  };

  const axiosBaseURL = axios.create({
    baseURL: "https://www.our-booker.site:8080",
    withCredentials: true,
  });

  const fetchData = async () => {
    try {
      const stringWithoutSpaces = searchValue.replace(/\s/g, ""); // 공백 제거
      const url = `/sale/searchOne/${stringWithoutSpaces}`;
      const response = await axiosBaseURL.get(url);
      setBookList(response.data.result); // 응답 데이터를 bookList에 설정
    } catch (error) {
      window.location.href = "/";
      console.error("Error fetching books data", error);
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchData(); // Enter 키를 누르면 데이터 검색 함수 실행
    }
  };

  return (
    <>
      <SearchBarContainer>
        <SearchBarOutDiv>
          <SearchInput
            type="text"
            placeholder="도서관 소장도서 확인이나 BOOKER 유저와 교환을 원하는 도서의 제목이나 저자를 검색해보세요!"
            value={searchValue}
            onChange={saveSearchValue}
            onKeyDown={handleOnKeyPress} // Enter 키 입력 시 검색
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchBarOutDiv>
      </SearchBarContainer>
      <SearchList bookList={bookList} />
    </>
  );
}

export default ExchangeSearchBar;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
  margin-top: 40px;
  > span {
    font-size: 19px;
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
  box-shadow: 1px 1px rgba(0, 0, 0, 0.16), 1px 1px 1px rgba(0, 0, 0, 0.23);
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
`;

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
  width: ${(props) => (props.activeTabProps == 2 ? "410px" : "550px")};
  height: 3px;
  padding: 22px 0px 22px 25px;
  border-radius: 50px;
  border: 1px solid #e5e5e5;
  color: #71717a;
  box-shadow: 1px 1px rgba(0, 0, 0, 0.16), 1px 1px 1px rgba(0, 0, 0, 0.23);
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
