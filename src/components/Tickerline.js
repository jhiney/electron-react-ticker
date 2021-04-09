import React from "react";
require("dotenv").config();

export default class Tickerline extends React.Component {
  static displayName = Tickerline.name;

  constructor(props) {
    super(props);
    this.state = {
      ticker: this.props.tickerToUse,
      stockPrice: "",
    };
  }

  componentDidMount() {
    //if there is no ticker (by default) then do not fetch
    if (this.state.ticker) {
      const cs =
        "https://finnhub.io/api/v1/quote?symbol=" +
        this.state.ticker.toUpperCase() +
        "&token=" +
        process.env.REACT_APP_MY_KEY;
      fetch(cs)
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            stockPrice: result.c,
          });
          //console.log(this.state.stockPrice)
        });
    }
  }

  render() {
    return (
      <div>
        <p> Ticker: {this.state.ticker ? this.state.ticker.toUpperCase() : ""} | Current Price: {this.state.stockPrice} </p>
      </div>
    );
  }
}