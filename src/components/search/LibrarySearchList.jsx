import React from "react";
import ExchangBookCard from "../exchangebook/ExchangBookCard";
import styled from "styled-components";

function LibrarySearchList(props) {
  return (
    <ExchangBookCardOutDiv>
      <ExchangBookCard />
    </ExchangBookCardOutDiv>
  )
}

export default LibrarySearchList;

const ExchangBookCardOutDiv = styled.div`
  width: 75%;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 5%;
`