import { React, useState } from "react";
import styled from "styled-components";
import { FaRegFolder } from "react-icons/fa";
import { BiSolidBookAlt } from "react-icons/bi";
import { GrFormNext } from "react-icons/gr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "../../App.css"
import { useEffect } from "react";

function IntroAndIndexFooter(props) {

  const [isIntroExpanded, setIsIntroExpanded] = useState(false);
  const [isIndexExpanded, setIsIndexExpanded] = useState(false);

  const introContent = props.introContent || "책 소개 내용이 없습니다.";
  const indexContent = props.indexContent || "목차 내용이 없습니다.";

  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(()=> {
    setCategoryName(props.categoryName);
  }, [props.categoryName]);
  
  useEffect(()=> {
    setDescription(props.description);
  }, [props.description]);

  return (
    <IntroBoxContainer>
      <CategoryBox>
        <TitleText>
          <FontAwesomeIcon icon={faFolder} className="icon-bookdetail-category" />
          카테고리
        </TitleText>
        <CategoryText >
          {categoryName}
        </CategoryText>
      </CategoryBox>

      <IntroBookBox>
        <TitleText onClick={() => setIsIntroExpanded(!isIntroExpanded)}>
          <FontAwesomeIcon icon={faChevronRight} className="icon-bookdetail-modal" />
          책 소개
        </TitleText>
        {isIntroExpanded && <ContentText>{description}</ContentText>}
      </IntroBookBox>
{/* 
      <IndexBox>
        <TitleText onClick={() => setIsIndexExpanded(!isIndexExpanded)}>
        <FontAwesomeIcon icon={faChevronRight} className="icon-bookdetail-modal" />
          목차
        </TitleText>
        {isIndexExpanded && <ContentText>{indexContent}</ContentText>}
      </IndexBox> */}
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
  cursor: pointer;
`;

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryText = styled.p`
  margin-top: 10px;
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

const ContentText = styled.p`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 10px;
`;
