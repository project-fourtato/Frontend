import React from 'react';
import styled from 'styled-components';
import porfile1 from '../../assets/profile1.png';
import porfile2 from '../../assets/profile2.png';
function SearchUserCard(props) {
    return (
        <AnnouncementBox>
        <AnnouncementTitle>BOOKER의 유저 중 교환하실 책을 가지고 있거나 있으신가요!</AnnouncementTitle>
        
        <CardBoxContainer>

        <CordBox>
            <img src={porfile1}/>
            <CardBoxText>고구마가 되고 싶어 님</CardBoxText>
        </CordBox>
        <CordBox>
            <img src={porfile2}/>
            <CardBoxText>치즈케이크 님</CardBoxText>
        </CordBox>
        </CardBoxContainer>
      </AnnouncementBox>
    );
}

export default SearchUserCard;

const AnnouncementBox = styled.div`
  margin-top: 50px;
  display: flex;
    flex-direction: column;
    /* justify-content: flex-start; */
    width: 1050px;
    border-top: 1px solid #B8B8B8;
`;

const AnnouncementTitle = styled.h2`
    color: #000;
font-family: NanumGothic;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: 24px;
letter-spacing: 0.44px;
margin-top: 30px;
margin-bottom: 50px;
`;

const CardBoxContainer = styled.div`
    display: flex;
`;

const CordBox = styled.div`
    display: flex;
    align-items : center;
    justify-content: center;
    margin-right: 20px;
    border-radius: 10px;
border: 1px solid #828282;
padding: 20px 30px;
background: #FFF;
width: 300px;
`
    

const CardBoxText = styled.h2`
color: #344A39;
font-family: Inter;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-left: 20px;
`