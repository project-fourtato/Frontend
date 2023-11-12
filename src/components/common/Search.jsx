import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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
      <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
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
  padding: 12px 0px 12px 19px;
  margin-left: 5px;
  border-radius: 50px;
  border: 1px solid #D3D3D3;
  color: #71717a;
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
