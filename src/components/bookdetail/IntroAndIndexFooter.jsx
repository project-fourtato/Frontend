import React from "react";
import styled from "styled-components";
import { FaRegFolder } from "react-icons/fa";
import { BiSolidBookAlt } from "react-icons/bi";
import { GrFormNext } from "react-icons/gr";
function IntroAndIndexFooter(props) {
  return (
    <IntroBoxContainer>
      <CategoryBox>
        <TitleText>
          <FaRegFolder />
          카테고리
        </TitleText>
        <CategoryText>
          자기계발 {">"} 성공 {">"} 성공학
        </CategoryText>
      </CategoryBox>

      <IntroBookBox>
        <TitleText>
          <BiSolidBookAlt />
          책소개
        </TitleText>
      </IntroBookBox>

      <IndexBox>
        <TitleText>
          <GrFormNext />
          목차
        </TitleText>
      </IndexBox>
    </IntroBoxContainer>
  );
}

export default IntroAndIndexFooter;

const IntroBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;
const TitleText = styled.h5`
  color: #000;
  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 13px;
    width: 30px;
    height: 30px;
    color: #344a39;
  }
`;

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryText = styled.p`
  margin-top: 10px;
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const IntroBookBox = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
`;

const IndexBox = styled.div``;
