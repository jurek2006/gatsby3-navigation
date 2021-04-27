import React from 'react';
import styled from 'styled-components';

import GlobalStyles from '../styles/GlobalStyles';
import Header from './header/Header';

const Layout = ({ children }) => (
  <StyledLayout>
    <GlobalStyles />
    <title>Home Page</title>
    <Header />
    <main>{children}</main>
  </StyledLayout>
);

export default Layout;

// ========== styled components =============
const StyledLayout = styled.div``;
