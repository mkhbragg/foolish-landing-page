import React from 'react';

import Tick from '../Tick/Tick';
import './RecommendationCard.scss';

const COLORS = ['#3F1B54', '#FFCC32', '#336699', '#CC3300', '#339932'];

const recommendationCard = (props: any) => {
    return (
        <div className="RecommendationCard">
            <div className="TopBar" style={{ backgroundColor: COLORS[props.id%COLORS.length] }}></div>
            <div className="FlexRow">
                <div className="FlexColumn">
                    <span>StockAdvisor</span>
                    <Tick amount={props.recommendation.stockAdvisorReturn} />
                </div>
                <div className="FlexColumn">
                    {/* TODO: replace with dynamic benchmark value */}
                    <span>S&amp;P 500</span>
                    <Tick amount={props.recommendation.benchmarkReturn} />
                </div>
            </div>
            <div>{ props.recommendation.company }</div>
        </div>
    );
}

export default recommendationCard;