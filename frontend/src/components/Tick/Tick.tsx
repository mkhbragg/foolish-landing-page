import React from 'react';

const tick = (props: any) => {
    return (
        <div>
            <span className={props.amount > 0 ? 'up' : 'down' }>{ props.amount }%</span>
        </div>
    );
}

export default tick;