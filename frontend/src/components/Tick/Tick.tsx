import React from 'react';

import './Tick.scss';

const tick = (props: any) => {
    return (
        <div className="Tick">
            <div className={props.amount > 0 ? 'up' : 'down' }>
                <div className="arrow"></div>
                <span>{ props.amount }%</span>
            </div>
        </div>
    );
}

export default tick;