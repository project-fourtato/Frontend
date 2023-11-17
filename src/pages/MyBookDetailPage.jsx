import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import IntroAndIndexFooter from "../components/bookdetail/IntroAndIndexFooter";
import ReviewBox from "../components/bookdetail/ReviewBox";
import axios from "axios";
import swal from 'sweetalert';

const MyBookDetailPage = (props) => {
  const [bookData, setBookData] = useState({
    "cover": "hi"
  });
  const location = useLocation();
  const navigate = useNavigate();
  const uid = location.state.uid;
  const isbn = location.state.isbn;
  const userbid = location.state.userbid;
  const [firstPart, setFirstPart] = useState('');
  const [secondPart, setSecondPart] = useState('');
  useEffect(() => {
    const BookData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/books/booksDetail/`+isbn);
        // console.log(response);
        const data = response.data.data;
        // console.log(data);
        setBookData(data);
        const title = data.title;

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
  
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  //독서 상태조회
  const [selectedOption, setSelectedOption] = useState('');
  const [count, setCount] =useState(0);
  useEffect(() => {
    const UserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/booksState/uid=`+uid+`&isbn=`+isbn);
        const data = response.data;
        // console.log(data);
        const option = data.bookState;
        // console.log("잘받아와지나~");
        // console.log(option);
        if (option === 0) { setSelectedOption("읽기 전"); }
        else if (option === 1) { setSelectedOption("읽고 싶은 책");}
        else if (option === 2) {setSelectedOption("읽는 중"); }
        else if (option === 3) {setSelectedOption("독서 완료"); }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    UserData();
  }, [count]);

  const handleDropdownItemClick = (option) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);

    if (option === "책 삭제하기") {
      swal({
        title: "책을 삭제하시겠습니까?",
        text : "삭제 시 독서록까지 삭제됩니다!",
        icon: "warning",
        buttons: ["취소", "삭제"],
    }).then((willDelete) => {
      if (willDelete) {
        (async() => {
          try{
            // console.log(userbid);
            const url = 'http://localhost:8080/books/'+userbid+'/delete';
            const response = await axios.post(url, {
              "isbn" : isbn,
              "bookstate" : 0,
              "salestate" : 0
          });
            // console.log(url);
            navigate("/mypage");
          } catch(error) {
            console.log(error);
          }
        }) ();
          swal({
              title: "책 삭제",
              text: "삭제되었습니다.",
              icon: "success",
          });
      } else {
          swal({
              title: "책 삭제 취소",
              text: "삭제가 취소되었습니다.",
              icon: "error",
          });
      }
    }
    );
    } else {
      handleOption(option);
    } 
  };
  const handleOption = async (option) => {
    try{
      const url = 'http://localhost:8080/journals/bookstateUpdate/uid='+uid+'&isbn='+isbn;
      const response = await axios.put(url, {
        bookstate: option, 
        salestate: 0
      });
      const responseData = response.data.data;
      // console.log(responseData);
      if(responseData=="bookstate update success"){
        setCount(count+1);
        // console.log(count);
      }
    } catch (error) {
      console.log(error);
    }};



  return (
    <BookDetailContainer>
      <BookDetailBox>
        <BookDetailInnerContainer>
          <BookImg src={bookData.cover} alt="책 이미지"/>
          <BookDetailTextBox>
            <h2>{firstPart}</h2>
            <h5>{secondPart}</h5>
            <p>{bookData.author}</p>
            <p>{bookData.publisher} | {bookData.pubDate}</p>
            <ProgressContainer>
              <ProgressBox onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
                {selectedOption}
                {isDropdownVisible && (
                  <DropdownMenu>
                    <DropdownItem onClick={() => handleDropdownItemClick(0)}>
                      읽기 전
                    </DropdownItem>
                    <DropdownItem onClick={() => handleDropdownItemClick(1)}>
                      읽고 싶은 책
                    </DropdownItem>
                    <DropdownItem onClick={() => handleDropdownItemClick(2)}>
                      읽는 중
                    </DropdownItem>
                    <DropdownItem onClick={() => handleDropdownItemClick(3)}>
                      독서 완료
                    </DropdownItem>
                    <DropdownItem onClick={() => handleDropdownItemClick("책 삭제하기")}>
                      책 삭제하기
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </ProgressBox>
            </ProgressContainer>
          </BookDetailTextBox>
        </BookDetailInnerContainer>
        <IntroAndIndexFooter categoryName={bookData.categoryName} description={bookData.description}/>
      </BookDetailBox>
      <ReviewBox userbid={userbid} type={'my'} nickname={'회원'}/>
    </BookDetailContainer>
  );
}

export default MyBookDetailPage;

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
