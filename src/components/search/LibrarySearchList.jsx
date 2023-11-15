import {React, useEffect, useState} from "react";
import ExchangBookCard from "../exchangebook/ExchangBookCard";
import styled from "styled-components";

function LibrarySearchList(props) {
  const [msgList,setMsgList] = useState([]);
  useEffect(() => { 
    setMsgList(props.msgList);
    // console.log("제발 울어줘");
    // console.log(props.msgList);
  }, [props.msgList]);
  return (
    <ExchangBookCardOutDiv>
      <ExchangBookCard msgList={msgList}/>
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