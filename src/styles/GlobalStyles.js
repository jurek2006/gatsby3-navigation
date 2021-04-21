import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    body{
        margin: 0;
    }

    .visually-hidden:not(:focus):not(:active){
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        clip: rect(0 0 0 0);
        white-space: nowrap;
    }
`;

export default GlobalStyles;
