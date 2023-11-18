import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from 'react-router-dom';
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import journalBasis from "../../assets/journal-basis.png";

function JournalContentCard(props) {
    const fileInputRef = React.useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageClick, setImageClick] = useState(0);
    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [contents, setContents] = useState();
    let location = useLocation();

    const handleEditButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        if (selectedImage === null) {
          const formData = new FormData();
          setImage(formData);
        }
      }, [selectedImage])

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
            setImageClick(1);
        }

        const formData = new FormData();
        formData.append('file', file);
        setImage(formData);
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

    const handleDataUpload = () => {
        (async () => {
            if(title == '' || contents == '') {
                swal({
                    title: "독서록 등록 실패",
                    text: "타이틀과 내용을 전부 채워주세요!",
                    icon: "fail",
                    buttons: "확인",
                  }).then(() => {
                    navigate("/journal");
                  })
            } else {
                try {
                    const url = "http://localhost:8080/journals/new";
                    image.formData.append("ptitle", title);
                    image.formData.append("userbid", location.state.userbid);
                    image.formData.append("pcontents", contents);
                } catch(error) {
                    console.log(error);
                }
            }
        })();
    };

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <>
            <OutDivInput>
                {selectedImage ? (
                    <ImagePreview src={selectedImage} alt="Selected profile" />
                ) : (
                    <UploadContainer>
                        <div>독서록에 관한 사진을 업로드 해주세요!</div>
                    </UploadContainer>
                )}
                <HiddenFileInput
                    ref={fileInputRef}
                    id="fileInput"
                    type="file"
                    multiple="multiple"
                    onChange={handleImageChange}
                    onClick={(e) => e.target.value = null}
                />
            </OutDivInput>
            <OutDiv>
                <ImageUploadBtnContainer>
                    <Button onClick={handleEditButtonClick}><label htmlFor="fileInput"><span>사진 업로드</span></label></Button>
                </ImageUploadBtnContainer>
                <ContentDiv>
                    <JournalTitle><FontAwesomeIcon icon={faPencil} className="icon-journal-pencil" />제목</JournalTitle>
                    <JournalTitleInput
                        onChange={handleChange}
                    ></JournalTitleInput>
                    <JournalContent><FontAwesomeIcon icon={faPencil} className="icon-journal-pencil" />독서록</JournalContent>
                    <JournalContentInput></JournalContentInput>
                </ContentDiv>
                <UploadBtnContainer>
                    <Button2 onClick={handleCancel}>작성 취소</Button2>
                    <Button2 onClick={handleUpload}>작성 완료</Button2>
                </UploadBtnContainer>
            </OutDiv>
        </>
    );
}

export default JournalContentCard;

const OutDivInput = styled.div`
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
    background-color: white;
    text-align: center;
    line-height: 550px;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    flex-direction: column;
`;

const HiddenFileInput = styled.input`
  display: none;
`;


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
    >lebel {
        width: 100%;
        height: 100%;
    }
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
    background-color: #5F749F;
    color: white;
    box-shadow: 1px 2px #D5D5D5;
    margin-right: 10px;
    margin-bottom: 5px;
    text-align: center;
    line-height: 45px;
    
    &:hover {
        cursor: pointer;
        background-color: white;
        color: #5F749F;
    }

    >label {
        &:hover {
            cursor: pointer;
        }
    }
`

const Button2 = styled.button`
    width: 23%;
    height: 45px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 45px;
    border: 1px solid #D5D5D5;
    background-color: #5F749F;
    color: white;
    box-shadow: 1px 2px #D5D5D5;
    margin-left: 10px;

    &:hover {
        cursor: pointer;
        background-color: white;
        color: #5F749F;
    }

    >label {
        &:hover {
            cursor: pointer;
        }
    }
`

const ContentDiv = styled.div`
    margin-top: 20px;
    margin-bottom: 10px;
`;

const JournalTitle = styled.div`
    font-weight: bold;
    font-size: 22px;
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
    font-size: 22px;
    margin-bottom: 10px;
`;

const JournalContentInput = styled.textarea`
    width: 97%;
    height: 16.5rem;
    border: 1px solid #CACACA;
    border-radius: 10px;
    resize: none;
    padding-top: 17px;
    padding-left: 20px;
    font-size: 14px;
`;
