import React, { useState } from "react";
import { BiSolidSmile } from "react-icons/bi";
import styled from "styled-components";
import { settingtagData } from "../../data/mypagedata";
import { profileState, loginState } from "../../recoil/atom";
import { useRecoilState } from "recoil";
import { GrFormNext } from "react-icons/gr";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import SayGoodbyeModal from "../common/SayGoodbyeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaugh, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";
import { icon } from "@fortawesome/fontawesome-svg-core";

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
      swal({
        text: "관심사는 최대 5개까지만 선택해 주세요!",
        icon: "warning",
        buttons: "확인"
      });
    }
  };


  const handleSuccess = () => {
    swal({
      title: "회원가입 성공!",
      text: "회원가입이 완료되었습니다.",
      icon: "success",
      buttons: "확인",
    }).then(() => {
      navigate("/");
      setIsLogin({ isLogin: true });
    })
  }

  const handleEditSuccess = () => {
    swal({
      title: "프로필 수정 완료!",
      text: "프로필 수정이 완료되었습니다.",
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
        <FontAwesomeIcon icon={faFaceLaugh} /> 관심사 설정
      </MySettingText>
      <Subtitle>좋아하시는 책 분야를 선택해 주세요!</Subtitle>
      <TagContainer>
        <RenderTagsInGroupsOfFive />
      </TagContainer>

      <MySettingListText>
        <FontAwesomeIcon icon={faAngleRight} />내가 선택한 목록
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
            <p onClick={() => setShowModal(true)}>BOOKER 회원탈퇴를 하고싶어요..!</p>
          </RemoveContainer>
        )
      }
      {
        showModal && (
          <SayGoodbyeModal setShowModal={setShowModal} />
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
  /*height: 100%;*/
  margin-left: 10px;
`;

const MySettingText = styled.h2`
  color: #000;
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 5px;
  svg {
    margin-right: 11px;
    font-size: 23px;
  }
`;

const MySettingListText = styled.h2`
  color: #000;
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  /*margin-top: 10px;*/
  svg {
    margin-right: 10px;
    width: 25px;
    height: 25px;
  }
`;

const Subtitle = styled.p`
  color: #000;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 30px;
  margin-left: 5px;
`;

const TagContainer = styled.div`
  display: flex;
`;

const TagBoxContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Tagbox = styled.p`
  border-radius: 43px;
  border: 1px solid #c1c1c1;
  /* background: #fff;
  color: #000; */
  background: ${(props) => props.isSelected ? '#5F749F' : '#fff'};
  color: ${(props) => props.isSelected ? 'white' : '#000'};
  text-align: center;
  padding: 10px 10px;
  width: 100px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-right: 10px;
  margin-bottom: 20px;
  cursor: pointer;

`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2px;
`;

const RemoveContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  >p{
    color: #000;
cursor: pointer;  
font-style: normal;
font-weight: 600;
line-height: normal;
  }
`;

const SubmitButton = styled.button`
  border-radius: 43px;
  background: #5F749F;
  border: none;
  color: white;
  cursor: pointer;
  padding: 10px 20px;
  width: 140px;
  height: 45px;
  transform: rotate(-0.001deg);
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  box-shadow: 2px 2px rgba(0,0,0,0.16), 1px 2px 2px rgba(0,0,0,0.23);
  &:hover {
    background: white;
    color: #5F749F;
    border: 1px solid #DBDBDB;
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

