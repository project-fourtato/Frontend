import React from 'react';
import styled from 'styled-components';
import {AiOutlineClose} from "react-icons/ai";
import {FaExclamationCircle} from "react-icons/fa";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState } from '../../recoil/atom';

function SayGoodbyeModal({setShowModal}) {

    const [isLogin, setIsLogin] = useRecoilState(loginState);
    const navigate = useNavigate();

    const handleGoodbye = () => {
        swal({
          title: "회원탈퇴가 완료되었습니다.",
          icon: "success",
          buttons: "확인",
        }).then(() => {
          setIsLogin({ isLogin: false });
          navigate("/");
        })
      }

    const handleClose = () => {
        setShowModal(false);
      };
    

    return (
        <ModalBackground>
        <ModalContainer>
        <CloseButton onClick={handleClose}>
          <AiOutlineClose />
          </CloseButton>
            <TitleContainer>
            <FaExclamationCircle />
            <Title>BOOKER, 정말 회원탈퇴 하시려구요..?</Title>
            </TitleContainer>
            <SubTextContainer>
            <SubText>BOOKER 정말 좋은데,,</SubText> 
            <SubText>그래도..! 탈퇴하시려면 해당 문구를 따라 적어주세요!</SubText>
            </SubTextContainer>
            <GoodbyeBoxContainer>
            <p>저는 BOOKER를 탈퇴하겠습니다.</p>
            </GoodbyeBoxContainer>
            <InputBox 
                type='text'
                placeholder="해당 문구 입력"
            />
            <ButtonContainer>
            <RemoveButton onClick={handleGoodbye}>회원 탈퇴</RemoveButton>
            </ButtonContainer>
        </ModalContainer>
        </ModalBackground>
    );
}

export default SayGoodbyeModal;

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
    display: flex;
    flex-direction: column;
    padding: 50px 100px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1001; 
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    width: 500px;
    > svg {
        font-size: 30px;
        margin-right: 20px;
    }
`;

const Title = styled.h2`
    color: #000;
font-weight: bold;
font-family: Inter;
font-size: 24px;
margin-top: 5px;
`;

const SubTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    width: 500px;
    margin: 50px 0 20px;
`;

const SubText = styled.p`
color: #000;
font-family: Inter;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: normal;
`;

const GoodbyeBoxContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 29px;
border: 1px solid #989898;
background: #FFF;
padding: 20px 30px;
margin-bottom: 30px;
>p{
    color: #000;
font-family: Inter;
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: normal;
}
`;

const InputBox = styled.input`
    width: 100%;
    height: 50px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding-left: 20px;
    font-size: 18px;
    box-sizing  : border-box;
    margin-bottom: 20px;
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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const RemoveButton = styled.button`
border-radius: 8px;
border: 1px solid #CACACA;
background: #DBE8D9;
color: #000;
font-family: Inter;
font-style: normal;
font-weight: 600;
line-height: normal;
width: 160px;
height: 50px;
font-size: 18px;
cursor: pointer;
&:hover {
    background: #344a39;
    color: #fff;
  }
`;
