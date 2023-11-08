import styled from "styled-components";
import MyBookListCard from "../components/mypage/MyBookListCard";
import ProfileHeader from "../components/mypage/ProfileHeader";
const MyPage = () => {
  return (
    <Container>
      <ProfileHeader />
      <MyBookListCard />
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 6rem;
  height: 100%;
  width: 100%;
`;
