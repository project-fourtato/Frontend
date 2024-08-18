import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// 완료
function SearchUserCard(props) {
    const [haveabookuser, setHaveabookuser] = useState([]);
    const [message, setMessage] = useState('');

    const axiosBaseURL = axios.create({
        withCredentials: true,
    });

    // 현재 URL에서 경로 추출
    const currentPath = window.location.pathname;
    
    // 예시: 경로에서 마지막 부분 추출 (마지막 슬래시 이후의 부분)
    const lastSegment = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:8080/sale/isbn/saleStatus/profileList?isbn=${lastSegment}`;
                const response = await axiosBaseURL.get(url);
                const responseData = response.data;
                
                setHaveabookuser(responseData);
                
                // 메시지 설정
                if (responseData.length === 0) {
                    setMessage("BOOKER의 유저 중 검색하신 책을 가진 유저가 없어요😢");
                } else {
                    setMessage("BOOKER의 유저 중 검색하신 책을 가진 유저가 있어요!");
                }
                
            } catch (error) {
                setMessage("BOOKER의 유저 중 검색하신 책을 가진 유저가 없어요😢");
                //console.error('API 호출 에러:', error);
                //setMessage("서버와의 연결에 문제가 발생했습니다.");
            }
        };

        fetchData();
    }, [lastSegment]);

    return (
        <AnnouncementBox>
            <AnnouncementTitle>{message}</AnnouncementTitle>
            <CardBoxContainer>
                {haveabookuser.map((bookeruser, index) => (
                    <CordBox key={index}>
                        <img src={bookeruser.useriamgeUrl} alt={bookeruser.nickname} />
                        <CardBoxText><span>{bookeruser.nickname}</span> 님</CardBoxText>
                    </CordBox>
                ))}
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