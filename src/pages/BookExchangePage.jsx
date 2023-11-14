import React from 'react';
import styled from 'styled-components';
import ExchangBookCard from '../components/exchangebook/ExchangBookCard';
import SearchUserCard from '../components/exchangebook/SearchUserCard';
import LibrarySearchBar from '../components/exchangebook/LibrarySearchBar';

function BookExchangePage(props) {
  return (
    <PageContainer>
      <LibrarySearchBar />
    </PageContainer>
  );
}

export default BookExchangePage;


const PageContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
  margin-bottom: 80px;
`;

const PageOutDiv = styled.div`
  background-color: white;
  padding: 70px 80px;
  border-radius: 45px;
  box-shadow: 3px 8px 8px 3px rgba(0,0,0,0.16), 2px 3px 6px rgba(0,0,0,0.23);
  width: 60%;
`

