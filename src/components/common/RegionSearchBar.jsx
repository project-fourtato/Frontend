import { React, useState } from 'react';
import styled from 'styled-components';
import {regions, cities} from '../../data/regiondata';
import {BsCaretDownFill} from "react-icons/bs";

function RegionSearchBar(props) {
  const [selectedRegion, setSelectedRegion] = useState({ code: 'default', name: '지역' });
  const [selectedCity, setSelectedCity] = useState({ code: 'default', name: '도시' }); 
  const [regionMenuOpen, setRegionMenuOpen] = useState(false);
  const [cityMenuOpen, setCityMenuOpen] = useState(false);

  const handleRegionChange = (selectedRegion) => {
    setSelectedRegion(selectedRegion);
    setSelectedCity(cities[selectedRegion.code][0]);
    setRegionMenuOpen(false);
  };

  const handleCityChange = (selectedCity) => {
    setSelectedCity(selectedCity);
    setCityMenuOpen(false);
  };

  const toggleRegionMenu = () => {
    setRegionMenuOpen(!regionMenuOpen);
    setCityMenuOpen(false);
  };

  const toggleCityMenu = () => {
    setCityMenuOpen(!cityMenuOpen);
    setRegionMenuOpen(false);
  };

    return (
          <HeaderSelectContainer>
          <SelectBoxContainer>
            <SelectBox onClick={toggleRegionMenu}>
              <p>{selectedRegion.name}</p><StyledDownIcon />
              {regionMenuOpen && (
                <Menu>
                  {regions.map((region) => (
                    <MenuItem key={region.code} onClick={() => handleRegionChange(region)}>
                      {region.name}
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </SelectBox>
            <SelectBox onClick={toggleCityMenu}>
              <p>{selectedCity.name}</p><StyledDownIcon />
              {cityMenuOpen && (
                <Menu>
                  {cities[selectedRegion.code].map((city) => (
                    <MenuItem key={city.code} onClick={() => handleCityChange(city)}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </SelectBox>
          </SelectBoxContainer>
    </HeaderSelectContainer>
    );
}

export default RegionSearchBar;

const StyledDownIcon = styled(BsCaretDownFill)`
  cursor: pointer;
  color: #D9D9D9;
  font-size: 16px;
  /* margin-left: 15px; */
`;

const HeaderSelectContainer = styled.div`
  display: flex;
  /*align-items: center;
  margin-bottom: 10px;*/
`;

const SelectBoxContainer = styled.div`
  display: flex;
  /*align-items: center;*/
  line-height: 50px;
  gap: 0.5rem;
  margin-right: 10px;
`;

const SelectBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-radius: 25px;
  border: 1px solid #DBDBDB;
  background: #FFF;
  width: 110px;
  height: 1.65rem;
  /*box-shadow: 1px 1px rgba(0,0,0,0.16);*/
  > p {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.44px;
    padding-left: 9px;
  }

  &:hover {
    cursor: pointer;
  }

  box-shadow: 1px 1px rgba(0,0,0,0.16), 1px 1px 1px rgba(0,0,0,0.23);
`;

const Menu = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  width: 95%;
  background-color: #FFF;
  border: 1px solid #DBDBDB;
  /*border-top: none;*/
  border-radius: 10px;
  z-index: 1;
  max-height: 200px;
  overflow-y: auto; 
  margin-left: 4px;
  box-shadow: 1px 1px rgba(0,0,0,0.16), 1px 1px 1px rgba(0,0,0,0.23);
`;

const MenuItem = styled.div`
  padding: 0px 15px;
  cursor: pointer;
  &:hover {
    background-color: #F5F5F5;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
`;