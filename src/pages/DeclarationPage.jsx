import React, { useState } from 'react';
import styled from 'styled-components';
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
function DeclarationPage(props) {

    const [memo, setMemo] = useState("");
    const navigate = useNavigate();
    const handleSubmit = () => {
        if (!memo.trim()) {
            swal("경고", "신고 사유를 입력해주세요.", "warning");
            return;
        }

        if (memo.length > 800) {
            swal("경고", "신고 내용은 800자를 초과할 수 없습니다.", "warning");
            return;
        }

        swal({
            title: "신고가 접수되었습니다.",
            icon: "success",
            buttons: "확인",
        }).then(() => {
            setMemo("");
            navigate("/");
        });
    };

    return (
        <Container>
            <Title>신고하기</Title>
            <Textarea
                value={memo}
                onChange={e => setMemo(e.target.value)}
                placeholder="신고 사유를 입력하세요."
            />
            <SubmitButton onClick={handleSubmit}>신고 제출</SubmitButton>
        </Container>
    );
}

export default DeclarationPage;

const Container = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
`;

const Title = styled.h1`
    font-size: 25px;
    font-weight: bold;
    margin-left: 7px;
    margin-bottom: 20px;
    margin-top: 20px;
`;


const Textarea = styled.textarea`
    width: 100%;
    box-sizing: border-box;
    height: 300px;
    padding: 10px;
    font-size: 14px;
    font-style: normal;
    margin-top: 8px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    resize: vertical;
`;

const SubmitButton = styled.button`
    color: #fff;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 70%;
    letter-spacing: -0.17px;
    display: block;
    width: 100%;
    padding: 20px;
    margin-top: 20px;
    background-color: #5f749f;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        background-color: #4e688a;
    }
`;
