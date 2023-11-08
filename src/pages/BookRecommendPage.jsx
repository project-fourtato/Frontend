import React from "react";
import styled from "styled-components";
import BestBookCard from "../components/recommend/BestBookCard";
import BestUserCard from "../components/recommend/BestUserCard";

function BookRecommendPage(props) {
  return (
    <Container>
      <BestBookCard />
      <BestUserCard />
    </Container>
  );
}

export default BookRecommendPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 6rem;
  height: 100%;
  width: 100%;
`;
