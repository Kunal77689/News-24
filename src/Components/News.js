import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  articles = [];

  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loadng: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=eeab31c9930349a6b2a975b0ded7ba55&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }
  nextClick = async () => {
    if (Math.ceil(this.state.page > this.state.totalResults / 20)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=eeab31c9930349a6b2a975b0ded7ba55&page=${
        this.state.page + 1
      }&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
      });
    }
  };
  previousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=eeab31c9930349a6b2a975b0ded7ba55&page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, page: this.state.page - 1 });
  };
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
                        ? "https://media.istockphoto.com/id/1264074047/vector/breaking-news-background.jpg?s=612x612&w=0&k=20&c=C5BryvaM-X1IiQtdyswR3HskyIZCqvNRojrCRLoTN0Q="
                        : element.urlToImage
                    }
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
          <div className="d-flex justify-content-between my-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.previousClick}
              disabled={this.state.page <= 1}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.nextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
