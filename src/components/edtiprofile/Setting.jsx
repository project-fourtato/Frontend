import React,{useState} from "react";
import { BiSolidSmile } from "react-icons/bi";
import styled from "styled-components";
import { settingtagData } from "../../data/mypagedata";
import {profileState, loginState} from "../../recoil/atom";
import { useRecoilState } from "recoil";
import {GrFormNext} from "react-icons/gr";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import SayGoodbyeModal from "../common/SayGoodbyeModal";
function Setting(props) {

  const [profile, setProfile] = useRecoilState(profileState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [selectedTags, setSelectedTags] = useState([]);
  const maxSelectedTags = 5;

  const toggleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < maxSelectedTags) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      swal("최대 5개까지만 선택할 수 있습니다!");
    }
  };
  

  const handleSuccess = () => {
    swal({
      title: "회원가입이 완료되었습니다.",
      icon: "success",
      buttons: "확인",
    }).then(() => {
      navigate("/");
      setIsLogin({ isLogin: true });
    })
  }

  const handleEditSuccess = () => {
    swal({
      title: "프로필 수정이 완료되었습니다.",
      icon: "success",
      buttons: "확인",
    }).then(() => {
      navigate("/mypage");
    })
  }

  const RenderTagsInGroupsOfFive = () => {
    const numberOfRows = Math.ceil(settingtagData.length / 4);
    let rows = [];
  
    for (let i = 0; i < numberOfRows; i++) {
      let rowTags = settingtagData.slice(i * 4, (i + 1) * 4);
      rows.push(
        <TagRowContainer key={i}>
          {rowTags.map(tag => (
            <TagBoxContainer key={tag}>
              <Tagbox 
              onClick={() => 
              toggleTagSelection(tag)}
              isSelected={selectedTags.includes(tag)
              }>
                {tag}
              </Tagbox>
            </TagBoxContainer>
          ))}
        </TagRowContainer>
      );
    }
  
    return <>{rows}</>;
  };

  return (
    <Container>
        <MySettingText>
          <BiSolidSmile /> 관심사 설정
        </MySettingText>
        <Subtitle>좋아하시는 책 분야를 선택해 주세요!</Subtitle>
        <TagContainer>
        <RenderTagsInGroupsOfFive/>
    </TagContainer>

      <MySettingListText>
          <GrFormNext />내가 선택한 목록
        </MySettingListText>
        <TagContainer>
        {
          selectedTags.map((tag) => (
            <Tagbox key={tag}>
              {tag}
            </Tagbox>
          ))
        }
        </TagContainer>

      {
        profile === 'edit' ? 
        (
          <ButtonContainer>
          <SubmitButton onClick={handleEditSuccess}>수정 완료</SubmitButton> 
          </ButtonContainer>
        ) : (
          <ButtonContainer>
          <SubmitButton onClick={handleSuccess}>가입 완료</SubmitButton> 
          </ButtonContainer>
        )
      }
      {
         profile === 'edit' && (
          <RemoveContainer>
          <p onClick={()=>setShowModal(true)}>BOOKER 회원탈퇴를 하고싶어요..!</p> 
          </RemoveContainer>
         )
      }
      {
        showModal && (
          <SayGoodbyeModal setShowModal={setShowModal}/>
        )
      }
    </Container>
  );
}

export default Setting;

const Container = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  /* width: 600px; */
`;

const MySettingText = styled.h2`
  color: #000;
  font-family: Inter;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  svg {
    margin-right: 10px;
    width: 40px;
    height: 40px;
  }
`;

const MySettingListText = styled.h2`
  color: #000;
  font-family: Inter;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  margin-top: 50px;
  svg {
    margin-right: 10px;
    width: 40px;
    height: 40px;
  }
`;

const Subtitle = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 30px;
`;

const TagContainer = styled.div`
  display: flex;
`;

const TagBoxContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column ;
`;

const Tagbox = styled.p`
  border-radius: 43px;
  border: 1px solid #c1c1c1;
  /* background: #fff;
  color: #000; */
  background: ${(props) => props.isSelected ? '#DBE8D9' : '#fff'};
  color: ${(props) => props.isSelected ? '#000' : '#000'};
  text-align: center;
  padding: 10px 10px;
  width: 110px;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-right: 10px;
  margin-bottom: 20px;
  cursor: pointer;

`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
`;

const RemoveContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  >p{
    color: #000;
cursor: pointer;  
font-family: Inter;
font-style: normal;
font-weight: 600;
line-height: normal;
  }
`;

const SubmitButton = styled.button`
  border-radius: 43px;
  border: 1px solid #c1c1c1;
  background: #DBE8D9;
    color: #000;
  cursor: pointer;
  padding: 10px 20px;
  width: 150px;
  height: 50px;
  transform: rotate(-0.001deg);
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  box-shadow: 2px 4px 0px 0px rgba(0, 0, 0, 0.25);
  &:hover {
    background: #344a39;
  color: #fff;
  }
`;

const TagRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

