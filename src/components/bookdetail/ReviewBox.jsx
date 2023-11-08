import React from "react";
import styled from "styled-components";
function ReviewBox(props) {
  return (
    <ReviewBoxContainer>
      <ReviewTitleText>내가 남긴 감상평</ReviewTitleText>
      <ReviewBoxText>
        변혁적 관계를 맺으라는 건 서로에 대해 계산기를 두드리지 말라는 말이다.
        변혁적 관계에는 서로 돕고 지원하려는 진정한 열망만 있다. 변혁적 관계의
        목적이자 방식은 변화다. 베풂과 감사, 성장에 초점을 맞춘 변화가 변혁적
        관계의 핵심이다.‘나에게 무슨 유익이 있지?’라는 생각에 사로잡히지 말고
        ‘그들에게 무슨 유익이 있지?’라는 질문을 해야 한다. 먼저 다른 사람이
        목표를 이룰 수 있게 도와라. 거기서 출발해 관계를 구축해야 한다.
      </ReviewBoxText>
      <PageText>-page 80</PageText>
      <SubReviewBoxText>
        미래의 나와 연결되는 순간 새로운 세계가 열린다현재 삶의 판단 기준이
        생기고, 어떤게 살아야 성공한 삶을 살수있는지 이정표를 준다.미래에 나를
        사랑하고 투자해라. 모든 순간이 축복이다
      </SubReviewBoxText>
    </ReviewBoxContainer>
  );
}

export default ReviewBox;

const ReviewBoxContainer = styled.div`
  border-radius: 40px;
  background: #f9f9f9;
  box-shadow: 3px 3px 2px 0px rgba(0, 0, 0, 0.3);
  width: 470px;
  height: 580px;
  padding: 40px 60px;
`;

const ReviewTitleText = styled.h3`
  color: #000;
  font-family: Inter;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 20px;
`;

const ReviewBoxText = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const PageText = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  display: flex;
  justify-content: flex-end;
`;

const SubReviewBoxText = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border-top: 1px solid #a8a8a8;
  border-bottom: 1px solid #a8a8a8;
  padding: 20px 0;
  margin-top: 30px;
`;
