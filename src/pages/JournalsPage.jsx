import React from "react";
import styled from "styled-components";
import JournalContentCard from "../components/journals/JournalContentCard";
import ImageUploadCard from "../components/journals/ImageUploadCard";


function JournalsUploadPage(props) {
    return (
        <Container>
            <JournalContentCard></JournalContentCard>
        </Container>
    )
}

export default JournalsUploadPage;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    weight: 100%;
    height: 100%;
`