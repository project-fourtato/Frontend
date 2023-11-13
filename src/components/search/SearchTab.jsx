import React from "react";
import styled from "styled-components";
import { useState } from "react";
import BooksearchList from "./BooksearchList";
import UserSearchList from "./UserSearchList";
import LibrarySearchList from "./LibrarySearchList";

function SearchTab(props) {
  const [tab, setTab] = useState({
    active: 0,
  });

  const tablist = {
    0: <BooksearchList />,
    1: <UserSearchList />,
    2: <LibrarySearchList />,
  };

  const activeTab = (e) => {
    setTab({ active: e });
  };

  return (
    <SearchTabContainer>
      <TabContainer>
        <Tab onClick={() => activeTab(0)} active={tab.active === 0}>
          책 검색
        </Tab>
        <Tab onClick={() => activeTab(1)} active={tab.active === 1}>
          유저 검색
        </Tab>
        <Tab onClick={() => activeTab(2)} active={tab.active === 2}>
          도서관 검색
        </Tab>
      </TabContainer>
      <TabContent>{tablist[tab.active]}</TabContent>
    </SearchTabContainer>
  );
}

export default SearchTab;

const SearchTabContainer = styled.div`
  width: 1200px;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  margin-top: 4.5rem;
`;

const TabContainer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #E8E8E8;
  margin-bottom: 3rem;
`;

const Tab = styled.div`
  width: 10rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2rem;
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => (props.active ? "white" : "black")};
  background-color: ${(props) => (props.active ? "#5F749F" : "none")};
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  font-weight: "bold";
  cursor: pointer;
`;

const TabContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
