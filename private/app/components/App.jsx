import React from 'react';
import { hot } from 'react-hot-loader';
import { ThemeProvider } from 'styled-components';

import { addPolyfills } from '../utils/polyfills';
import Theme, { GlobalStyles } from './Theme';
import Home from './Home';

@hot(module)
export default class App extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  async componentDidMount() {
    await addPolyfills();
  }

  render() {
    return (
      <>
        <GlobalStyles />
        <ThemeProvider theme={Theme}>
          <Home />
        </ThemeProvider>
      </>
    );
  }
}
