import React from "react";
import styled from "styled-components";
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
      <ButtonWrapper>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
        <ButtonText>찾고 싶은 책을 검색해 보세요!</ButtonText>
      </ButtonWrapper>
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
  border: 1px solid #d3d3d3;
  color: #71717a;
  &:hover {
    border: 1px solid #344a39;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonWrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: inherit;
`;

const ButtonText = styled.span`
  margin-left: 10px;
`;
