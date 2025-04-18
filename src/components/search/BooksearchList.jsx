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
  const [searchValue, setSearch] = useState("");
  const [booksearchList, setBooksearchList] = useState([]);

  const domain = process.env.REACT_APP_API_DOMAIN;
  const axiosBaseURL = axios.create({
    baseURL: domain,
    withCredentials: true,
  });

  useEffect(() => {
    const a = props.searchValue;
    setSearch(a);
  }, [props.searchValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stringWithoutSpaces = searchValue.replace(/\s/g, ""); // 공백 제거
        const url = `/sale/searchOne/${stringWithoutSpaces}`;
        console.log(url);
        const response = await axiosBaseURL.get(url);
        console.log(response);
        const responseData = response;
        setBooksearchList(responseData.data.result || []); // 데이터가 없을 경우 빈 배열로 설정
      } catch (error) {
        console.log(error);
        setBooksearchList([]); // 오류가 발생해도 빈 배열로 설정
      }
    };

    if (props.searchValue) {
      fetchData();
    }
  }, [searchValue]);

  const goDetailPage = async (isbn) => {
    try {
      const url = `/readStatus?isbn=${isbn}`;
      const response = await axiosBaseURL.get(url);
      const responseData = response.data;

      console.log(responseData);
      if (responseData.readStatus === -1) {
        navigate("/newDetail", {
          state: { isbn },
        });
      } else {
        const { bookUid, readStatus, saleStatus } = responseData;
        navigate("/myDetail", {
          state: {
            uid: bookUid,
            isbn,
            bookId: bookUid,
            readStatus,
            saleStatus,
          },
        });
      }
    } catch (error) {
      /* if (error.response && error.response.status === 404) {
            console.error("404 Error: Book not found.");
            // 404 오류에 대한 추가 처리 로직을 작성할 수 있습니다.
            navigate("/newDetail", {
                state: { isbn },
            });
        } else {
            console.error("Error fetching book details: ", error);
            // 다른 오류에 대한 일반적인 처리 로직
        }*/
      console.error();
    }
  };

  return (
    <AllOutDiv>
      <BookListCardContainer>
        {booksearchList.length > 0 ? (
          booksearchList.map((book) => (
            <BookListBox
              key={book.isbn}
              onClick={() => goDetailPage(book.isbn)}
            >
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
`;

const BookListCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const BookListBox = styled.div`
  display: flex;
  cursor: pointer;
`;

const BookImgBox = styled.img`
  margin-right: 18px;
  margin-bottom: 40px;
  width: 24%;
  border-radius: 5px;
`;

const BookInfoOutDiv = styled.div`
  padding-top: 5px;
`;

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
