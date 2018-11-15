import React from 'react';
import styled from 'styled-components';

export default styled(({ className, title, subtitle }) => (
  <header className={className}>
    <h1>{title}</h1>
    <h2>{subtitle}</h2>
  </header>
))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 300px;
  padding: 0 200px;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  transition: height 0.5s, padding 0.5s;

  @media (max-width: 900px) {
    padding: 0 50px;
  }

  & > h1 {
    ${props => props.theme.texts.heroTitle}
  }

  & > h2 {
    ${props => props.theme.texts.heroSubtitle}
  }
`;
