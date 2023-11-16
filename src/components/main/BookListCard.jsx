import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { mainBookList } from "../../data/maindata";
import downarrow from "../../assets/downarrow.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader, faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";
import Session from 'react-session-api';
import axios from "axios";
import userimage from "../../assets/searchimg/su1.png";
import "../../assets/dropdown.css";
import { useNavigate } from "react-router-dom";



function BookListCard(props) {
  
  const profile = sessionStorage.getItem("profile");
  const p = JSON.parse(profile);

  const [showDropdown, setShowDropdown] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [bookListResponse, setBookListResponse] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:8080/booksList/' + p.uid;
        const response = await axios.get(url);
        const responseData = JSON.parse(response.request.responseText).data;
        setBookListResponse(responseData);
        // console.log(responseData);
        
      } catch(error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  const Dropdown = props => {
    const [visibilityAnimation, setVisibilityAnimation] = React.useState(false);
    const [repeat, setRepeat] = React.useState(null);

    React.useEffect(() => {                                 {/* ← add */}
        if (props.visibility) {
            clearTimeout(repeat);
            setRepeat(null);
            setVisibilityAnimation(true);
        } else {
            setTimeout(() => {
                setVisibilityAnimation(false);
            }, 400);
        }
    }, [props.visibility]);

    return (
        <article className={`components-dropdown ${props.visibility ? 'slide-fade-in-dropdown' : 'slide-fade-out-dropdown'}`}>
            { visibilityAnimation && props.children }       {/* ← modify */}
        </article>
    )
  };
  const DropDownApp = ({ profiles }) => {
    const [dropdownVisibility, setDropdownVisibility] = useState(false);
  
    const navigate = useNavigate();
    const studyPage = (uid) => {
      console.log(uid);
      navigate("/studyPage/"+uid);
    };
    
    return (
      <div>
        <div className="app" onClick={() => setDropdownVisibility(!dropdownVisibility)}>
          {dropdownVisibility ? '나와 같이 읽는 사람' : '나와 같이 읽는 사람'}
          {dropdownVisibility ? (
            <FontAwesomeIcon className="icon-dropdown" icon={faCaretUp} />
          ) : (
            <FontAwesomeIcon className="icon-dropdown" icon={faCaretDown} />
          )}
        </div>
        <Dropdown visibility={dropdownVisibility}>
          <ul>
            {profiles.map((user, index) => (
              <li key={index} onClick={() => studyPage(user.uid)}>
                <img src={user.useriamgeUrl} alt="user" />
                <p>{user.nickname}</p>
              </li>
            ))}
          </ul>
        </Dropdown>
      </div>
    );
  };
  
  
  const toggleDropdown = (id) => {
    if (activeDropdownId === id) {
      setActiveDropdownId(null);
    } else {
      setActiveDropdownId(id);
    }
  };
  
  return (
    <CardContainer>
      <MainTitleContainer>
        <FontAwesomeIcon icon={faBookOpenReader} className="icon-main-read-book"/>
        <CardTitle>읽고 있는 책 목록</CardTitle>
      </MainTitleContainer>  
      {bookListResponse.map((book) => (
        <BookListContainer key={book.uid}>
          <BookImage src={book.cover} alt="bookimg" />
          <BookDetailContainer>
            <BookListContent>
              <ContentTitleText>{book.title}</ContentTitleText>
              <ContentText>{book.author}{book.publisher}</ContentText>
              <SubBtnBox>
                {/* DropDownApp 구성 요소를 사용자 프로필에 통합 */}
                <DropDownApp profiles={book.profile} />
              </SubBtnBox>
            </BookListContent>
          </BookDetailContainer>
        </BookListContainer>
      ))}
    </CardContainer>
  );
}


export default BookListCard;

const CardContainer = styled.div`
  border-radius: 40px;
  background: white;
  box-shadow: 3px 8px 8px 3px rgba(0,0,0,0.16), 2px 3px 6px rgba(0,0,0,0.23);
  width: 700px;
  padding: 40px 60px 21px 60px;
  margin-bottom: 50px;
`;

const MainTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
  margin-bottom: 2rem;
`;

const CardTitle = styled.p`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const BookListContainer = styled.div`
  display: flex;
  margin-bottom: 25px;
  align-items: start;
`;

const BookImage = styled.img`
  width: 100px;
  height: auto;
  flex-shrink: 0;
  border-radius: 2px;
`;

const BookListContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 22px;
  margin-top: 4px;
`;

const ContentTitleText = styled.p`
  color: #000;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ContentText = styled.p`
  margin-top: 10px;
  color: #000;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const SubBtnBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  cursor: pointer;
  :active {
    scale: 0.99;
  }
`;

const DownArrowImg = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;

const SubBtn = styled.button`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;

  display: flex;
  align-items: center;
  justify-content: center;
  background: fff;

  border-radius: 11px;
  border: 1px solid #ddd;
  background: #fff;
  box-shadow: 0px 4px 1px 0px rgba(0, 0, 0, 0.25);

  width: 200px;
  height: 40px;
  cursor: pointer;
`;


const Dropdown = styled.div`
  max-height: 100px;
  overflow-y: auto;
  margin-left:30px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 1px 0px rgba(0, 0, 0, 0.25);
  width: 200px;
  background-color: #fff;
`;

const DropdownItem = styled.div`
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f5f5f5;
  }
`;
const BookDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  `;
