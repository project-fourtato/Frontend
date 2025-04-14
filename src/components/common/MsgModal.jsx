import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { BsFillSendFill } from "react-icons/bs";
import { TiArrowBack } from "react-icons/ti";
import swal from 'sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faReply, faPaperPlane, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

function MsgModal({ setShowMsgModal, ...props }) {

    // list, detail, write
    const [msg, setMsg] = useState(props.msgName);
    const [beforeMsg, setBeforeMsg] = useState('mailbox');
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [currentMsgId, setCurrentMsgId] = useState(null);
    const [currentMsg, setCurrentMsg] = useState(null);
    const [sentMessages, setSentMessages] = useState([]); // '내가 보낸 쪽지 목록' 상태 선언
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [readMsg, setReadMsg] = useState([{
        messageId: 0,
        readState: 0
    }]);
    const profile = sessionStorage.getItem("profile");
    const p = JSON.parse(profile);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // 받은 쪽지와 보낸 쪽지를 모두 담은 URL로 데이터를 가져옵니다.
                const allMessagesUrl = 'http://localhost:8080/profile-directm/' + p.uid;
                const allMessagesResponse = await axios.get(allMessagesUrl);


                // 받은 쪽지와 보낸 쪽지를 나누어서 처리합니다.
                const received = allMessagesResponse.data.data.filter(msg => msg.recipientuid === p.uid);
                const sent = allMessagesResponse.data.data.filter(msg => msg.senderuid === p.uid);

                // 받은 쪽지와 보낸 쪽지를 각각의 상태로 설정합니다.
                setReceivedMessages(received);
                setSentMessages(sent);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMessages();
    }, [p.uid]);

    //  useEffect(() =>{
    //      console.log(sentMessages);
    //  }, [sentMessages])

    const handleClose = () => {
        setShowMsgModal(false);
    };

    const markMessageAsRead = async (messageId) => {
        try {
            // markMessageAsReadUrl를 적절히 수정해주세요.
            const markMessageAsReadUrl = `http://localhost:8080/directmessages/mcheckUpdate/${messageId}`;
            // UpdateMcheckRequest 객체를 생성하고 mcheck 값을 설정합니다.
            const updateMcheckRequest = {
                mcheck: 1 // 혹은 원하는 값으로 설정해주세요.
            };
            // 서버에 PUT 요청을 보냅니다.
            await axios.put(markMessageAsReadUrl, updateMcheckRequest);
    
            // 읽은 상태로 표시한 후, 받은 쪽지와 보낸 쪽지 데이터를 다시 가져오는 작업 진행
            const allMessagesUrl = 'http://localhost:8080/profile-directm/' + p.uid;
            const allMessagesResponse = await axios.get(allMessagesUrl);
    
            // 받은 쪽지와 보낸 쪽지를 각각의 상태로 설정
            const received = allMessagesResponse.data.data.filter(msg => msg.recipientuid === p.uid);
            const sent = allMessagesResponse.data.data.filter(msg => msg.senderuid === p.uid);
    
            // 받은 쪽지와 보낸 쪽지를 각각의 상태로 설정합니다.
            setReceivedMessages(received);
            setSentMessages(sent);
        } catch (error) {
            console.error("쪽지를 읽은 상태로 변경하는 중에 오류가 발생했습니다:", error);
        }
    };
    
    const handleDetailMsg = async (id) => {
        try {
            // 서버에 해당 쪽지를 읽은 상태로 표시하는 요청 보내기
            await markMessageAsRead(id);
    
            // 선택된 쪽지 확인
            const selectedReceivedMessage = receivedMessages.find(msg => msg.messageid === id);
            const selectedSentMessage = sentMessages.find(msg => msg.messageid === id);
    
            // 읽은 쪽지 상태 업데이트
            const updatedReadMsg = readMsg.map(msg => {
                if (msg.messageId === id) {
                    return { ...msg, readState: 1 };
                }
                return msg;
            });
            setReadMsg(updatedReadMsg);
    
            // mcheck 값을 업데이트하고 쪽지 내용 설정
            if (selectedReceivedMessage) {
                // 읽은 쪽지일 경우 서버에서 가져온 상태를 변경하여 업데이트
                const updatedReceivedMessages = receivedMessages.map(msg => {
                    if (msg.messageid === id) {
                        return { ...msg, mcheck: 1 };
                    }
                    return msg;
                });
                setReceivedMessages(updatedReceivedMessages => updatedReceivedMessages);
    
                setCurrentMsgId(selectedReceivedMessage.messageid);
                setCurrentMsg(selectedReceivedMessage);
                setBeforeMsg(msg);
                setMsg('detail');
            } else if (selectedSentMessage) {
                setCurrentMsgId(selectedSentMessage.messageid);
                setCurrentMsg(selectedSentMessage);
                setBeforeMsg(msg);
                setMsg('detail');
            }
        } catch (error) {
            console.error(error);
        }
    };
    

    const handleSendMsg = async () => {
        try {
            const messageToSend = {
                messageid: currentMsg.messageid,
                mcheck: currentMsg.mcheck,
                mcontents: content,
                mdate: currentMsg.mdate,
                mtitle: title,
                recipientuid: currentMsg.senderuid,
                senderuid: currentMsg.recipientuid
            };

            const sendMsgResponse = await axios.post('http://localhost:8080/directmessages/new', messageToSend);

            if (sendMsgResponse.status === 200) {
                swal({
                    title: "쪽지 전송 성공!",
                    text: "쪽지가 전송되었습니다.",
                    icon: "success",
                });
                setShowMsgModal(false);
            } else {
                swal({
                    title: "쪽지 전송 실패",
                    text: "쪽지를 전송하는 중에 오류가 발생했습니다.",
                    icon: "error",
                });
            }
        } catch (error) {
            console.error('쪽지 전송 중 오류가 발생했습니다:', error);
            swal({
                title: "쪽지 전송 오류",
                text: "쪽지를 전송하는 중에 오류가 발생했습니다.",
                icon: "error",
            });
        }
    };

    
    //타인서재 페이지에서 쪽지 전송 구현
    const [userId, setUserId] = useState('');
    const [nickname, setNickname] = useState('');
    const [userimageUrl, setUserimageUrl] = useState('');
    const [userMsg, setUserMsg] = useState([]);

    useEffect(()=>{
        const setData = ()=> {
            setUserId(props.userId);
            setNickname(props.nickname);
            setUserimageUrl(props.userimageUrl);
        };
        setData();
        
    },[props.userId, props.nickname, props.userimageUrl]);
    
    useEffect(()=>{        
        // console.log(props.nickname);
        // console.log(nickname);
        settingCurrentMsg();
    },[userId, nickname, userimageUrl])

    useEffect(()=>{
        // console.log(userMsg.nickname);
        // console.log(userMsg.userimageUrl);
    }, [userMsg]);

    const settingCurrentMsg = () => {
        const messageToSend = {
            mcontents: content,
            mtitle: title,
            recipientuid: userId,
            senderuid: p.uid,
            userimageUrl : userimageUrl,
            nickname : nickname
        };
        // console.log(messageToSend);
        setUserMsg(messageToSend);
    };


    const handleSendMsgInUserPage = async () => {
        try {
            const messageToSend = {
                mcontents: content,
                mtitle: title,
                recipientuid: userId,
                senderuid: p.uid,
                userimageUrl : userimageUrl,
                nickname : nickname
            };
            setCurrentMsg(messageToSend);

            const sendMsgResponse = await axios.post('http://localhost:8080/directmessages/new', messageToSend);

            if (sendMsgResponse.status === 200) {
                swal({
                    title: "쪽지 전송 성공!",
                    text: "쪽지가 전송되었습니다.",
                    icon: "success",
                });
                setShowMsgModal(false);
            } else {
                swal({
                    title: "쪽지 전송 실패",
                    text: "쪽지를 전송하는 중에 오류가 발생했습니다.",
                    icon: "error",
                });
            }
        } catch (error) {
            console.error('쪽지 전송 중 오류가 발생했습니다:', error);
            swal({
                title: "쪽지 전송 오류",
                text: "쪽지를 전송하는 중에 오류가 발생했습니다.",
                icon: "error",
            });
        }
    };



    const handleDelete = async (id, event) => {
        event.stopPropagation();
        try {
            const deleteMsgResponse = await axios.post(`http://localhost:8080/directmessages/messageid=${id}/delete`);
    
            if (deleteMsgResponse.status === 200) {
                swal({
                    title: "쪽지 삭제",
                    text: "쪽지가 삭제되었습니다.",
                    icon: "success",
                });
    
                // 삭제가 성공하면 UI에서 해당 쪽지를 지웁니다.
                setReceivedMessages(receivedMessages.filter(msg => msg.messageid !== id));
                setSentMessages(sentMessages.filter(msg => msg.messageid !== id));
            } else {
                swal({
                    title: "쪽지 삭제 실패",
                    text: "쪽지를 삭제하는 중에 오류가 발생했습니다.",
                    icon: "error",
                });
            }
        } catch (error) {
            console.error('쪽지 삭제 중 오류가 발생했습니다:', error);
            swal({
                title: "쪽지 삭제 오류",
                text: "쪽지를 삭제하는 중에 오류가 발생했습니다.",
                icon: "error",
            });
        }
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
                    // 쪽지 조회할 때 보이는 타이틀, 그냥 정말 타이틀 그 잡채
                    msg === 'mailbox' && (<Title>받은 쪽지</Title>)
                }
                {
                    msg === 'sendbox' && (<Title>보낸 쪽지</Title>)
                }
                {
                    msg === 'detail' && (<Title>쪽지 내용</Title>)
                }
                {
                    msg === 'write' && (<Title>쪽지 보내기</Title>)
                }
                <MessageList>
                    { // 이게 받은 쪽지, 보낸 쪽지 버튼
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
                    { //받은쪽지 목록 조회
                        msg === 'mailbox' && Array.isArray(receivedMessages) && receivedMessages.map((msg) => {
                            const isRead = msg.mcheck === 1;

                            return (
                                <MessageItem
                                    key={msg.uid}
                                    onClick={() => { handleDetailMsg(msg.messageid); }}
                                    readState={isRead ? 1 : 0} // 읽은 쪽지일 때와 안 읽은 쪽지일 때 스타일을 다르게 적용
                                >
                                    <MessageImgContainer>
                                        <img src={msg.userimageUrl} alt="User" />
                                    </MessageImgContainer>

                                    <MessageContentsContainer>
                                        <UpContainer>
                                            <MessageTitle><span>{msg.nickname}</span> 님</MessageTitle>
                                            <FontAwesomeIcon icon={faTrashCan} onClick={(event) => handleDelete(msg.messageid, event)} />
                                        </UpContainer>

                                        <BottomContainer>
                                            <MessageContents>{msg.mtitle}</MessageContents>
                                            <MessageDate>{msg.mdate.split('T')[0]} &nbsp; {msg.mdate.split('T')[1]}</MessageDate>
                                        </BottomContainer>
                                    </MessageContentsContainer>
                                </MessageItem>
                            );
                        })}

                    { //보낸쪽지 목록 조회 
                    msg === 'sendbox' && Array.isArray(sentMessages) && sentMessages.map((msgsend) => {
                        const isRead = msg.mcheck === 1;

                        return (
                            <MessageItem
                                key={msgsend.uid}
                                onClick={() => { handleDetailMsg(msgsend.messageid); }}
                                readState={isRead ? 1 : 0} 
                            >
                                <MessageImgContainer>
                                    <img src={msgsend.userimageUrl} alt="User" />
                                </MessageImgContainer>

                                <MessageContentsContainer>
                                    <UpContainer>
                                        <MessageTitle><span>{msgsend.nickname}</span> 님</MessageTitle>
                                        <FontAwesomeIcon icon={faTrashCan} onClick={(event) => handleDelete(msgsend.messageid, event)} />
                                    </UpContainer>

                                    <BottomContainer>
                                        <MessageContents>{msgsend.mtitle}</MessageContents>
                                        <MessageDate>{msgsend.mdate.split('T')[0]} &nbsp; {msgsend.mdate.split('T')[1]}</MessageDate>
                                    </BottomContainer>
                                </MessageContentsContainer>
                            </MessageItem>
                        );
                    })}

                </MessageList>

                { //쪽지 내용 조회
                    msg === 'detail' && currentMsg && (
                        <>
                            <DetailContainer>
                                <DetailMsgImgContainer>
                                    <img src={currentMsg.userimageUrl} alt="Message" />
                                    <MessageDetilTitle><span>{currentMsg.nickname}</span> 님의 쪽지</MessageDetilTitle>
                                </DetailMsgImgContainer>

                                <MessageDetailContents>{currentMsg.mtitle}</MessageDetailContents>

                                <MainTextMsg>{currentMsg.mcontents}</MainTextMsg>

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

                { // 쪽지 작성
                    msg === 'write' && currentMsg && (
                        <>
                            <DetailContainer>
                                <DetailMsgImgContainer>
                                    <img src={currentMsg.userimageUrl} alt="Message" />
                                    <MessageDetilTitle><span>{currentMsg.nickname}</span> 님에게</MessageDetilTitle>
                                </DetailMsgImgContainer>

                                <WriteContainer>
                                    <WriteTitle>제목</WriteTitle>
                                    <WriteInput
                                        type="text"
                                        placeholder="제목을 입력해주세요."
                                        spellCheck="false"
                                        value={title} // 상태와 input 값을 연결
                                        onChange={(e) => setTitle(e.target.value)} // 값이 변경될 때 상태 업데이트
                                    />
                                </WriteContainer>

                                <WriteContainer>
                                    <WriteTitle>내용</WriteTitle>
                                    <WriteTextarea
                                        placeholder="내용을 입력해주세요."
                                        spellCheck="false"
                                        value={content} // 상태와 textarea 값을 연결
                                        onChange={(e) => setContent(e.target.value)} // 값이 변경될 때 상태 업데이트
                                    />
                                </WriteContainer>

                                <ButtonContainer>
                                    <Button onClick={() => setMsg('mailbox')}>전송 취소</Button>
                                    <Button onClick={handleSendMsg}><StyledSendIcon />쪽지 전송</Button>
                                </ButtonContainer>
                            </DetailContainer>
                        </>
                    )
                }

                { // 타인에게 쪽지 작성
                    msg === 'writeToUser' && userMsg && (
                        <>
                            <DetailContainer>
                                <DetailMsgImgContainer>
                                    <img src={userMsg.userimageUrl} alt="Message" />
                                    <MessageDetilTitle><span>{userMsg.nickname}</span> 님에게</MessageDetilTitle>
                                </DetailMsgImgContainer>

                                <WriteContainer>
                                    <WriteTitle>제목</WriteTitle>
                                    <WriteInput
                                        type="text"
                                        placeholder="제목을 입력해주세요."
                                        spellCheck="false"
                                        value={title} // 상태와 input 값을 연결
                                        onChange={(e) => setTitle(e.target.value)} // 값이 변경될 때 상태 업데이트
                                    />
                                </WriteContainer>

                                <WriteContainer>
                                    <WriteTitle>내용</WriteTitle>
                                    <WriteTextarea
                                        placeholder="내용을 입력해주세요."
                                        spellCheck="false"
                                        value={content} // 상태와 textarea 값을 연결
                                        onChange={(e) => setContent(e.target.value)} // 값이 변경될 때 상태 업데이트
                                    />
                                </WriteContainer>

                                <ButtonContainer>
                                    <Button onClick={() => handleClose()}>전송 취소</Button>
                                    <Button onClick={handleSendMsgInUserPage}><StyledSendIcon />쪽지 전송</Button>
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
    opacity: ${(props) => (props.readState === 1 ? '0.6' : '1')}; 예시: 읽은 쪽지는 투명도를 줄입니다.
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
    max-width : 300px;
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
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
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    margin-left : 10px;
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
    word-wrap:break-word; 
`

const MessageDetailContents = styled.p`
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    border-bottom: 1px solid #B8B8B8;
    padding: 5px 10px;
    word-wrap:break-word; 
    
`

const MainTextMsg = styled.p`
    
    overflow-x: hidden;
    max-height : 200px;
    overflow-y: scroll;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 155%;
    margin-top: 10px;
    padding: 10px; 
    word-wrap:break-word; 
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