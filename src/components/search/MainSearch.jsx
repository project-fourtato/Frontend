import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import RegionSearchBar from "../common/RegionSearchBar"

function MainSearch(props) {
  return (
    <SearchBarOutDiv>
      <SearchWrapper activeTabProps={props.active}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input placeholder="책, 유저, 도서관을 검색해 보세요!" />
      </SearchWrapper>
      <RegionSearchBarOutDiv>
      {props.active == 2 ? <RegionSearchBar /> : ""}
      </RegionSearchBarOutDiv>
    </SearchBarOutDiv>
  );
}

export default MainSearch;

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
    width: 21px;
    height: 21px;
    margin-right: 15px;
    color: #142343;
  }
  > input {
    margin-left: 5px;
    margin-right: 5px;
    border: none;
    font-size: 17px;
    width: 100%;
  }
  > input:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchBarOutDiv = styled.div`
  width: 100%;
  display: flex;
  /*text-align: center;*/
  justify-content: center;
`

const RegionSearchBarOutDiv = styled.div`
  margin-left: 20px;
`