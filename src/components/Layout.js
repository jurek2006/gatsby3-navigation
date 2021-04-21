import React from 'react';
import styled from 'styled-components';

import GlobalStyles from '../styles/GlobalStyles';
import NavBar from './header.js/NavBar';

const Layout = ({ children }) => (
  <StyledLayout>
    <GlobalStyles />
    <title>Home Page</title>
    <NavBar />
    <main>{children}</main>
  </StyledLayout>
);

export default Layout;

// ========== styled components =============
const StyledLayout = styled.div``;
