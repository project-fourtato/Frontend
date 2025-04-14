import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import MainSearch from "../search/MainSearch";
import BooksearchList from "./BooksearchList";
import LibrarySearchList from "./LibrarySearchList";
import UserSearchList from "./UserSearchList";

// 완료
function SearchTab(props) {
  const [tab, setTab] = useState({
    active: 0,
  });
  const [selectedRegion, setSelectedRegion] = useState({});
  const [selectedCity, setSelectedCity] = useState({});
  const [searchValue, setSearch] = useState("");
  const [msgList, setMsgList] = useState([]);
  const navigate = useNavigate();

  const domain = process.env.REACT_APP_API_DOMAIN;
  const axiosBaseURL = axios.create({
    baseURL: domain,
    withCredentials: true,
  });

  const SearchBtnClick = async () => {
    try {
      const stringWithoutSpaces = searchValue.replace(/\s/g, ""); // 공백 제거
      const url = `/libraryList/region/${selectedRegion.code}/dtl_region/${selectedCity.code}/searchOne/${stringWithoutSpaces}`;
      const response = await axiosBaseURL.get(url);
      console.log(response.data.data);
      setMsgList(response.data.data); // 응답 데이터 설정
    } catch (error) {
      // 세션이 없거나 로그인 정보가 없을 때 홈으로 리다이렉트
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchValue) {
      // 초기 렌더링 방지
      if (
        searchValue.length >= 5 &&
        tab.active === 2 &&
        selectedRegion.code &&
        selectedCity.code
      ) {
        SearchBtnClick();
      } else if (
        tab.active === 2 &&
        (!selectedRegion.code || !selectedCity.code)
      ) {
        swal({
          title: "지역도 같이 검색해주세요.",
          icon: "warning",
          buttons: "확인",
        }).then(() => {
          navigate("/search");
        });
      } else if (tab.active === 2 && searchValue.length < 5) {
        swal({
          title: "주의!",
          text: "도서관은 5글자 이상부터 검색 가능합니다.",
          icon: "warning",
          buttons: "확인",
        }).then(() => {
          navigate("/search");
        });
      }
    }
  }, [searchValue]);

  const [tablist, setTablist] = useState({
    0: <BooksearchList searchValue={searchValue} />,
    1: <UserSearchList searchValue={searchValue} />,
    2: <LibrarySearchList msgList={msgList} />,
  });

  useEffect(() => {
    let newTablist = {
      0: <BooksearchList searchValue={searchValue} />,
      1: <UserSearchList searchValue={searchValue} />,
      2: <LibrarySearchList msgList={msgList} />,
    };
    setTablist(newTablist);
  }, [msgList, searchValue]);

  const activeTab = (e) => {
    setTab({ active: e });
  };

  return (
    <>
      <MainSearch
        active={tab.active}
        setSelectedRegion={setSelectedRegion}
        setSelectedCity={setSelectedCity}
        setSearch={setSearch}
      />
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
  border-bottom: 2px solid #e8e8e8;
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
`;
