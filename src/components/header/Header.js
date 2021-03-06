/* eslint-disable no-use-before-define */
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

  When screen resized to desktop - deactivates focus trap by using closeNavbar method 
  it is based on css styles (and media queries)
  (it uses computed style of menuButton. If it's 'display' is 'none' - it is desktop size)

  More about the solution: https://www.notion.so/jurekskowron/2dfe0a8598bb4067ac6179e49812bb3a?v=814caae5e9ab44928704fa26d0dac277&p=f998b61f2246437ab160e5d5d31d2c5c

*/

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarOpen: false,
    };
  }

  // binding & unbinding keyboard events
  componentDidMount() {
    mousetrap.bind(`esc`, () => this.closeNavbar());

    if (typeof window !== `undefined`) {
      window.addEventListener(
        'resize',
        handleResizeNavBar.bind(this, () => this.closeNavbar())
      );
    }
  }

  componentWillUnmount() {
    mousetrap.unbind(`esc`);
    if (typeof window !== `undefined`) {
      window.removeEventListener('resize', handleResizeNavBar);
    }
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
        {/* overlay is only for visual users - aditional way to close mobile menu */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className={`overlay ${navbarOpen && 'isVisible'}`}
          onClick={() => this.closeNavbar()}
        >
          {/* element to mask content in the back when mobile menu opened - it gets .isVisible which is responsible for showing on mobile  */}
        </div>
        <header className="header">
          <div className="navContainer">
            <FocusTrap
              active={navbarOpen}
              focusTrapOptions={{
                allowOutsideClick: true,
              }}
            >
              <nav className="navPrimary" aria-label="Primary navigation">
                <div className="logo">
                  <Link to="/">Logo</Link>
                </div>
                <button
                  className="menuBtn"
                  onClick={() => this.toggleNavbarOpen()}
                  type="button"
                  aria-expanded={String(navbarOpen)}
                  aria-controls="navPrimaryItems"
                  ref={(node) => (this.menuBtn = node)}
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
                    <Link
                      to="/"
                      className="nav__link"
                      activeClassName="nav__link--active"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="navPrimary__item">
                    <Link
                      to="/one"
                      className="nav__link"
                      activeClassName="nav__link--active"
                    >
                      One
                    </Link>
                  </li>
                  <li className="navPrimary__item">
                    <Link
                      to="/two"
                      className="nav__link"
                      activeClassName="nav__link--active"
                    >
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

export default Header;

function handleResizeNavBar() {
  // runs method closeNavbar when window resized and there's this.menuBtn element

  // needs Header component passed (binded) to allow ref'ed element to use like: this.menuBtn
  // and target method closeNavbar()
  if (
    typeof window !== `undefined` &&
    this.menuBtn &&
    this.menuBtn instanceof HTMLElement &&
    this.closeNavbar
  ) {
    // if menuBtn is not displayed (none) - force to close navbar because we're on desktop resolution
    if (window.getComputedStyle(this.menuBtn).display === `none`) {
      this.closeNavbar();
    }
  }
}

// ========== styled components =============

const StyledHeaderWrapper = styled.div`
  --responsiveItemsMargin--desktop: 0;
  --responsiveItemsMargin--mobile: 1rem 0;

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
    margin: var(--responsiveItemsMargin--mobile);
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

  .navPrimary__item {
    /* for nav__link to be full width on mobile */
    width: 100%;
    display: inline-flex;
  }

  .nav__link {
    --navLinkColor: blue;
    --underlineBorderColor: transparent;
    --navLinkPadding--desktop: 0.5rem;
    --navLinkPadding--mobile: 1rem;
    --navLinkMargin--desktop: 0 0.5rem;
    --navLinkMargin--mobile: 0.5rem 0;

    border-bottom: 2px solid;
    border-color: var(--underlineBorderColor);
    color: var(--navLinkColor);
    text-decoration: none;
    padding: var(--navLinkPadding--mobile);
    margin: var(--navLinkMargin--mobile);
    width: 100%;

    /* center text in link vertically and horizontally */
    display: flex;
    align-items: center;
    justify-content: center;

    :hover,
    :focus {
      --underlineBorderColor: inherit;
    }

    &--active {
      --navLinkColor: red;
      --underlineBorderColor: inherit;
      font-weight: 700;
    }

    @media (min-width: 34em) {
      padding: var(--navLinkPadding--desktop);
      margin: var(--navLinkMargin--desktop);
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
      /* on display value is based handleResizeNavbar() */
      display: none;
    }

    //   needed higher specificity
    .navPrimary__responsiveItems.navPrimary__responsiveItems {
      position: relative;
      flex-basis: auto;
      flex-grow: 0;

      display: flex;
      flex-direction: row;
      margin: var(--responsiveItemsMargin--desktop);
    }

    .navPrimary__item {
      padding-right: 0.5rem;
      width: auto;
    }
  }
`;
