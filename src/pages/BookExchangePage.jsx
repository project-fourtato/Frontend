import React from 'react';
import styled from 'styled-components';
import ExchangBookCard from '../components/exchangebook/ExchangBookCard';
import SearchUserCard from '../components/exchangebook/SearchUserCard';
import LibrarySearchBar from '../components/exchangebook/LibrarySearchBar';

function BookExchangePage(props) {
  return (
    <PageContainer>
      <LibrarySearchBar />
        <ExchangBookCard/>
        <SearchUserCard />
    </PageContainer>
  );
}

export default BookExchangePage;


const PageContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

