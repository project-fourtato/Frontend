import { React, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const { kakao } = window;

function ExchangBookCard(props) {
  const [libraryList, setLibraryList] = useState([]);
  const [region, setSelectedRegion] = useState("");
  const [city, setSelectedCity] = useState("");
  useEffect(() => {
    setLibraryList(props.msgList);
    setSelectedRegion(props.region);
    setSelectedCity(props.city);
  }, [props.msgList]);

  const render = (status) => {
    return (
      <>
        <h1>{status}</h1>
      </>
    );
  };

  const YourComponent = ({ lat, lng, num }) => {
    const idName = "map" + num;

    useEffect(() => {
      const container = document.getElementById(idName); //지도를 담을 영역의 DOM 레퍼런스

      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(lat, lng), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      let markerPosition = new kakao.maps.LatLng(lat, lng);

      let marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);
    }, []);

    return <div id={idName} style={{ width: "300px", height: "300px" }}></div>;
  };

  let a = "";
  if (libraryList.length == 0) {
    a = "해당 지역의 도서관에는 검색하신 책이 없어요😢";
  }
  return (
    <>
      <AnnouncementTitle>{a}</AnnouncementTitle>
      <ContentArea>
        {libraryList &&
          libraryList.map((mapdata, index) => {
            let latitude = parseFloat(mapdata.latitude);
            let longitude = parseFloat(mapdata.longitude);

            return (
              <LibraryInfo>
                <YourComponent lat={latitude} lng={longitude} num={index} />
                <ExchangeInfo>
                  <LibraryName>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="icon-library-marker"
                    />
                    <a
                      href={mapdata.homepage}
                      target={"_blank"}
                      style={{ textDecoration: "none", color: "#142343" }}
                    >
                      {mapdata.libName}
                    </a>
                  </LibraryName>
                  <div>
                    <InfoTextTitle>주소</InfoTextTitle>
                    <InfoText>{mapdata.address}</InfoText>
                  </div>
                  <div>
                    <InfoTextTitle>전화</InfoTextTitle>
                    <InfoText>{mapdata.tel}</InfoText>
                  </div>
                  <div>
                    <InfoTextTitle>운영시간</InfoTextTitle>
                    <InfoText>{mapdata.operatingTime}</InfoText>
                  </div>
                  <div>
                    <InfoTextTitle>휴관일</InfoTextTitle>
                    <InfoText>{mapdata.closed}</InfoText>
                  </div>
                </ExchangeInfo>
              </LibraryInfo>
            );
          })}
      </ContentArea>
    </>
  );
}

export default ExchangBookCard;

const AnnouncementTitle = styled.h2`
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.44px;
  margin-top: 40px;
  margin-bottom: 30px;
`;
const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const ExchangeInfo = styled.div`
  margin-left: 30px;
  margin-top: 10px;
  > div {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    &:last-child {
      align-items: flex-start;
    }
  }
`;

const LibraryInfo = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const LibraryName = styled.h2`
  display: flex;
  align-items: center;
  color: #142343;
  font-size: 18px;
  font-style: normal;
  font-weight: bold;
  line-height: 24px;
  letter-spacing: 0.44px;
  margin-bottom: 20px;
`;

const InfoTextTitle = styled.h2`
  margin-right: 10px;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.44px;
  width: 90px;
  text-align: left;
`;

const InfoText = styled.p`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.44px;
  max-width: 400px;
`;
