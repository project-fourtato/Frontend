import React from "react";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";
import styled from 'styled-components';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Pooter>&copy; 감자네알</Pooter>
    </>
  );
};

export default Layout;

const Pooter = styled.p `
text-align: right;
font-weight: bold;
padding-bottom: 10px;
position: fixed;
bottom: 0;
right: 15px;
width: 100%;
`