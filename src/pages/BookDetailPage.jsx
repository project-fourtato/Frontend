import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import IntroAndIndexFooter from "../components/bookdetail/IntroAndIndexFooter";
import ReviewBox from "../components/bookdetail/ReviewBox";

const BookDetailPage = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookimg = location.state.bookimg;
  const title = location.state.title;
  const contents = location.state.contents;
  const auther = location.state.auther;
  const publisher = location.state.publisher;

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("읽는 중");

  const handleDropdownItemClick = (option) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);

    if (option === "책 삭제하기") {
      navigate("/mypage");
    }
  };

  return (
    <BookDetailContainer>
      <BookDetailBox>
        <BookDetailInnerContainer>
          <BookImg src={bookimg} alt="책 이미지"/>
          <BookDetailTextBox>
            <h2>{title}</h2>
            <h5>{contents}</h5>
            <p>{auther}</p>
            <p>{publisher}</p>
            <ProgressContainer>
              <ProgressBox onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
                {selectedOption}
                {isDropdownVisible && (
                  <DropdownMenu>
                    <DropdownItem onClick={() => handleDropdownItemClick("읽고 싶은 책")}>
                      읽고 싶은 책
                    </DropdownItem>
                    <DropdownItem onClick={() => handleDropdownItemClick("읽는 중")}>
                      읽는 중
                    </DropdownItem>
                    <DropdownItem onClick={() => handleDropdownItemClick("독서 완료")}>
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
        <IntroAndIndexFooter />
      </BookDetailBox>
      <ReviewBox />
    </BookDetailContainer>
  );
}

export default BookDetailPage;

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
