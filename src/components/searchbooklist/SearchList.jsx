import { React, useState } from 'react';
import styled from 'styled-components';
import searchIcon from "../../assets/searchIcon.png";
import {regions, cities} from '../../data/regiondata';
import {BsCaretDownFill} from "react-icons/bs";
import { ExchangeBookList } from "../../data/booklistdata"
import { useNavigate } from "react-router-dom";

function BookSearchList(props) {
    const navigate = useNavigate();

    const goExchangeDetailPage = (id, title) => {
          navigate(`/exchange/${id}`, {
            state: { title }
          });
    }

    return (
        <BookListOutDiv>
            {ExchangeBookList.map((book) => {
                return (
                    <BookInfoOutDiv onClick={() => goExchangeDetailPage(book.id, book.title)}>
                        <BookTitle>{book.title}</BookTitle>
                        <div>
                        <BookAuthor>{book.author}</BookAuthor>
                        <BookPublisher>{book.publisher}</BookPublisher>
                        </div>
                    </BookInfoOutDiv>
                )
            })}
        </BookListOutDiv>
    )
}

export default BookSearchList;

const BookListOutDiv = styled.div`
    background-color: white;
    width: 50%;
    margin: 0 auto;
    border-radius: 45px;
    padding: 50px 70px;
    box-shadow: 3px 8px 8px 3px rgba(0,0,0,0.16), 2px 3px 6px rgba(0,0,0,0.23);
`

const BookInfoOutDiv = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #E8E8E8;
    padding: 20px 20px;
    &:hover {
        background-color: #E8E8E8;
        border-radius: 10px;
        cursor: pointer;
    }
`

const BookTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
    line-height: 210%;
`
const BookAuthor = styled.div`
    font-size: 16px;
    margin-bottom: 5px;
`
const BookPublisher = styled.div`
    font-size: 16px;
`