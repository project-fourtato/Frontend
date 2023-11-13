import React from "react";
import ExchangeSearchBar from "../components/searchbooklist/SearchBar"
import BookSearchList from "../components/searchbooklist/SearchList"

function SearchListPage(props) {
    return (
        <>
        <ExchangeSearchBar />
        <BookSearchList />
        </>
    );
}

export default SearchListPage;