import React from "react";
import styled from "styled-components";
import { FaRegFolder } from "react-icons/fa";
import { BiSolidBookAlt } from "react-icons/bi";
import { GrFormNext } from "react-icons/gr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "../../App.css"

function IntroAndIndexFooter(props) {
  return (
    <IntroBoxContainer>
      <CategoryBox>
        <TitleText>
          <FontAwesomeIcon icon={faFolder} className="icon-bookdetail-category" />
          카테고리
        </TitleText>
        <CategoryText>
          자기계발 {">"} 성공 {">"} 성공학
        </CategoryText>
      </CategoryBox>

      <IntroBookBox>
        <TitleText>
          <FontAwesomeIcon icon={faChevronRight} className="icon-bookdetail-modal" />
          책소개
        </TitleText>
      </IntroBookBox>

      <IndexBox>
        <TitleText>
        <FontAwesomeIcon icon={faChevronRight} className="icon-bookdetail-modal" />
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
  margin-top: 35px;
`;
const TitleText = styled.h5`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryText = styled.p`
  margin-top: 10px;
  padding-left: 6.2%;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const IntroBookBox = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const IndexBox = styled.div``;
