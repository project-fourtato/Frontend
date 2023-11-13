import { React, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { reviewList } from "../../data/reviewpage";
import "../../App.css"

function ReviewBox(props) {
  return (
    <ReviewBoxContainer>
      <ReviewTitleText><FontAwesomeIcon icon={faPenToSquare} className="icon-review-box" />내가 남긴 감상평</ReviewTitleText>
      <JournalListOutDiv>
      {reviewList.map((journal) => {
        return (
          <ReviewBoxOutDiv>
            <JournalTitleText>{journal.title}</JournalTitleText>
            <JournalDateText>{journal.date}</JournalDateText>
          </ReviewBoxOutDiv>
        )
      })}
      </JournalListOutDiv>
      <JournalAddButton>독서록 추가</JournalAddButton>
    </ReviewBoxContainer>
  );
}

export default ReviewBox;

const ReviewBoxContainer = styled.div`
  border-radius: 40px;
  box-shadow: 3px 8px 8px 3px rgba(0,0,0,0.16), 2px 3px 6px rgba(0,0,0,0.23);
  width: 460px;
  height: 470px;
  padding: 45px 55px;
  background-color: white;
`;

const ReviewTitleText = styled.h3`
  color: #000;
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 14px;
`;

const JournalListOutDiv = styled.div`
  overflow: auto;
  height: 81%;
`

const JournalTitleText = styled.div`
  font-size: 18px;
  font-weight: bold;
`

const JournalDateText = styled.p`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ReviewBoxOutDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #CDCDCD;
  padding: 20px 15px;
  &:hover {
    background-color: #EEEEEE;
    border-radius: 5px;
    cursor: pointer;
  }
`

const JournalAddButton = styled.div`
  width: 150px;
  height: 50px;
  background-color: #f9f9f9;
  border-radius: 15px;
  font-weight: bold;
  font-size: 17px;
  text-align: center;
  line-height: 50px;
  box-shadow: 2.5px 2.5px rgba(0,0,0,0.23);
  margin-left: 70%;
  margin-top: 13px;
  &:hover {
    cursor: pointer;
  }
`