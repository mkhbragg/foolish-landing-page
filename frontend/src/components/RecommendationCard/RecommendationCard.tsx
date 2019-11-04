import React, { Component } from 'react';
import axios from 'axios';

import Tick from '../Tick/Tick';
import './RecommendationCard.scss';

class RecommendationCard extends Component<any, any> {
    state = {
        imgSrc: `https://g.foolcdn.com/art/companylogos/mark/${this.props.recommendation.symbol}.png`,
        imgNotFound: false
    }

    componentDidMount() {
        axios.get(this.state.imgSrc)
            .catch((error) => this.setState({ imgNotFound: true }));
    }

    render() {
        return (
            <div className="RecommendationCard">
                <div className="TopBar"></div>
                <div className="Content">
                    <div className="FlexRow Ticks">
                        <div className="FlexColumn">
                            <span className="TickType">StockAdvisor</span>
                            <Tick amount={this.props.recommendation.stockAdvisorReturn} />
                        </div>
                        <div className="FlexColumn">
                            <span className="TickType">S&amp;P 500</span>
                            <Tick amount={this.props.recommendation.benchmarkReturn} />
                        </div>
                    </div>
                    <div className="FlexRow Company">
                        <div className="FlexColumn Logo" title={this.props.recommendation.company}>
                            { this.state.imgNotFound ? <span className="Name">{ this.props.recommendation.company }</span> : <img width="48px" src={this.state.imgSrc} alt={this.props.recommendation.company} />  }
                            <span className="Symbol">{ this.props.recommendation.symbol }</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecommendationCard;