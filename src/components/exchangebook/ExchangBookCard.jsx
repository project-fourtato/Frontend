import { React, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt } from "react-icons/fa";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { msgList } from "../../data/mapdata"

function ExchangBookCard(props) {
  const render = (status) => {
    return (
    <>
    <h1>{status}</h1>
    </>);
  };

  const YourComponent = ({ lat, lng }) => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const ref = useRef();

    useEffect(() => {
      const newMap = new window.google.maps.Map(ref.current, {
        center: { lat, lng },
        zoom: 16,
      });

  const markerInstance = new window.google.maps.Marker({
        position: { lat, lng },
        map: newMap,
        title: '도서관 위치',
      });

      setMap(newMap);
      setMarker(markerInstance);
    }, [])

    return (
      <div ref={ref} id="map" style={{ width: "300px", height: "300px" }}></div>
    )
  }

  return (
    <>
      <ContentArea>
        {msgList.map((mapdata) => {
            let latitude = parseFloat(mapdata.latitude);
            let longitude = parseFloat(mapdata.longitude);

            return (
          <LibraryInfo>
            <Wrapper apiKey={"AIzaSyCkxnfE1Y-05ue4N_q5ba4gEstlkg-0iF4"} 
                        render={render}
                        options={{disableDefaultUI: true}}>
                  <YourComponent lat={latitude} lng={longitude} />
            </Wrapper>

            <ExchangeInfo>
            <LibraryName><FontAwesomeIcon icon={faLocationDot} className='icon-library-marker' />{mapdata.libName}</LibraryName>
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
)})}
     
      </ContentArea>
        </>
    );
}

export default ExchangBookCard;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const ExchangeInfo = styled.div`
  margin-left: 30px;
  margin-top: 10px;
  >div{
    margin-bottom: 8px;
    display: flex;
    align-items : center;
    &:last-child{
        align-items : flex-start;
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
`

const InfoText = styled.p`
color: #000;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: 24px;
letter-spacing: 0.44px;
`;