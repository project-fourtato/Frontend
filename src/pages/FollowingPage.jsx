import React from "react";
import FollowingCard from "../components/userbook/FollowingCard";
import styled from "styled-components";
function FollowingPage(props) {
  return (
    <Container>
      <FollowingCard />
    </Container>
  );
}

export default FollowingPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 6rem;
  height: 100%;
  width: 100%;
`;
