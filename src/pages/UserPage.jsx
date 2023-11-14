import styled from "styled-components";
import UserBookListCard from "../components/userpage/UserBookListCard";
import UserProfileHeader from "../components/userpage/UserProfileHeader";
const UserPage = () => {
  return (
    <Container>
      <AllOutDiv>
        <UserProfileHeader />
        <UserBookListCard />
      </AllOutDiv>
    </Container>
  );
};

export default UserPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1.5rem;
  height: 100%;
  width: 100%;
`;

const AllOutDiv = styled.div`
  background-color: white;
  width: 68%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 45px;
  padding-top: 70px;
  padding-bottom: 43px;
  box-shadow: 3px 8px 8px 3px rgba(0,0,0,0.16), 2px 3px 6px rgba(0,0,0,0.23);
`
