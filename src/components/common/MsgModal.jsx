import React,{useState} from 'react';
import styled from 'styled-components';
import {AiOutlineClose} from "react-icons/ai";
import {msgList} from '../../data/msgdata';
import {AiOutlineDelete} from "react-icons/ai";
import {BsFillSendFill} from "react-icons/bs";
import {TiArrowBack} from "react-icons/ti";
import swal from 'sweetalert';
function MsgModal({setShowMsgModal}) {
    
    // list, detail, write
    const [msg, setMsg] = useState('list')
    const [currentMsgId, setCurrentMsgId] = useState(null);
    const [currentMsg, setCurrentMsg] = useState(null);

    const handleClose = () => {
        setShowMsgModal(false);
      };
    
      const handleDetailMsg = (id) => {
          const selectedMessage = msgList.find(msg => msg.id === id);
            setCurrentMsgId(id); 
            setCurrentMsg(selectedMessage); 
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
                        title:"쪽지가 전송되었습니다!", 
                        icon: "success",
                    });
                    setShowMsgModal(false)
                } else {
                    swal({
                        title:"쪽지 전송이 취소되었습니다.",
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
                    title:"쪽지가 삭제되었습니다!", 
                    icon: "success",
                });
            } else {
                swal({
                    title:"쪽지 삭제가 취소되었습니다.",
                    icon: "error",
                });
            }
            }
            );
    }

    return (
        <ModalBackground>
        <ModalContainer>
        <CloseButton onClick={handleClose}>
          <AiOutlineClose />
          </CloseButton>
            {
                msg==='list' && (<Title>쪽지함</Title>)
            }
            {
                msg==='detail' && (<Title>도착한 쪽지</Title>)
            }
            {
                msg==='write' && (<Title>쪽지 보내기</Title>)
            }
            <MessageList>
               {
                msg==='list' && msgList.map((msg) => {
                          return (
                        <MessageItem key={msg.id} onClick={()=>handleDetailMsg(msg.id)}>
                            <MessageImgContainer>
                                <img src={msg.img}/>
                            </MessageImgContainer>


                            <MessageContentsContainer>
                                <div>
                            <MessageTitle>{msg.title} 님</MessageTitle>
                            <MessageContents>{msg.contents}</MessageContents>
                                </div>

                                <RightContainer>
                                     <DeletStyledIcon onClick={(event)=>handleDelete(msg.id,event)}/>
                                    <MessageDate>{msg.date}</MessageDate>
                                </RightContainer>

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
          <img src={currentMsg.img} alt="Message"/>
          <MessageDetilTitle>{currentMsg.title} 님의 쪽지</MessageDetilTitle>
        </DetailMsgImgContainer>

            <MessageDetailContents>{currentMsg.contents}</MessageDetailContents>
  
        <MainTextMsg>{currentMsg.maintext}</MainTextMsg>

        <ButtonContainer>
            <Button onClick={() => setMsg('list')}><StyledBackIcon/>목록 리스트</Button>
            <Button onClick={() => setMsg('write')}><StyledSendIcon/>답장 전송</Button>
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
          <img src={currentMsg.img} alt="Message"/>
          <MessageDetilTitle>{currentMsg.title} 님에게</MessageDetilTitle>
        </DetailMsgImgContainer>

        <WriteContainer>
            <WriteTitle>제목</WriteTitle>
            <WriteInput type="text" placeholder="제목을 입력해주세요."/>
        </WriteContainer>

        <WriteContainer>
            <WriteTitle>내용</WriteTitle>
            <WriteTextarea placeholder="내용을 입력해주세요."/>
        </WriteContainer>


        <ButtonContainer>
            <Button onClick={() => setMsg('list')}>전송 취소</Button>
            <Button onClick={handleSendMsg}><StyledSendIcon/>쪽지 전송</Button>
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
    margin-bottom: 40px;
    text-align : center;
`;

const MessageList = styled.ul`
    list-style: none;
    padding: 0;
`;

const MessageItem = styled.li`
    padding: 20px 10px;
    border-bottom: 2px solid #e0e0e0;
    display: flex;
    align-items: center;
    &:last-child {
        border-bottom: none;
    }
    &:hover {
        background-color: #f5f5f5;
    }
    cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute; 
  top: 10px;  
  right: 10px; 
  border: none;
  background: none;
  font-size: 24px; 
  cursor: pointer;
`;

const MessageTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const MessageContents = styled.div`
    font-size: 14px;
    /* margin-bottom: 10px; */
`;

const MessageDate = styled.div`
    font-size: 16px;
    color: #828282;
`;

const MessageImgContainer = styled.div`
    margin-right: 20px;
`;

const MessageContentsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width   : 100%;
`;

const RightContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items:flex-end;
    /* background-color: red; */
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
    margin-bottom: 30px;
>img{
    width: 70px;
    height: 70px;
    object-fit: cover;
}
`

const MessageDetilTitle = styled.div`
 font-size: 22px;
 font-family: Inter;
font-style: normal;
font-weight: 700;
line-height: 24px;
letter-spacing: 0.44px;
margin-left: 20px;
`

const MessageDetailContents = styled.p`
color: #000;
font-family: Inter;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 50px;
border-bottom: 1px solid #B8B8B8;
`

const MainTextMsg = styled.p`
font-family: Inter;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 140%;
margin-top: 40px;
`

const ButtonContainer = styled.div`
display: flex;
justify-content: flex-end;
margin-top: 30px;
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
    height: 50px;
    background-color: #DBE8D9;
    border-radius: 10px;
    border: none;
    margin-top: 30px;
    margin-right: 20px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    color: #000;
    &:hover {
        background-color: #344a39;
        color: #fff;
    }
`

// write


const WriteContainer = styled.div`
display: flex;
align-items: flex-start;
justify-content: space-between;
margin-bottom: 30px;
`
    
const WriteTitle = styled.h2`
 font-size: 22px;
 font-family: Inter;
font-style: normal;
font-weight: 700;
line-height: 24px;
letter-spacing: 0.44px;
margin-left: 20px;
margin-top: 10px;
`

const WriteInput = styled.input`
box-sizing  : border-box;
width: 85%;
height: 50px;
border: 1px solid #B8B8B8;
border-radius: 10px;
padding-left: 20px;
`

const WriteTextarea = styled.textarea`
box-sizing : border-box;
width: 85%;
height: 300px;
border: 1px solid #B8B8B8;
border-radius: 10px;
padding-left: 20px;
padding-top: 20px;
`
