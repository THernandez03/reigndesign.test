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

export const NewsItem = styled(
  ({ className, href, onClick, title, author, date }) => (
    <div className={className}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div>
          <span>{title}</span>
          <span>- {author} -</span>
        </div>
        <div>
          <span>{prettyDate(date)}</span>
        </div>
      </a>
      <div>
        <TrashIcon onClick={onClick} />
      </div>
    </div>
  ),
)`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.white};
  padding: 15px 50px;
  margin: 0 150px;
  cursor: pointer;
  transition: margin 0.5s, padding 0.5s;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  ${props => props.theme.texts.item};

  @media (max-width: 900px) {
    padding: 25px 0;
    margin: 0 50px;
  }

  &:hover {
    background: ${props => props.theme.colors.hover};
  }

  & > a {
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: space-between;
    text-decoration: none;
    color: ${props => props.theme.colors.primary};

    & > div:first-of-type {
      & > span:first-of-type {
        margin-right: 15px;
        font-weight: bold;
      }

      & > span:last-of-type {
        ${props => props.theme.texts.itemAuthor};
        color: ${props => props.theme.colors.secondary};
      }
    }
  }

  & > div {
    margin: 0 10px;
    color: ${props => props.theme.colors.primary};
  }
`;
