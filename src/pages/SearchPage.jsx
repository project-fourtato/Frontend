import React from "react";
import MainSearch from "../components/search/MainSearch";
import styled from "styled-components";
import SearchTab from "../components/search/SearchTab";
function SearchPage(props) {
  return (
    <SearchContainer>
      <SearchTab />
    </SearchContainer>
  );
}

export default SearchPage;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  height: 100%;
  width: 100%;
`;
