import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function MainSearch(props) {
  return (
    <SearchWrapper>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input placeholder="검색" />
    </SearchWrapper>
  );
}

export default MainSearch;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  width: 500px;
  height: 8px;
  padding: 22px 0px 22px 25px;
  border-radius: 50px;
  border: 1px solid #e5e5e5;
  color: #71717a;
  &:hover {
    border: 1px solid #344a39;
  }
  > svg {
    width: 22px;
    height: 22px;
    margin-right: 15px;
  }
  > input {
    width: 430px;
    margin-left: 5px;
    margin-right: 5px;
    border: none;
    font-size: 17px;
  }
  > input:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
