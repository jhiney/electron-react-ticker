import React from "react";
import { Col, Row } from "react-bootstrap";
import './style/Tickerline.css'
require("dotenv").config();

export default class Tickerline extends React.Component {
  static displayName = Tickerline.name;

  constructor(props) {
    super(props);
    this.state = {
      ticker: this.props.tickerToUse,
      stockPrice: "",
      stockName: "",
    };
  }

  getPrice(ticker) {
    //if there is no ticker (by default) then do not fetch
    if (ticker) {
      const cs =
        "https://finnhub.io/api/v1/quote?symbol=" +
        ticker.toUpperCase() +
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
  getName(ticker) {
    //if there is no ticker (by default) then do not fetch
    if (ticker) {
      const cs =
        "https://finnhub.io/api/v1/stock/profile2?symbol=" +
        ticker.toUpperCase() +
        "&token=" +
        process.env.REACT_APP_MY_KEY;
      fetch(cs)
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            stockName: result.name,
          });
          //console.log(this.state.stockPrice)
        });
    }
  }

  componentDidMount() {
    this.getPrice(this.state.ticker);
    this.getName(this.state.ticker);
  }

  render() {
    return (
      <div className="tickerline">
        <Row xs={2} md={4} lg={6}>
          <Col>{this.state.ticker.toUpperCase()}</Col>
          <Col>${this.state.stockPrice}</Col>
        </Row>
        <Row xs={2} md={4} lg={6}>
          <Col style={{ color: "gray" }}>{this.state.stockName}</Col>
          <Col></Col>
        </Row>
      </div>
    );
  }
}
//<p> Ticker: {this.state.ticker ? this.state.ticker.toUpperCase() : ""} | Current Price: {this.state.stockPrice} </p>
