import React from 'react';
import { GoThreeBars, GoX } from 'react-icons/go';
import { Link } from 'gatsby';
import styled from 'styled-components';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarOpen: false,
    };
  }

  render() {
    const { navbarOpen } = this.state;
    const setNavbarOpen = (navbarNewStatus) =>
      this.setState({ navbarOpen: navbarNewStatus });

    return (
      <StyledHeaderWrapper>
        <div className={`overlay ${navbarOpen && 'isVisible'} `}>
          {/* element to mask content in the back when mobile menu opened - it gets .isVisible which is responsible for showing on mobile  */}
        </div>
        <header className="header">
          <div className="navContainer">
            <nav className="navPrimary" aria-label="Primary navigation">
              <div className="logo">Logo</div>
              <button
                className="menuBtn"
                onClick={() => setNavbarOpen(!navbarOpen)}
                type="button"
                aria-expanded={String(navbarOpen)}
                aria-controls="navPrimaryItems"
              >
                <span className="menuBtn__icon">
                  {navbarOpen ? <GoX size={30} /> : <GoThreeBars size={30} />}
                </span>
                <span className="menuBtn__label visually-hidden">
                  {navbarOpen ? 'Close menu' : 'Open menu'}
                </span>
              </button>
              <ul
                className={`navPrimary__responsiveItems ${
                  navbarOpen && 'isVisible'
                } `}
                id="navPrimaryItems"
              >
                <li className="navPrimary__item">
                  <Link to="/" className="nav__link">
                    Home
                  </Link>
                </li>
                <li className="navPrimary__item">
                  <Link to="/one" className="nav__link">
                    One
                  </Link>
                </li>
                <li className="navPrimary__item">
                  <Link to="/two" className="nav__link">
                    Two
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </StyledHeaderWrapper>
    );
  }
}

export default NavBar;

const StyledHeaderWrapper = styled.div`
  .header {
    position: relative;
    background-color: white;
  }

  .overlay {
    visibility: hidden;
    background-color: #ccc;
    opacity: 0.5;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .overlay.isVisible {
    visibility: visible;
  }

  .navPrimary {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 2px solid #ccc;
    padding: 1rem;
  }

  .navPrimary__responsiveItems {
    display: none;
    flex-basis: 100%;
    flex-grow: 1;

    list-style: none;
    padding: 0;
  }

  .navPrimary__responsiveItems.isVisible {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .menuBtn {
    background-color: blueviolet;
    color: white;
    border: none;

    &__icon svg {
      height: 2rem;
      width: 2rem;
    }
  }

  .logo {
    margin: 16px 0;
  }

  @media (min-width: 34em) {
    .overlay.isVisible {
      visibility: hidden;
    }

    .menuBtn {
      display: none;
    }

    //   needed higher specificity
    .navPrimary__responsiveItems.navPrimary__responsiveItems {
      position: relative;
      flex-basis: auto;
      flex-grow: 0;

      display: flex;
      flex-direction: row;
    }

    .navPrimary__item {
      padding-right: 0.5rem;
    }
  }
`;
