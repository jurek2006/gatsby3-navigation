# Gatsby Navigation

Navigation component for website - accessible and responsive.

Uses: React Icons, focus-trap-react i mousetrap:

```
npm install react-icons focus-trap-react mousetrap
```

More info about it: https://www.notion.so/jurekskowron/Accessible-navigation-navbar-menu-hamburger-w-Gatsby-i-bez-Gatsby-5f3f6c62caeb476e8d1a636718191f8f

### How to use it

1. You need styled components
2. Install React Icons, focus-trap-react i mousetrap:
   ```
   npm install react-icons focus-trap-react mousetrap
   ```
3. Copy folder header from `src/components/` to the same location in a project, where you need it
4. Copy the class `.visually-hidden` from `src/styles/GlobalStyles.js` to its equivalent in the project:

   ```
   .visually-hidden:not(:focus):not(:active){
           position: absolute;
           width: 1px;
           height: 1px;
           overflow: hidden;
           clip-path: inset(50%);
           clip: rect(0 0 0 0);
           white-space: nowrap;
       }
   ```

5. Add `<Header/>` component to Layout:
   ```
   const Layout = ({ children }) => (
   <StyledLayout>
       <GlobalStyles />
       <title>Home Page</title>
       <Header />
       <main>{children}</main>
   </StyledLayout>
   );
   ```
6. Update links in Header.js
