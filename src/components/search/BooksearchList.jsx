import { React, useEffect, useState } from "react";
import styled from "styled-components";
import "../../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// 완료
function BooksearchList(props) {
  const profile = sessionStorage.getItem("profile");
  const navigate = useNavigate();
  const p = JSON.parse(profile);
  const [searchValue, setSearch] = useState('');
  const [booksearchList, setBooksearchList] = useState([]);

  const axiosBaseURL = axios.create({
    withCredentials: true,
  });

  useEffect(() => {
    const a = props.searchValue;
    setSearch(a);
  }, [props.searchValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stringWithoutSpaces = searchValue.replace(/\s/g, ''); // 공백 제거
        const url = `http://localhost:8080/sale/searchOne/${stringWithoutSpaces}`;
        console.log(url);
        const response = await axiosBaseURL.get(url);
        console.log(response);
        const responseData = response;
        setBooksearchList(responseData.data || []); // 데이터가 없을 경우 빈 배열로 설정
      } catch (error) {
        //console.log(error);
        setBooksearchList([]); // 오류가 발생해도 빈 배열로 설정
      }
    };
    
    if (props.searchValue) {
      fetchData();
    }
  }, [searchValue]);

  const goDetailPage = async (isbn) => {
    try {
      const url = `http://localhost:8080/searchByISBN/?isbn=${isbn}`;
      const response = await axiosBaseURL.get(url);
      const responseData = response.data;

      if (responseData.length === 0) {
        navigate("/newDetail", {
          state: { isbn },
        });
      } else {
        const { uid, bookId } = responseData[0];
        navigate("/myDetail", {
          state: { uid, isbn, bookId },
        });
      }
    } catch (error) {
     // console.log("Error fetching book details: ", error);
    }
  };

  return (
    <AllOutDiv>
      <BookListCardContainer>
        {booksearchList.length > 0 ? (
          booksearchList.map((book) => (
            <BookListBox key={book.isbn} onClick={() => goDetailPage(book.isbn)}>
              <BookImgBox src={book.coverImageUrl} />
              <BookInfoOutDiv>
                <BookTitleText>{book.bookTitle}</BookTitleText>
                <BookSubText>{book.author}</BookSubText>
                <BookSubText>{book.publisher}</BookSubText>
              </BookInfoOutDiv>
            </BookListBox>
          ))
        ) : (
          <p></p>
        )}
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