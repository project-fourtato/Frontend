import React from 'react';
import styled from 'styled-components';

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <NotFoundBox>
        <NotFoundTitle>404 - Not Found</NotFoundTitle>
        <NotFoundMessage>존재하지 않는 페이지입니다.</NotFoundMessage>
      </NotFoundBox>
    </NotFoundContainer>
  );
};

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-top:-100px;
`;

const NotFoundBox = styled.div`
  text-align: center;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const NotFoundTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: #5f749f;
  margin-top: 70px;
  margin-bottom: 70px;
  margin-left: 200px;
  margin-right: 200px;
`;

const NotFoundMessage = styled.p`
  font-size: 25px;
  line-height: 1.5;
  margin-bottom:70px;
`;

export default NotFoundPage;
