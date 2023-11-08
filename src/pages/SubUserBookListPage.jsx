import React from "react";
import UserBookCard from "../components/userbook/UserBookCard";
import styled from "styled-components";
function SubUserBookListPage(props) {
  return (
    <Container>
      <UserBookCard />
    </Container>
  );
}

export default SubUserBookListPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 6rem;
  height: 100%;
  width: 100%;
`;
