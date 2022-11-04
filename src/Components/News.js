import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  articles = [];
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loadng: false,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=eeab31c9930349a6b2a975b0ded7ba55";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
  }
  render() {
    return (
      <div>
        <h2 className="my-2 mx-2">Top Headlines</h2>
        <div className="container my-3">
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-sm" key={element.url}>
                  <NewsItem
                    title={
                      element.title === null ? " " : element.title.slice(0, 30)
                    }
                    description={
                      element.description === null
                        ? " "
                        : element.description.slice(0, 80) + "..."
                    }
                    imageUrl={
                      element.urlToImage === null
                        ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmobile.twitter.com%2Fbreakingnews&psig=AOvVaw1pdkMu0VkJqinmXCKkcm4S&ust=1667690912703000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCOC5-fXWlfsCFQAAAAAdAAAAABAE"
                        : element.urlToImage
                    }
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default News;
