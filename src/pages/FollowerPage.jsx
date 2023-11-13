import React from "react";
import FollowerCard from "../components/userbook/FollowerCard";
import styled from "styled-components";
function FollowerPage(props) {
  return (
    <Container>
      <FollowerCard />
    </Container>
  );
}

export default FollowerPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 6rem;
  height: 100%;
  width: 100%;
`;
