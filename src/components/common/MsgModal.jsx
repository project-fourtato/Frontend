import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from "react-icons/ai";
import { msgList } from '../../data/msgdata';
import { msgsendList } from "../../data/msgsenddata";
import { AiOutlineDelete } from "react-icons/ai";
import { BsFillSendFill } from "react-icons/bs";
import { TiArrowBack } from "react-icons/ti";
import swal from 'sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faReply, faPaperPlane, faEnvelope } from "@fortawesome/free-solid-svg-icons";

function MsgModal({ setShowMsgModal }) {

    // list, detail, write
    const [msg, setMsg] = useState('mailbox');
    const [beforeMsg, setBeforeMsg] = useState('mailbox');
    const [currentMsgId, setCurrentMsgId] = useState(null);
    const [currentMsg, setCurrentMsg] = useState(null);
    const [readMsg, setReadMsg] = useState([{
        messageId: 0,
        readState: 0
    }]);

    const handleClose = () => {
        setShowMsgModal(false);
    };

    const handleDetailMsg = (id) => {
        const selectedMessage = msgList.find(msg => msg.id === id);
        setCurrentMsgId(id);
        setCurrentMsg(selectedMessage);
        setBeforeMsg(msg);
        setMsg('detail');
    }

    const handleSendMsg = () => {
        swal({
            title: "쪽지를 전송하시겠습니까?",
            icon: "warning",
            buttons: ["취소", "전송"],
        }).then((willSend) => {
            if (willSend) {
                swal({
                    title: "쪽지 전송 성공!",
                    text: "쪽지가 전송되었습니다.",
                    icon: "success",
                });
                setShowMsgModal(false)
            } else {
                swal({
                    title: "쪽지 전송 취소",
                    text: "쪽지 전송이 취소되었습니다.",
                    icon: "error",
                });
            }
        });
    }

    const handleDelete = (id, event) => {
        event.stopPropagation();
        console.log('삭제', id)
        swal({
            title: "쪽지를 삭제하시겠습니까?",
            icon: "warning",
            buttons: ["취소", "삭제"],
        }).then((willDelete) => {
            if (willDelete) {
                swal({
                    title: "쪽지 삭제",
                    text: "쪽지가 삭제되었습니다.",
                    icon: "success",
                });
            } else {
                swal({
                    title: "쪽지 삭제 취소",
                    text: "쪽지 삭제가 취소되었습니다.",
                    icon: "error",
                });
            }
        }
        );
    }

    /*const handleReadMsg = (msgId, readState) => { /* readState 상태 변경 함수 -> 함수에서 무한루프 발생 */
    /*setReadMsg(readMsg => ({ ...readMsg, readState: 1 }));
}*/
    return (
        <ModalBackground>
            <ModalContainer>
                <CloseButton onClick={handleClose}>
                    <AiOutlineClose />
                </CloseButton>
                {
                    msg === 'mailbox' && (<Title>받은 쪽지</Title>)
                }
                {
                    msg === 'sendbox' && (<Title>보낸 쪽지</Title>)
                }
                {
                    msg === 'detail' && (<Title>도착한 쪽지</Title>)
                }
                {
                    msg === 'write' && (<Title>쪽지 보내기</Title>)
                }
                <MessageList>
                    {
                        ((msg === 'mailbox') || (msg === 'sendbox')) && (
                            <OptionShowMessageList>
                                <MailboxOutDiv onClick={() => setMsg('mailbox')}>
                                    <FontAwesomeIcon icon={faEnvelope} /><span>받은 쪽지</span>
                                </MailboxOutDiv>
                                <SendboxOutDiv onClick={() => setMsg('sendbox')}>
                                    <FontAwesomeIcon icon={faPaperPlane} /><span>보낸 쪽지</span>
                                </SendboxOutDiv>
                            </OptionShowMessageList>
                        )
                    }
                    {
                        msg === 'mailbox' && msgList.map((msg) => {
                            return (
                                <MessageItem key={msg.id} onClick={() => { handleDetailMsg(msg.id); }} readState={readMsg}>
                                    <MessageImgContainer>
                                        <img src={msg.img} />
                                    </MessageImgContainer>


                                    <MessageContentsContainer>
                                        <UpContainer>
                                            <MessageTitle><span>{msg.title}</span> 님</MessageTitle>
                                            <FontAwesomeIcon icon={faTrashCan} onClick={(event) => handleDelete(msg.id, event)} />
                                        </UpContainer>

                                        <BottomContainer>
                                            <MessageContents>{msg.contents}</MessageContents>
                                            <MessageDate>{msg.date}</MessageDate>
                                        </BottomContainer>

                                    </MessageContentsContainer>
                                </MessageItem>
                            )
                        })
                    }
                    {
                        msg === 'sendbox' && msgsendList.map((msgsend) => {
                            return (
                                <MessageItem key={msgsend.id} onClick={() => { handleDetailMsg(msgsend.id); }} readState={readMsg}>
                                    <MessageImgContainer>
                                        <img src={msgsend.img} />
                                    </MessageImgContainer>


                                    <MessageContentsContainer>
                                        <UpContainer>
                                            <MessageTitle><span>{msgsend.title}</span> 님</MessageTitle>
                                            <FontAwesomeIcon icon={faTrashCan} onClick={(event) => handleDelete(msgsend.id, event)} />
                                        </UpContainer>

                                        <BottomContainer>
                                            <MessageContents>{msgsend.contents}</MessageContents>
                                            <MessageDate>{msgsend.date}</MessageDate>
                                        </BottomContainer>

                                    </MessageContentsContainer>
                                </MessageItem>
                            )
                        })
                    }
                </MessageList>

                {
                    msg === 'detail' && currentMsg && (
                        <>
                            <DetailContainer>
                                <DetailMsgImgContainer>
                                    <img src={currentMsg.img} alt="Message" />
                                    <MessageDetilTitle><span>{currentMsg.title}</span> 님의 쪽지</MessageDetilTitle>
                                </DetailMsgImgContainer>

                                <MessageDetailContents>{currentMsg.contents}</MessageDetailContents>

                                <MainTextMsg>{currentMsg.maintext}</MainTextMsg>

                                <ButtonContainer>
                                    {
                                        beforeMsg === 'mailbox' && (
                                            <>
                                            <Button onClick={() => setMsg('mailbox')}><FontAwesomeIcon icon={faReply} />목록 리스트</Button>
                                            <Button onClick={() => setMsg('write')}><FontAwesomeIcon icon={faPaperPlane} />답장 전송</Button>
                                            </>
                                        )
                                    }
                                    {
                                        beforeMsg === 'sendbox' && (
                                            <Button onClick={() => setMsg('sendbox')}><FontAwesomeIcon icon={faReply} />목록 리스트</Button>
                                        )
                                    }
                                </ButtonContainer>
                            </DetailContainer>
                        </>
                    )
                }

                {
                    msg === 'write' && currentMsg && (
                        <>
                            <DetailContainer>
                                <DetailMsgImgContainer>
                                    <img src={currentMsg.img} alt="Message" />
                                    <MessageDetilTitle><span>{currentMsg.title}</span> 님에게</MessageDetilTitle>
                                </DetailMsgImgContainer>

                                <WriteContainer>
                                    <WriteTitle>제목</WriteTitle>
                                    <WriteInput type="text" placeholder="제목을 입력해주세요." spellcheck="false" />
                                </WriteContainer>

                                <WriteContainer>
                                    <WriteTitle>내용</WriteTitle>
                                    <WriteTextarea placeholder="내용을 입력해주세요." spellcheck="false" />
                                </WriteContainer>


                                <ButtonContainer>
                                    <Button onClick={() => setMsg('mailbox')}>전송 취소</Button>
                                    <Button onClick={handleSendMsg}><StyledSendIcon />쪽지 전송</Button>
                                </ButtonContainer>
                            </DetailContainer>
                        </>
                    )
                }
            </ModalContainer>
        </ModalBackground>
    );
}

export default MsgModal;

const ModalBackground = styled.div`
    position: fixed; 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);  
    display: flex;  
    justify-content: center;  
    align-items: center;  
    z-index: 1000; 
`;


const ModalContainer = styled.div`
position: relative;
    width: 600px;
    /* max-width: 90%; */
    padding: 50px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1001; 
`;

const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 25px;
    text-align : center;
`;

const OptionShowMessageList = styled.div`
    display: flex;
    height: 20px;
    line-height: 20px;
    margin-bottom: 10px;
    margin-left: 10px;
    font-weight: 600;
    svg {
        margin-right: 8px;
    }
    span {
        margin-right: 16px;
    }
`

const MailboxOutDiv = styled.div`
    &:hover {
        color: #7283A6;
        cursor: pointer;
        >span {
            padding-bottom: 2px;
            border-bottom: 1px solid #7283A6;
        }
    }
`

const SendboxOutDiv = styled.div`
    &:hover {
        color: #7283A6;
        cursor: pointer;
        >span {
            padding-bottom: 2px;
            border-bottom: 1px solid #7283A6;
        }
    }
`

const MessageList = styled.ul`
    list-style: none;
    padding: 0;
`;

const MessageItem = styled.li`
    padding: 20px 20px;
    border-bottom: 2px solid #e0e0e0;
    display: flex;
    align-items: center;
    div {
        font-weight: bold;
    }
    &:last-child {
        border-bottom: none;
    }
    &:hover {
        background-color: #f5f5f5;
        border-radius: 8px;
    }
    cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute; 
  top: 30px;  
  right: 40px; 
  border: none;
  background: none;
  font-size: 24px; 
  cursor: pointer;
`;

const MessageTitle = styled.div`
    font-size: 19px;
    font-weight: 550;
    margin-bottom: 10px;
    >span {
        color: #7283A6;
    }
`;

const MessageContents = styled.div`
    font-size: 15px;
    /* margin-bottom: 10px; */
`;

const MessageDate = styled.div`
    font-size: 13px;
    color: #828282;
`;

const MessageImgContainer = styled.div`
    margin-right: 20px;
    >img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
`;

const MessageContentsContainer = styled.div`
    width   : 100%;
`;

const UpContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const BottomContainer = styled.div`
    display: flex;
    justify-content: space-between;
    >svg {
        margin-bottom: 10px;
        font-size: 25px;
        cursor: pointer;
        z-index:10;
    }
`


const DeletStyledIcon = styled(AiOutlineDelete)`
    margin-bottom: 10px;
    font-size: 20px;
    cursor: pointer;
    z-index:10;
`

// detail

const DetailContainer = styled.div`
display: flex;
flex-direction: column;
`

const DetailMsgImgContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    >img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
    }
`

const MessageDetilTitle = styled.div`
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.44px;
    margin-left: 20px;
    >span {
        color: #7283A6;
    }
`

const MessageDetailContents = styled.p`
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 50px;
    border-bottom: 1px solid #B8B8B8;
    padding: 5px 10px;
`

const MainTextMsg = styled.p`
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 155%;
    margin-top: 10px;
    padding: 10px; 
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`

const StyledBackIcon = styled(TiArrowBack)`
    margin-right: 12px;
    font-size: 24px;
`


const StyledSendIcon = styled(BsFillSendFill)`
  margin-right: 14px;
    font-size: 18px;
`

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 47px;
    background-color: #7283A6;
    border-radius: 10px;
    border: none;
    margin-left: 20px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    color: white;
    letter-spacing: 0.9px;
    &:hover {
        background-color: white;
        color: black;
        border: 1px solid #7283A6;
    }
    >svg {
        margin-right: 10px;
    }
`

// write


const WriteContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 20px;
`

const WriteTitle = styled.h2`
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.44px;
    margin-left: 20px;
    margin-top: 5px;
`

const WriteInput = styled.input`
    width: 80%;
    height: 45px;
    border: 1px solid #B8B8B8;
    border-radius: 10px;
    padding: 0 20px;
    font-size: 15px;
`

const WriteTextarea = styled.textarea`
width: 80%;
height: 200px;
border: 1px solid #B8B8B8;
border-radius: 10px;
padding: 20px;
resize: none;
font-family: "Nanum";
line-height: 130%;
font-size: 15px;
`
