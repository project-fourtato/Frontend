import React, { useState } from 'react';
import styled from 'styled-components';
import porfile1 from '../../assets/profile1.png';
import porfile2 from '../../assets/profile2.png';
function SearchUserCard(props) {
    const [haveabookuser, setHaveabookuser] = useState([{"name" : "고구마가되고싶어고구마", "img" : porfile1}, 
    {"name" : "치크케이크", "img" : porfile2}]);
    return (
        <AnnouncementBox>
            <AnnouncementTitle>BOOKER의 유저 중 검색하신 책을 가진 유저가 있어요!</AnnouncementTitle>

            <CardBoxContainer>
                {haveabookuser.map((bookeruser) => {
                    return (
                        <CordBox>
                            <img src={bookeruser.img} />
                            <CardBoxText><span>{bookeruser.name}</span> 님</CardBoxText>
                        </CordBox>
                    )
                })}
            </CardBoxContainer>
        </AnnouncementBox>
    );
}

export default SearchUserCard;

const AnnouncementBox = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    /* justify-content: flex-start; */
    width: 100%;
    border-top: 1px solid #B8B8B8;
`;

const AnnouncementTitle = styled.h2`
    color: #000;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.44px;
    margin-top: 40px;
    margin-bottom: 30px;
`;

const CardBoxContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const CordBox = styled.div`
    display: flex;
    align-items : center;
    justify-content: center;
    margin-right: 20px;
    border-radius: 10px;
    border: 1px solid #B8B8B8;
    padding: 15px 30px;
    background: #FFF;
    >img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    &:hover{
        cursor: pointer;
        background-color: #32497B;
        color: white;
        span {
            color: white;
        }
    }
    span {
        color: #32497B;
    }
`

const CardBoxText = styled.h2`
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-left: 20px;
`