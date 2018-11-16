import React from 'react';
import styled from 'styled-components';
import { prettyDate } from '../utils/date';
import TrashIcon from '../assets/trash.svg';

export const NewsList = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 300px);
  overflow: auto;

  @media (max-width: 350px) {
    height: calc(100vh - 50px);
  }
`;

export const NewsItem = styled(({ className, href, title, author, date }) => (
  <a
    className={className}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <div>
      <div>
        <span>{title}</span>
        <span>- {author} -</span>
      </div>
      <div>
        <span>{prettyDate(date)}</span>
      </div>
      <div>
        <TrashIcon />
      </div>
    </div>
  </a>
))`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.white};
  padding: 25px 50px;
  margin: 0 150px;
  cursor: pointer;
  text-decoration: none;
  transition: margin 0.5s, padding 0.5s;
  ${props => props.theme.texts.item};

  @media (max-width: 900px) {
    padding: 25px 0;
    margin: 0 50px;
  }

  &:hover {
    background: ${props => props.theme.colors.hover};
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > div:first-of-type {
      flex-grow: 1;

      & > span:first-of-type {
        margin-right: 15px;
        font-weight: bold;
        color: ${props => props.theme.colors.primary};
      }

      & > span:last-of-type {
        ${props => props.theme.texts.itemAuthor};
        color: ${props => props.theme.colors.secondary};
      }
    }

    & > div:nth-child(2) {
      margin: 0 10px;
      color: ${props => props.theme.colors.primary};
    }
  }
`;
