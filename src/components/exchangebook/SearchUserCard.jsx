import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Session from 'react-session-api';
import axios from "axios";
function SearchUserCard(props) {
    const profile = sessionStorage.getItem("profile");
    const p = JSON.parse(profile);
    const [haveabookuser, setHaveabookuser] = useState([{"nickname" : "고구마가되고싶어고구마", "useriamgeUrl" : "bb"}, 
    {"name" : "치크케이크", "img" : "aa"}]);

    // 현재 URL에서 경로 추출
    const currentPath = window.location.pathname;
      
    // 예시: 경로에서 마지막 부분 추출 (마지막 슬래시 이후의 부분)
    const lastSegment = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const url = 'http://localhost:8080/books/sale/isbn/' +lastSegment;
            // console.log(url);
            const response = await axios.get(url);
            const responseData = JSON.parse(response.request.responseText);
            setHaveabookuser(responseData.data);
            // console.log(responseData);
            
          } catch(error) {
            // console.log(error);
          }
        };
    
        fetchData();
      }, []);
      let a = "";
      if(haveabookuser.length == 0){
        a = "BOOKER의 유저 중 검색하신 책을 가진 유저가 없어요😢";
      }
      else {
        a = "BOOKER의 유저 중 검색하신 책을 가진 유저가 있어요!";
      }
    return (
        <AnnouncementBox>
            <AnnouncementTitle>{a}</AnnouncementTitle>

            <CardBoxContainer>
                {haveabookuser.map((bookeruser) => {
                    return (
                        <CordBox>
                            <img src={bookeruser.useriamgeUrl} />
                            <CardBoxText><span>{bookeruser.nickname}</span> 님</CardBoxText>
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