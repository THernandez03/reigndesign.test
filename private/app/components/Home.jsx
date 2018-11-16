import React from 'react';
import styled from 'styled-components';

import HeroBlock from './HeroBlock';
import { NewsList, NewsItem } from './News';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-widrh: 350px;

  & > div:first {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

export default class Home extends React.Component {
  state = {
    news: [],
    loading: false,
    error: false,
  };

  async componentDidMount() {
    const endpoint =
      'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';

    this.setState({ loading: true });

    try {
      const request = await fetch(endpoint);
      const data = await request.json();

      if (data?.hits?.length) {
        this.setState({
          news: data?.hits || [],
          loading: false,
        });
      }
    } catch (err) {
      this.setState({
        error: { error: true, message: err.message },
        loading: false,
      });
    }
  }

  render() {
    const { news, loading, error } = this.state;

    return (
      <Wrapper>
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
                    date={items.created_at}
                  />
                ))}
            </NewsList>;
          }
        }}
      </Wrapper>
    );
  }
}
