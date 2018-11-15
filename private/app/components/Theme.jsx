import { css, createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body{
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

export default {
  texts: {
    heroTitle: css`
      font-family: 'Noto Sans', sans-serif;
      font-size: 56px;
      margin: 5px 0;
    `,
    heroSubtitle: css`
      font-family: 'Noto Sans', sans-serif;
      font-size: 22px;
      margin: 0;
    `,
    item: css`
      font-family: 'Noto Sans', sans-serif;
      font-size: 16px;
    `,
    itemAuthor: css`
      font-family: 'Noto Sans', sans-serif;
      font-size: 16px;
    `,
  },
  colors: {
    primary: '#333333',
    secondary: '#999999',
    hover: '#fafafa',
    border: '#cccccc',
    white: '#ffffff',
  },
};
