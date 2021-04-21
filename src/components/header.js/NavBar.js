import React from 'react';
import { GoThreeBars, GoX } from 'react-icons/go';
import { Link } from 'gatsby';
import mousetrap from 'mousetrap';
import FocusTrap from 'focus-trap-react';
import styled from 'styled-components';

/* 
  Example of using mousetrap: https://github.com/gatsbyjs/gatsby/blob/master/examples/gatsbygram/src/components/modal.js#L23-L27
  Example of using focus-trap-react: https://github.com/focus-trap/focus-trap-react/blob/master/demo/js/demo-special-element.js

  FocusTrap component comes from focus-trap-react, but here is controlled by navbarOpen 
  - focus is trapped in mobile menu only when it's open

  TODO: there's an issue when mobile menu is opened (and focus trapped) and screen resizes to desktop 
  menu still remains with trapped focus
*/

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarOpen: false,
    };
  }

  // binding & unbinding keyboard events
  componentDidMount() {
    mousetrap.bind(`esc`, () => this.closeNavbar());
  }

  componentWillUnmount() {
    mousetrap.unbind(`esc`);
  }

  // methods for opening/closing navbar
  closeNavbar() {
    const { navbarOpen } = this.state;
    if (navbarOpen) {
      this.setState({ navbarOpen: false });
    }
  }

  toggleNavbarOpen() {
    const { navbarOpen } = this.state;
    this.setState({ navbarOpen: !navbarOpen });
  }

  render() {
    const { navbarOpen } = this.state;

    return (
      <StyledHeaderWrapper>
        <div className={`overlay ${navbarOpen && 'isVisible'} `}>
          {/* element to mask content in the back when mobile menu opened - it gets .isVisible which is responsible for showing on mobile  */}
        </div>
        <header className="header">
          <div className="navContainer">
            <FocusTrap active={navbarOpen}>
              <nav className="navPrimary" aria-label="Primary navigation">
                <div className="logo">Logo</div>
                <button
                  className="menuBtn"
                  onClick={() => this.toggleNavbarOpen()}
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
            </FocusTrap>
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
