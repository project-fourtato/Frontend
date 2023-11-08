import React from 'react';
import styled from 'styled-components';
import {HiOutlineSearch} from "react-icons/hi";

function LibrarySearchBar(props) {
    return (
        <SearchBarContainer>
        <SearchInput
            type="text"
            placeholder="지역을 입력하세요"
        />
        <div>
        <StyledSearchIcon/>
        </div>
      </SearchBarContainer>
    );
}

export default LibrarySearchBar;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  >div{
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: #A2B29F;
    color: #fff;
    border-radius: 10px;
  }
`;

const StyledSearchIcon = styled(HiOutlineSearch)`
  cursor: pointer;
  color: #fff;
  font-size: 30px;
`;

const SearchInput = styled.input`
  border-radius: 10px;
  width: 400px;
background: #FFF;
height:22px;
padding: 10px 10px 10px 15px;
box-shadow: 0px 0px 5px rgba(0,0,0,0.5);
  ::placeholder{
    color:#828282;
  }
`;