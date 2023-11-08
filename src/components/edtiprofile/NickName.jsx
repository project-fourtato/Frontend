import React, { useState, useRef } from "react";
import { BiSolidUser } from "react-icons/bi";
import styled from "styled-components";
import { FiUpload } from "react-icons/fi";
import { BiSolidMessage } from "react-icons/bi";

import swal from "sweetalert";
function NickName(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = React.useRef(null);

  const handleNicknameChange = (e) => {
    if (e.target.value.length > 11) {
      swal("Oops!", "닉네임은 11자리를 넘을 수 없습니다.", "error");
      return;
    }
    setNickname(e.target.value);
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
                <FiUpload size={54} color="#555" />
              </label>
            </UploadContainer>
          )}
          <HiddenFileInput
            ref={fileInputRef}
            id="fileInput"
            type="file"
            onChange={handleImageChange}
          />
          <UploadBtnContainer>
            <Button onClick={handleEditButtonClick}>업로드</Button>
            <Button onClick={handleEditButtonClick}>수정</Button>
          </UploadBtnContainer>
        </UploadWrapper>

        <MyNameText>
          <BiSolidUser /> 닉네임
        </MyNameText>
        <Subtitle>BOOKER에서 사용하실 닉네임을 알려주세요!</Subtitle>
        <Input
          type="text"
          placeholder="닉네임을 입력"
          value={nickname}
          onChange={handleNicknameChange}
        />

        <MyNameText>
          <BiSolidMessage /> 한줄소개 설정
        </MyNameText>
        <Subtitle>자신을 소개하는 한 줄을 적어보세요!</Subtitle>
        <Input
          type="text"
          placeholder="힌줄소개 입력"
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
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
  background-color: #d9d9d9;
  svg {
    color: #000;
    cursor: pointer;
    &:hover {
      color: #f5f5f5;
    }
  }

  &:hover {
    background-color: #f5f5f5;
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
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const MyNameText = styled.h2`
  color: #000;
  font-family: Inter;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 50px;
  svg {
    margin-right: 13px;
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

const Input = styled.input`
  width: 400px;
  height: 50px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding-left: 20px;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  &::placeholder {
    color: #b4b4b4;
  }
`;
