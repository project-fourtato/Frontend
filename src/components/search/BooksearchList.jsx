import {React, useEffect, useState } from "react";
import styled from "styled-components";
import { booksearchList } from "../../data/searchdata";
import "../../App.css"
import axios from "axios";
import Session from 'react-session-api';
import { useLocation, useNavigate } from "react-router-dom";

function BooksearchList(props) {
  const profile = sessionStorage.getItem("profile");
  const navigate = useNavigate();
  const p = JSON.parse(profile);
  const [searchValue, setSearch] = useState('');
  const [booksearchList, setBooksearchList] = useState([])
  useEffect(() => {
    const a = props.searchValue;
    setSearch(a);
  },[props.searchValue]);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(searchValue);
        const stringWithoutSpaces = searchValue.replace(/\s/g, ''); //공백제거 코드
        const url = 'http://localhost:8080/books/search/uid='+p.uid+'&searchOne='+stringWithoutSpaces;
        // console.log(url);
        const response = await axios.get(url);
        const responseData = JSON.parse(response.request.responseText);
        setBooksearchList(responseData.data);
        // console.log(responseData);
        
      } catch(error) {
        console.log(error);
      }
    };
    if(props.searchValue){
    fetchData();
    }
  }, [searchValue]);

  const goDetailPage = async (uid, isbn) => {
    try{
      const url = 'http://localhost:8080/booksState/uid='+uid+'&isbn='+isbn;
      const response = await axios.get(url);
      const responseData = response.data;
      // console.log(responseData);
      if(responseData ===''){
        navigate(`/newDetail`, {
          state: { uid, isbn },
        });
      }
      else {
        const bid = responseData.userbid;
        navigate(`/myDetail`, {
          state: { uid, isbn, bid },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AllOutDiv>
    <BookListCardContainer>

      {booksearchList.map((book) => (
        <BookListBox key={book.uid} onClick={() => goDetailPage(book.uid, book.isbn)}>
          <BookImgBox src={book.cover} />
          <BookInfoOutDiv>  
            <BookTitleText>{book.bookName}</BookTitleText>
            <BookSubText>{book.bookAuthor}</BookSubText>
            <BookSubText>{book.publisher}</BookSubText>
          </BookInfoOutDiv>

        </BookListBox>
        
      ))}
    </BookListCardContainer>
    </AllOutDiv>
  );
}

export default BooksearchList;

const AllOutDiv = styled.div`
  margin-left: 13.8%;
  margin-bottom: 5%;
`

const BookListCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const BookListBox = styled.div`
  display: flex;
`;

const BookImgBox = styled.img`
  margin-right: 18px;
  margin-bottom: 40px;
  width: 24%;
  border-radius: 5px;
`;

const BookInfoOutDiv = styled.div`
  padding-top: 5px;
`

const BookTitleText = styled.h5`
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 109.867%; /* 37.37px */
  letter-spacing: -0.17px;
  margin-bottom: 8px;
  width: 400px;
`;

const BookSubText = styled.p`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 2px;
`;

const AddbookBox = styled.p`
  border-radius: 10px;
  border: 1px solid #c1c1c1;
  background: #fff;
  text-align: center;
  padding: 12px 20px;
  width: 110px;
  height: 16px;
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  margin-top: 10px;
`;