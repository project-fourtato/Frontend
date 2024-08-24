import MyPage from "../pages/MyPage";
import UserPage from "../pages/UserPage";
function StudyPage(props) {
  const profile = sessionStorage.getItem("profile");
  const p = JSON.parse(profile);
  // 현재 URL에서 경로 추출
  const currentPath = window.location.pathname;
  // 예시: 경로에서 마지막 부분 추출 (마지막 슬래시 이후의 부분)
  const lastSegment = currentPath.substring(currentPath.lastIndexOf("/") + 1); //유저 누르면 여기 값 넣어줘서 확인

  if (p.uid === lastSegment) {
    //이거 나중에 ! 수정하기(마이페이지 수정 후에)
    return <MyPage></MyPage>;
  } else {
    return <UserPage UserUid={lastSegment}></UserPage>;
  }
}

export default StudyPage;
