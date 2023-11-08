import React from "react";
import styled from "styled-components";
import { useNavigate  } from 'react-router-dom';
import swal from "sweetalert";

function JournalContentCard(props) {
    const fileInputRef = React.useRef(null);

    const handleEditButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleUpload = () => {
        // 로그인 로직을 여기에 구현
        console.log("업로드 완료!");
        swal({
          title: "업로드 되었습니다.",
          icon: "success",
          buttons: "확인",
        }).then(() => {
          navigate(-1);
        })
      }

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(-1);
    };

    return (
    <OutDiv>
        <ImageUploadBtnContainer>
            <Button onClick={handleEditButtonClick}><label htmlFor="fileInput"><span>사진 업로드</span></label></Button>
            <Button onClick={handleEditButtonClick}><label htmlFor="fileInput"><span>사진 수정</span></label></Button>
        </ImageUploadBtnContainer>
        <ContentDiv>
            <JournalTitle>제목</JournalTitle>
            <JournalTitleInput></JournalTitleInput>
            <JournalContent>독서록</JournalContent>
            <JournalContentInput></JournalContentInput>
        </ContentDiv>
        <UploadBtnContainer>
            <Button2 onClick={handleCancel}>작성 취소</Button2>
            <Button2 onClick={handleUpload}>작성 완료</Button2>
        </UploadBtnContainer>
    </OutDiv>
    );
}

export default JournalContentCard;

const OutDiv = styled.div`
    width: 85%;
    height: 100%;
    padding-right: 125px;
`;

const ImageUploadBtnContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    margin-top: 45px;
`

const UploadBtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`

const Button = styled.div`
    width: 25%;
    height: 45px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 45px;
    border: 1px solid #D5D5D5;
    background-color: #DBE8D9;
    box-shadow: 1px 2px #D5D5D5;
    margin-right: 10px;
    margin-bottom: 5px;
    text-align: center;
    line-height: 45px;

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
`

const Button2 = styled.button`
    width: 23%;
    height: 45px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 45px;
    border: 1px solid #D5D5D5;
    background-color: #DBE8D9;
    box-shadow: 1px 2px #D5D5D5;
    margin-left: 10px;

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
`

const ContentDiv = styled.div`
    margin-top: 20px;
    margin-bottom: 10px;
`;

const JournalTitle = styled.div`
    font-weight: bold;
    font-size: 23px;
    margin-bottom: 10px;
`;

const JournalTitleInput = styled.input`
    margin-bottom: 20px;
    width: 97%;
    height: 40px;
    border: 1px solid #CACACA;
    border-radius: 10px;
    padding-left: 20px;
`;

const JournalContent = styled.div`
    font-weight: bold;
    font-size: 23px;
    margin-bottom: 10px;
`;

const JournalContentInput = styled.textarea`
    width: 97%;
    height: 275px;
    border: 1px solid #CACACA;
    border-radius: 10px;
    resize: none;
    padding-top: 17px;
    padding-left: 20px;
    font-size: 14px;
`;
