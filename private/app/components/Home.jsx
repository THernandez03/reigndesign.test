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

  async onIconClick(id) {
    const { news } = this.state;
    const request = await fetch('/disable', {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });

    if (request.ok) {
      this.setState({ news: news.filter(item => item.objectID !== id) });
    }
  }

  async componentDidMount() {
    this.setState({ loading: true });

    try {
      const request = await fetch('/news');
      const data = await request.json();

      if (!data?.length) {
        return this.setState({ loading: false });
      }

      return this.setState({
        news: data,
        loading: false,
      });
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
          } else if (!news.length) {
            <span>No items to show</span>;
          } else {
            <NewsList>
              {news
                .filter(items => !items.story_title || !items.title)
                .sort((prev, next) => next.created_at_i - prev.created_at_i)
                .map(items => (
                  <NewsItem
                    key={items.objectID}
                    href={items.story_url || items.url}
                    title={items.story_title || items.title}
                    author={items.author}
                    date={items.created_at}
                    onClick={() => this.onIconClick(items.objectID)}
                  />
                ))}
            </NewsList>;
          }
        }}
      </Wrapper>
    );
  }
}
