import React from 'react';
import styled from 'styled-components';
import {BsCaretDownFill} from "react-icons/bs";
import {FaMapMarkerAlt} from "react-icons/fa";
import searchmap from "../../assets/searchmap.png";
function ExchangBookCard(props) {
    return (
        <>
      <ContentArea>
  
            <HeaderSelectContainer>
            <SelectBoxContainer>
                <SelectBox><p>강원도</p><StyledDownIcon/></SelectBox>
                <SelectBox><p>춘천</p><StyledDownIcon/></SelectBox>
            </SelectBoxContainer>
          <Title>지역의 해당 도서관에 검색하신 책이 있어요!</Title>
            </HeaderSelectContainer>

          <LibraryInfo>
            <div>
            <img src={searchmap}/>
            </div>
            <ExchangeInfo>
            <LibraryName><FaMapMarkerAlt/>담작은도서관</LibraryName>

            <div>
            <InfoTextTitle>주소</InfoTextTitle>
            <InfoText>강원특별자치도 춘천시 효자문길7번길 10</InfoText>
            </div>
            <div>
            <InfoTextTitle>전화</InfoTextTitle>
            <InfoText>033-256-6363</InfoText>
            </div>
            <div>
            <InfoTextTitle>운영시간</InfoTextTitle>
            <InfoText>도서관 이용시간: 09:00~18:00, 북카페: 12:00~17:00</InfoText>
            </div>
            <div>
            <InfoTextTitle>휴관일</InfoTextTitle>
            <InfoText>매주 월요일 / 「관공서의 공휴일에 관한 규정」에 따른 공휴일(일요일 제외) <br/>/ 근로자의날(5월1일) / 매년 12.30~12.31 </InfoText>

            </div>
            </ExchangeInfo>
          </LibraryInfo>
     
      </ContentArea>
        </>
    );
}

export default ExchangBookCard;


const StyledDownIcon = styled(BsCaretDownFill)`
  cursor: pointer;
  color: #D9D9D9;
  font-size: 16px;
  /* margin-left: 15px; */
`;


const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 1050px;
`;

const HeaderSelectContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const SelectBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-right: 0px;
`;

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content:space-between;
    padding: 10px 15px;
    border-radius: 10px;
    border: 1px solid #828282;
    background: #FFF;
    width :140px;  
>p{
    color: #000;
font-family: NanumGothic;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 24px; /* 96% */
letter-spacing: 0.44px;
}
`

const ExchangeInfo = styled.div`
  margin-left: 20px;
  >div{
    margin-bottom: 20px;
    display: flex;
    align-items : center;
    &:last-child{
        align-items : flex-start;
        }
  }
`;

const Title = styled.h1`
  color: #000;
font-family: NanumGothic;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: 24px;
letter-spacing: 0.44px;
margin-left: 60px;
`;

const LibraryInfo = styled.div`
  display: flex;
`;

const LibraryName = styled.h2`
  display: flex;
    align-items: center;
    gap: 10px;
    color: #344A39;
font-family: NanumGothic;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 24px; 
letter-spacing: 0.44px;
margin-bottom: 30px;
`;

const InfoTextTitle = styled.h2`
margin-right: 10px;
color: #000;
font-family: NanumGothic;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: 24px;
letter-spacing: 0.44px;
width: 90px;
`

const InfoText = styled.p`
color: #000;

font-family: NanumGothic;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px;
letter-spacing: 0.44px;
`;


