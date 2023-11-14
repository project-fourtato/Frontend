import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import searchIcon from "../../assets/searchIcon.png";
import {regions, cities} from '../../data/regiondata';
import {BsCaretDownFill} from "react-icons/bs";
import axios from "axios";
import Session from 'react-session-api';
import ExchangeBookCard from '../exchangebook/ExchangBookCard';
import SearchUserCard from '../exchangebook/SearchUserCard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


function LibrarySearchBar(props) {
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [selectedCity, setSelectedCity] = useState(cities[regions[0].code][0]);
  const [regionMenuOpen, setRegionMenuOpen] = useState(false);
  const [cityMenuOpen, setCityMenuOpen] = useState(false);
  const [msgList, setMsgList] = useState([]); //도서관 리스트

  // 현재 URL에서 경로 추출
  const currentPath = window.location.pathname;
      
  // 예시: 경로에서 마지막 부분 추출 (마지막 슬래시 이후의 부분)
  const lastSegment = currentPath.substring(currentPath.lastIndexOf('/') + 1);

  const SearchBtnClick = () => {
    (async() => {
      try{
        const url = 'http://localhost:8080/books/sale/library/region='+selectedRegion.code+'&dtl_region='+selectedCity.code+'&isbn='+lastSegment;
        const response = await axios.get(url);
        console.log(url);
        setMsgList(response.data.data);
        console.log(msgList);
      } catch(error) {
        console.log(error)
      }
    }) ();
    

  };

  const handleRegionChange = (selectedRegion) => {
    setSelectedRegion(selectedRegion);
    setSelectedCity(cities[selectedRegion.code][0]);
    setRegionMenuOpen(false);
  };

  const handleCityChange = (selectedCity) => {
    setSelectedCity(selectedCity);
    setCityMenuOpen(false);
  };

  const toggleRegionMenu = () => {
    setRegionMenuOpen(!regionMenuOpen);
    setCityMenuOpen(false);
  };

  const toggleCityMenu = () => {
    setCityMenuOpen(!cityMenuOpen);
    setRegionMenuOpen(false);
  };

    return (
      <>
        <SearchBarContainer>
          <Title>현재 거주 중이신 지역을 알려주세요!</Title>
          <HeaderSelectContainer>
          <SelectBoxContainer>
            <SelectBox onClick={toggleRegionMenu}>
              <p>{selectedRegion.name}</p><StyledDownIcon />
              {regionMenuOpen && (
                <Menu>
                  {regions.map((region) => (
                    <MenuItem key={region.code} onClick={() => handleRegionChange(region)}>
                      {region.name}
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </SelectBox>
            <SelectBox onClick={toggleCityMenu}>
              <p>{selectedCity.name}</p><StyledDownIcon />
              {cityMenuOpen && (
                <Menu>
                  {cities[selectedRegion.code].map((city) => (
                    <MenuItem key={city.code} onClick={() => handleCityChange(city)}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </SelectBox>
          </SelectBoxContainer>
            </HeaderSelectContainer>
        <StyledSearchIcon src={searchIcon} onClick={SearchBtnClick}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </StyledSearchIcon>
      </SearchBarContainer>
      <PageOutDiv>
      <ExchangeBookCard msgList={msgList} region={selectedRegion.name} city={selectedCity.name}/>
      <SearchUserCard/>
      </PageOutDiv>
      </>
    );
}
export default LibrarySearchBar;
const PageOutDiv = styled.div`
  background-color: white;
  padding: 70px 80px;
  border-radius: 45px;
  box-shadow: 3px 8px 8px 3px rgba(0,0,0,0.16), 2px 3px 6px rgba(0,0,0,0.23);
  width: 60%;
`;

const StyledDownIcon = styled(BsCaretDownFill)`
  cursor: pointer;
  color: #D9D9D9;
  font-size: 16px;
  /* margin-left: 15px; */
`;

const HeaderSelectContainer = styled.div`
  display: flex;
  /*align-items: center;
  margin-bottom: 10px;*/
`;

const SelectBoxContainer = styled.div`
  display: flex;
  /*align-items: center;*/
  line-height: 50px;
  gap: 0.5rem;
  margin-right: 10px;
`;

const SelectBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid #828282;
  background: #FFF;
  width: 100px;
  height: 1.4rem;
  > p {
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.44px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #FFF;
  border: 1px solid #828282;
  border-top: none;
  border-radius: 0 0 10px 10px;
  z-index: 1;
  max-height: 200px;
  overflow-y: auto; 
`;

const MenuItem = styled.div`
  padding: 0px 15px;
  cursor: pointer;
  &:hover {
    background-color: #F5F5F5;
  }
`;

const Title = styled.h1`
  color: #000;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: 24px;
letter-spacing: 0.44px;
margin-right: 25px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
`;

const StyledSearchIcon = styled.div`
  cursor: pointer;
  font-size: 30px;
  width: 48px;
  height: 43px;
  background-color: #142343;
  border-radius: 45px;
  box-shadow: 1.5px 1.5px rgba(0,0,0,0.16), 1px 1px 1px rgba(0,0,0,0.23);
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: white;
    font-size: 18px;
  }

  &:hover {
    svg {
      color: #142343;
    }
    background-color: white;
  }
`;
