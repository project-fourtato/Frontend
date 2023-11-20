import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from 'react-router-dom';
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import journalBasis from "../../assets/journal-basis.png";

function JournalContentCard(props) {
    let posts = "hello";
    const fileInputRef = React.useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageClick, setImageClick] = useState(0);
    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [contents, setContents] = useState();
    const navigate = useNavigate();
    let location = useLocation();
    let userbid= "";
    let jid = "";
    try {
        userbid = location.state.userbid;
        jid = location.state.jid;
    } catch(error) {
        navigate("/error");
    }

    const profileSession = sessionStorage.getItem("profile");
    const p = JSON.parse(profileSession);
    let uid = p.uid;

    const [JournalResponse, setJournalResponse] = useState({
        jid: '',
        pdatetime: '',
        ptitle: '',
        pcontents: '',
        pimageUrl: '',
        pimageName: ''
    });

    const currentPath = window.location.pathname;
    const lastSegment = currentPath.substring(currentPath.lastIndexOf('/') + 1); //유저 누르면 여기 값 넣어줘서 확인

    const handleEditButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        if (selectedImage === null) {
            const formData = new FormData();
            formData.append("file", null);
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

            const formData = new FormData();
            formData.append("file", file);
            setImage(formData);
        }
    };

    const handleDataUpload = () => {
        (async () => {
            if (title === '' || contents === '') {
                swal({
                    title: "독서록 등록 실패",
                    text: "타이틀과 내용을 전부 채워주세요!",
                    icon: "error",
                    buttons: "확인",
                }).then(() => {
                    
                })
            } else {
                try {
                    const url = "http://localhost:8080/journals/new";
                    image.append("ptitle", title);
                    image.append("userbid", userbid);
                    image.append("pcontents", contents);

                    const response = await axios.post(url, image, {
                        header: {
                            "Content-Type": "multipart/form-data",
                        }
                    })
                    posts = response.data;
                    // console.log(response.data);

                    if (posts.data === "Write Journals Success") {
                        swal({
                            title: "독서록 등록 완료!",
                            text: "독서록 등록이 완료되었습니다.",
                            icon: "success",
                            buttons: "확인",
                        }).then(() => {
                            navigate(-1, { state : {uid} });
                        })
                    }
                } catch (error) {
                    // console.log(error);
                }
            }
        })();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "http://localhost:8080/journals/" + jid;
                const response = await axios.get(url);
                setJournalResponse(response.data);
            } catch (error) {
                // console.log(error);
            }
        };

        if (lastSegment === 'edit') {
            fetchData();
        }
    }, []);

    useEffect(() => {
        setSelectedImage(JournalResponse.pimageUrl);
        setTitle(JournalResponse.ptitle);
        setContents(JournalResponse.pcontents);
    }, [JournalResponse]);

    const handleUpdateJournal = async () => {
        try {
            const url = "http://localhost:8080/journals/" + jid + "/edit";
            if (title) {
                image.append("ptitle", title);
            }
            if (contents) {
                image.append("pcontents", contents);
            }

            // console.log(image.get("pcontents"));

            const response = await axios.put(url, image,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            if (response.data.data === "Edit Journals Success") {
                swal({
                    title: "독서록 수정 완료!",
                    text: "독서록 수정이 완료되었습니다.",
                    icon: "success",
                    buttons: "확인",
                }).then(() => {
                    navigate(-1, { state: { userbid } });
                })
            }
        } catch (error) {
            // console.log(error);
        }
    }

    const clearInputValue = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    }

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeContents = (e) => {
        setContents(e.target.value);
    }

    const handleCancel = () => {
        swal({
            title: "작성된 내용이 사라질 수 있습니다.",
            text: "그래도 이동하시겠습니까?",
            icon: "warning",
            buttons: ["취소", "확인"],
            dangerMode: true,
        })
        .then((willLeave) => {
            if (willLeave) {
                navigate(-1);
            }
        });
    };

    return (
        <>
            <OutDivInput>
                {selectedImage ? (
                    <ImageOutDiv>
                        <ImagePreview src={selectedImage} alt="Selected profile" />
                    </ImageOutDiv>
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
                    onClick={() => clearInputValue()}
                />
            </OutDivInput>
            <OutDiv>
                <ImageUploadBtnContainer>
                    <label htmlFor="fileInput">
                        <Button onClick={() => { clearInputValue(); }}>
                            <span>사진 업로드</span>
                        </Button>
                    </label>
                </ImageUploadBtnContainer>
                <ContentDiv>
                    <JournalTitle><FontAwesomeIcon icon={faPencil} className="icon-journal-pencil" />제목</JournalTitle>
                    <JournalTitleInput
                        type="text"
                        value={title}
                        placeholder="제목을 입력해 주세요!"
                        onChange={handleChangeTitle}
                    ></JournalTitleInput>
                    <JournalContent><FontAwesomeIcon icon={faPencil} className="icon-journal-pencil" />독서록</JournalContent>
                    <JournalContentInput
                        type="text"
                        value={contents}
                        placeholder="내용을 입력해 주세요!"
                        onChange={handleChangeContents}
                    ></JournalContentInput>
                </ContentDiv>
                <UploadBtnContainer>
                    <Button2 onClick={handleCancel}>작성 취소</Button2>
                    {
                        (lastSegment === 'edit') ? <Button2 onClick={handleUpdateJournal}>수정 완료</Button2> : <Button2 onClick={handleDataUpload}>작성 완료</Button2>
                    }
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

const ImageOutDiv = styled.div`
    width: 600px;
    height: 550px;
    border: 1px solid #B5B5B5;
    margin-left: 120px;
    margin-top: 10px;
    border-radius: 10px;
`

const ImagePreview = styled.img`
    width: 600px;
    height: 550px;
    border-radius: 8.5px;
`;

const UploadContainer = styled.div`
    width: 600px;
    height: 550px;
    border: 1px solid #B5B5B5;
    margin-left: 120px;
    margin-top: 20px;
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
    margin-top: 25px;
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
    width: 147px;
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
    max-width: 97%;
    height: 16.5rem;
    border: 1px solid #CACACA;
    border-radius: 10px;
    resize: none;
    padding-top: 17px;
    padding-left: 20px;
    font-size: 14px;
    font-family: Nanum;
    word-wrap: break-word; 
`;
