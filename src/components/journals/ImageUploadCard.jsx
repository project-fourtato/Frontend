import React, { useState, useRef } from 'react';
import styled from "styled-components";

function ImageUploadCard(props) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [nickname, setNickname] = useState("");
    const [description, setDescription] = useState("");
    const fileInputRef = React.useRef(null);

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
    
      return (
        <OutDiv>
        {selectedImage ? (
            <ImagePreview src={selectedImage} alt="Selected profile"/>
        ) : (
            <UploadContainer>
            </UploadContainer>
        )}
        <HiddenFileInput 
            ref={fileInputRef}
            id="fileInput"
            type="file"
            onChange={handleImageChange}
        />
        </OutDiv>
      );
}

export default ImageUploadCard;

const OutDiv = styled.div`
    width: 100%;
    height: 100%;
`;

const ImagePreview = styled.img`
width: 600px;
height: 550px;
border: 1px solid #B5B5B5;
margin-left: 120px;
margin-top: 39px;
border-radius: 5px;
`;

const UploadContainer = styled.div`
    width: 600px;
    height: 550px;
    border: 1px solid #B5B5B5;
    margin-left: 120px;
    margin-top: 39px;
    border-radius: 5px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

