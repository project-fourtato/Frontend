import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Search(props) {
  const navigate = useNavigate();

  const goSearchPage = () => {
    navigate("/search");
  };

  return (
    <SearchWrapper
      onClick={() => {
        goSearchPage();
      }}
    >
      <FiSearch />
      <input placeholder="찾고 싶은 책을 검색해 보세요!" />
    </SearchWrapper>
  );
}

export default Search;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  width: 230px;
  padding: 12px 0px 12px 32px;
  border-radius: 50px;
  border: 1px solid #e5e5e5;
  color: #71717a;
  margin-left: 100px;
  &:hover {
    border: 1px solid #344a39;
  }
  > input {
    width: 200px;
    margin-left: 5px;
    margin-right: 5px;
    border: none;
  }
  > input:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
