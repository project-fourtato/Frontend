import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import BooksearchList from "./BooksearchList";
import UserSearchList from "./UserSearchList";
import LibrarySearchList from "./LibrarySearchList";
import MainSearch from "../search/MainSearch"
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchTab(props) {
  const [tab, setTab] = useState({
    active: 0,
  });
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [searchValue, setSearch] = useState('');
  const [msgList,setMsgList] = useState([]);
  const navigate = useNavigate();

  const SearchBtnClick = () => { //도서관검색 api 연결
      (async() => {
        try{
          const url = 'http://localhost:8080/books/sale/library/region='+selectedRegion.code+'&dtl_region='+selectedCity.code+'&searchOne='+searchValue;
          const response = await axios.get(url);
          // console.log(url);
          // console.log(response.data.data);
          setMsgList(response.data.data);
          // console.log("list확인");
        } catch(error) {
          console.log(error)
        }
      }) ();
    };
  useEffect(() => {
    // console.log("SearchTab 변경감지 실행");
    // console.log(msgList);
    // console.log(searchValue);
    let newTablist = {
      0: <BooksearchList searchValue={searchValue}/>,
      1: <UserSearchList searchValue={searchValue}/>,
      2: <LibrarySearchList msgList={msgList}/>
    };
    setTablist(newTablist);
    // console.log(tablist[1]);
    return () => {
      console.log("clean up");
    }
  },[msgList, searchValue]);

  
  useEffect(() => {
    if(searchValue) { //초기에 렌더링되는 문제 이 if문으로 해결함
      if ((searchValue.length >= 5) && (tab.active == 2) && (selectedRegion !='') && (selectedCity !='')) {
        SearchBtnClick();
      }
      else if((tab.active == 2) &&(selectedRegion =='' || selectedCity =='')){
        swal({
          title: "지역도 같이 검색해주세요.",
          icon: "warning",
          buttons: "확인",
        }).then(() => {
          navigate("/search");
        })
      }
      else if((tab.active == 2) &&(searchValue.length<6)){
        swal({
          title: "도서관은 6글자 이상부터 검색 가능합니다.",
          icon: "warning",
          buttons: "확인",
        }).then(() => {
          navigate("/search");
        })
      }
    }
    
  }, [searchValue]);

  const [tablist, setTablist] = useState({
    0: <BooksearchList searchValue={searchValue}/>,
    1: <UserSearchList searchValue={searchValue}/>,
    2: <LibrarySearchList msgList={msgList}/>,
  });

  useEffect(() => {
    console.log(tablist);
  },[tablist]);

  const activeTab = (e) => {
    setTab({ active: e });
  };
  
  return (
    <>
    <MainSearch active={tab.active} setSelectedRegion={setSelectedRegion} setSelectedCity={setSelectedCity} setSearch={setSearch}/>
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
      <TabContentOutDiv>
        <TabContent>{tablist[tab.active]}</TabContent>
      </TabContentOutDiv>
    </SearchTabContainer>
    </>
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
  justify-content: center;
`;

const TabContentOutDiv = styled.div`
  width: 100%;
`
