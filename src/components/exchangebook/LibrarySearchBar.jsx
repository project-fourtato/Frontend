import { React, useState } from 'react';
import styled from 'styled-components';
import searchIcon from "../../assets/searchIcon.png";
import {regions, cities} from '../../data/regiondata';
import {BsCaretDownFill} from "react-icons/bs";
import RegionSearchBar from "../common/RegionSearchBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";

function LibrarySearchBar(props) {
    return (
        <SearchBarContainer>
          <Title>현재 살고 계신 지역을 알려주세요!</Title>
          <RegionSearchBar />
          <StyledSearchIcon>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </StyledSearchIcon>
      </SearchBarContainer>
    );
}

export default LibrarySearchBar;

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