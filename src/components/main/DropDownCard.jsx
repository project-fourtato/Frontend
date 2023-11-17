import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import userimage from "../../assets/searchimg/su1.png";
import "../../assets/dropdown.css";
import BookListCard from "./BookListCard"

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
  const DropDownApp = props => {
    const [dropdownVisibility, setDropdownVisibility] = useState(false);
    const [userList, setUserList] = useState(["감자", "네알", "고구마"]);

    return (
      <div>
        <div className="app" onClick={e => setDropdownVisibility(!dropdownVisibility)}>
        { dropdownVisibility ? '나와 같이 읽는 사람' : '나와 같이 읽는 사람' }
        { dropdownVisibility ? (<FontAwesomeIcon className="icon-dropdown" icon={faCaretUp} />) : (<FontAwesomeIcon className="icon-dropdown" icon={faCaretDown} />) }
        </div>
        <Dropdown visibility={dropdownVisibility}>
          <ul>
            {userList.map((user) => {
                return (
                    <li><img src={userimage}></img><p>{user}</p></li>
                )
            })}
          </ul>
        </Dropdown>
      </div>
    )
  }

export default DropDownApp;