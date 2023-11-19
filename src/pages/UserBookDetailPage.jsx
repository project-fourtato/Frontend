import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import IntroAndIndexFooter from "../components/bookdetail/IntroAndIndexFooter";
import ReviewBox from "../components/bookdetail/ReviewBox";
import axios from "axios";
import swal from 'sweetalert';

const UserBookDetailPage = (props) => {
  const [bookData, setBookData] = useState({
    "cover": "hi"
  });
  const location = useLocation();
  const navigate = useNavigate();
  let uid = "";
  let isbn = "";
  let userbid = "";
  let bookstate = "";
  let nickname = "";

  try {
    uid = location.state.uid;
    isbn = location.state.isbn;
    userbid = location.state.userbid;
    bookstate = location.state.bookstate;
    nickname = location.state.nickname;
  } catch(error) {
    navigate("/error");
  }
  const [firstPart, setFirstPart] = useState('');
  const [secondPart, setSecondPart] = useState('');

  useEffect(() => {
    const BookData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/books/booksDetail/` + isbn);
        // console.log(response);
        const data = response.data.data;
        const title = data.title;
        // console.log(data);
        setBookData(data);


        // "-"를 기준으로 나누기
        const firstHyphenIndex = title.indexOf(" - ");

        // "-"가 없는 경우
        if (firstHyphenIndex === -1) {
          setFirstPart(title);
          setSecondPart('');
        } else {
          // 첫 번째 부분 설정
          setFirstPart(title.slice(0, firstHyphenIndex));

          // 두 번째 부분 설정 (첫 번째 "-" 이후의 부분)
          setSecondPart(title.slice(firstHyphenIndex));
        } 
      } catch (error) {
          console.error("Error fetching user data", error);
        }
      };

      BookData();
    }, []);

    useEffect(()=>{
      // console.log(nickname);
    }, [nickname]);

  return (
    <BookDetailContainer>
      <BookDetailBox>
        <BookDetailInnerContainer>
          <BookImg src={bookData.cover} alt="책 이미지" />
          <BookDetailTextBox>
            <h2>{firstPart}</h2>
            <h5>{secondPart}</h5>
            <p>{bookData.author}</p>
            <p>{bookData.publisher} | {bookData.pubDate}</p>
            <ProgressContainer>
              <DropdownMenu>
                <DropdownItem>
                  {(bookstate === 0 ? "독서전" :
                    bookstate === 1 ? "관심도서" :
                      bookstate === 2 ? "독서중" :
                        bookstate === 3 ? "독서완료" : null)}
                </DropdownItem>
              </DropdownMenu>
            </ProgressContainer>
          </BookDetailTextBox>
        </BookDetailInnerContainer>
        <IntroAndIndexFooter categoryName={bookData.categoryName} description={bookData.description} />
      </BookDetailBox>
      <ReviewBox userbid={userbid} type={'user'} nickname={nickname} />
    </BookDetailContainer>
  );
}


export default UserBookDetailPage;

const BookDetailContainer = styled.div`
  display: flex;
  margin-top: 1.2rem;
  /* padding: 0 7rem; */
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const BookDetailInnerContainer = styled.div`
  display: flex;

`;

const BookDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-left: 50px; */
  margin-right: 50px;
  height: 29.4rem;
  width: 30rem;
  background-color: white;
  border-radius: 40px;
  box-shadow: 3px 8px 8px 3px rgba(0,0,0,0.16), 2px 3px 6px rgba(0,0,0,0.23);
  padding: 45px 55px;
`;

const BookImg = styled.img`
  margin-right: 1.6rem;
  width: 27%;
`

const BookDetailTextBox = styled.div`
  margin-top: 15px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  > h2 {
    color: #142343;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 5px;
  }
  > h5 {
    color: #000;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 14px;
  }
  > p {
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  /*margin-top : 15px;*/
  margin-top: 20px;
  position: relative;

`;

const ProgressBox = styled.div`
position: relative;
border-radius: 10px;
border: 1px solid #c1c1c1;
background: #fff;
text-align: center;
padding: 12px 20px;
min-width: 120px;
color: #000;
font-size: 15px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-right: 10px;
cursor: pointer;
&::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border-style: solid;
  border-width: 6px 6px 0;
  border-color: #000 transparent transparent transparent;
}
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #c1c1c1;
  border-radius: 8px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;
  min-width: 157px;
`;

const DropdownItem = styled.p`
  text-align : center;
  padding: 12px 20px;
  margin: 0;
  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;
