import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from 'react-router-dom';
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faShare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import journalBasis from "../../assets/booker-basis.svg";

function JournalDetail(props) {
    let posts = "hello";
    const fileInputRef = React.useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [JournalResponse, setJournalResponse] = useState({
        jid: '',
        pdatetime: '',
        ptitle: '',
        pcontents: '',
        pimageUrl: '',
        pimageName: ''
    });
    const navigate = useNavigate();
    let location = useLocation();
    const jid = location.state.jid;

     // 현재 URL에서 경로 추출
    const currentPath = window.location.pathname;
    // 예시: 경로에서 마지막 부분 추출 (마지막 슬래시 이후의 부분)
    const segments = currentPath.split('/');
    const lastSegment = segments[1];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "http://localhost:8080/journals/" + jid;
                const response = await axios.get(url);
                setJournalResponse(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleCancel = () => {
        navigate(-1);
    };

    const handleDeleteButton = () => {
        
    }

    const handleEditButton = () => {
        navigate("/journals/edit", { state : {jid} });
    }

    return (
        <>
            <OutDivInput>
                <ImageOutDiv>
                <ImagePreview src={(JournalResponse.pimageName) ? JournalResponse.pimageUrl : journalBasis} alt="Selected profile" />
                </ImageOutDiv>
                <ContentButtonOutDiv>
                    <ContentDiv>
                        <JournalTitle><FontAwesomeIcon icon={faPencil} className="icon-journal-pencil" />제목</JournalTitle>
                        <JournalDetailTitle>{JournalResponse.ptitle}</JournalDetailTitle>
                        <JournalContent><FontAwesomeIcon icon={faPencil} className="icon-journal-pencil" />독서록</JournalContent>
                        <JournalDateilContent>{JournalResponse.pcontents}</JournalDateilContent>
                        <JournalDateTimeDiv><FontAwesomeIcon icon={faPencil} className="icon-journal-pencil" />작성 시간 : {JournalResponse.pdatetime.split('T')[0]} &nbsp;{JournalResponse.pdatetime.split('T')[1]}</JournalDateTimeDiv>
                    </ContentDiv>
                    <UploadBtnContainer>
                        <Button2 onClick={handleCancel}><FontAwesomeIcon icon={faShare} flip="horizontal" />뒤로가기</Button2>
                        {
                            (location.state.lastSegment === 'myDetail') ? (
                                <>
                                <Button2 onClick={handleEditButton}><FontAwesomeIcon icon={faPencil} flip="horizontal" />수정하기</Button2>
                                <Button onClick={handleDeleteButton}><FontAwesomeIcon icon={faTrashCan} flip="horizontal" /></Button>
                                </>
                            ) : ""
                        }
                    </UploadBtnContainer>
                </ContentButtonOutDiv>
            </OutDivInput>
        </>
    );
}

export default JournalDetail;

const OutDivInput = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const ImageOutDiv = styled.div`
    width: 600px;
    height: 550px;
    border: 1px solid #DBDBDB;
    margin-left: 120px;
    margin-top: 20px;
    border-radius: 10px;
    background-color: white;
`

const ImagePreview = styled.img`
    width: 600px;
    height: 550px;
    border-radius: 10px;
`;
const JournalDetailTitle = styled.div`
    background-color: white;
    height: 30px;
    padding: 10px 20px;
    line-height: 30px;
    font-size: 17px;
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 2px 2px rgba(0,0,0,0.16), 1px 2px 2px rgba(0,0,0,0.23);
    margin-bottom: 30px;
`

const JournalDateilContent = styled.div`
    background-color: white;
    border-radius: 10px;
    box-shadow: 2px 2px rgba(0,0,0,0.16), 1px 2px 2px rgba(0,0,0,0.23);
    padding: 20px;
    font-size: 17px;
    height: 16.5rem;
`

const JournalDateTimeDiv = styled.div`
    margin-top: 12px;
    >svg {
        font-size: 15px;
    }
`

const UploadBtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 2px;
`

const Button = styled.button`
    width: 8%;
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

    >svg {
        margin-right: 10px;
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
    overflow: auto;
`;
const JournalContent = styled.div`
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 10px;
    overflow: auto;
`;

const ContentButtonOutDiv = styled.div`
    width: 85%;
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    margin-top: 13px;
    padding-right: 125px;
`