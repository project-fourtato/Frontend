import React, { useState, useRef } from "react";
import { BiSolidUser } from "react-icons/bi";
import styled from "styled-components";
import { FiUpload } from "react-icons/fi";
import { BiSolidMessage } from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUpload, faMessage } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";

import swal from "sweetalert";
function NickName(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = React.useRef(null);

  const handleNicknameChange = (e) => {
    const inputValue = e.target.value;
    
    if (inputValue.includes(' ')) {
      swal("경고", "닉네임에 띄어쓰기를 사용할 수 없어요.", "error");
      return;
    }
  
    if (inputValue.length > 11) {
      swal("경고", "닉네임은 11자를 초과할 수 없어요.", "error");
      return;
    }
  
    setNickname(inputValue);
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length > 31) {
      swal("Oops!", "한 줄 소개는 31글자를 넘을 수 없습니다.", "error");
      return;
    }
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEditButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Container>
      <div>
        {/* 사진업로드 */}
        <UploadWrapper>
          {selectedImage ? (
            <ImagePreview src={selectedImage} alt="Selected profile" />
          ) : (
            <UploadContainer>
              <label htmlFor="fileInput">
                <FontAwesomeIcon icon={faUpload} className="icon-editprofile-upload" />
              </label>
            </UploadContainer>
          )}
          <HiddenFileInput
            ref={fileInputRef}
            id="fileInput"
            type="file"
            onChange={handleImageChange}
          />
        </UploadWrapper>

        <MyNameText>
          <FontAwesomeIcon icon={faUser} /> 닉네임
        </MyNameText>
        <Subtitle>BOOKER에서 사용하실 닉네임을 알려주세요!</Subtitle>
        <Input
          type="text"
          placeholder="닉네임을 입력해 주세요!"
          value={nickname}
          onChange={handleNicknameChange}
        />

        <MyNameText>
          <FontAwesomeIcon icon={faMessage} /> 한줄소개 설정
        </MyNameText>
        <Subtitle>자신을 소개하는 한 줄을 적어보세요!</Subtitle>
        <Input
          type="text"
          placeholder="힌줄소개를 입력해 주세요!"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
    </Container>
  );
}

export default NickName;

const Container = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  /* width: 600px; */
  margin-right: 10px;
`;

const UploadWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid #DBDBDB;

  &:hover {
    background-color: #5F749F;
    cursor: pointer;
    svg {
      color: white;
      cursor: pointer;
    }
  }
`;
const UploadBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: #dbe8d9;
  color: #000;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
    background-color: #344a39;
    color: #fff;
  }
`;
const HiddenFileInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const MyNameText = styled.h2`
  color: #000;
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 25px;
  margin-left: 5px;
  svg {
    margin-right: 13px;
    width: 21px;
    height: 21px;
  }
`;

const Subtitle = styled.p`
  color: #000;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 13px;
  margin-left: 5px;
`;

const Input = styled.input`
  width: 400px;
  height: 42px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  &::placeholder {
    color: #b4b4b4;
  }
`;
