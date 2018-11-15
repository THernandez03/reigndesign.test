import React from 'react';
import styled from 'styled-components';

import { useNews } from '../utils/fetch';
import HeroBlock from './HeroBlock';
import { NewsList, NewsItem } from './News';

export default styled(({ className }) => {
  const { news, loading, error } = useNews();

  return (
    <div className={className}>
      <HeroBlock title="HN Feed" subtitle="We <3 hacker news!" />

      {do {
        if (loading) {
          <span>Loading...</span>;
        } else if (error) {
          <span>Something went wrong</span>;
        } else {
          <NewsList>
            {news
              .filter(items => !items.story_title || !items.title)
              .sort((prev, next) => next.created_at_i - prev.created_at_i)
              .map(items => (
                <NewsItem
                  key={items.story_id}
                  href={items.story_url || items.url || '#'}
                  title={items.story_title || items.title}
                  author={items.author}
                  date={items.created_at_i}
                />
              ))}
          </NewsList>;
        }
      }}
    </div>
  );
})`
  display: flex;
  flex-direction: column;
  min-widrh: 350px;

  & > div:first {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;
