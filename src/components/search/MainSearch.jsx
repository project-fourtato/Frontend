import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

function MainSearch(props) {
  return (
    <SearchWrapper>
      <FiSearch />
      <input placeholder="검색" />
    </SearchWrapper>
  );
}

export default MainSearch;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  width: 530px;
  padding: 22px 0px 22px 32px;
  border-radius: 50px;
  border: 1px solid #e5e5e5;
  color: #71717a;
  &:hover {
    border: 1px solid #344a39;
  }
  > svg {
    width: 24px;
    height: 24px;
    margin-left: 5px;
    margin-right: 15px;
  }
  > input {
    width: 430px;
    margin-left: 5px;
    margin-right: 5px;
    border: none;
    font-size: 20px;
  }
  > input:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
