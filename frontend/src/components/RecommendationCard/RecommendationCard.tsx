import React from 'react';

import Tick from '../Tick/Tick';

const COLORS = ['#3F1B54', '#FFCC32', '#336699'];

const recommendationCard = (props: any) => {
    return (
        <div>
            <div style={{ backgroundColor: COLORS[props.recommendation.id%COLORS.length] }}></div>
            <div>
                <span>StockAdvisor</span>
                <Tick amount={props.recommendation.stockAdvisorReturn} />
            </div>
            <div>
                {/* TODO: replace with dynamic benchmark value */}
                <span>S&amp;P 500</span>
                <Tick amount={props.recommendation.benchmarkReturn} />
            </div>
            <div>{ props.recommendation.company }</div>
        </div>
    );
}

export default recommendationCard;