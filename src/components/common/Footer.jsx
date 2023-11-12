import React, { useState } from "react";
import {styled, createGlobalStyle} from "styled-components";

function Footer() {
    return (
        <FooterDiv>&copy; fourtato</FooterDiv>
    );
}

export default Footer;

const FooterDiv = styled.div`
    width: 100%;
    height: 30px;
    background-color: white;
`