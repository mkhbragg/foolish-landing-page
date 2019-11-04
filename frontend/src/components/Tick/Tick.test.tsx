import React from 'react';
import { shallow } from 'enzyme';
import Tick from './Tick';

test('Tick class updates according to amount', () => {
    let ticks;

    // Render a neutral tick
    const neutralTick = shallow(<Tick amount={0} />);
    ticks = neutralTick.find('.none');
    expect(ticks.length).toEqual(1);

    // Render a down tick
    const downTick = shallow(<Tick amount={-40} />);
    ticks = downTick.find('.down');
    expect(ticks.length).toEqual(1);

    // Render an up tick
    const upTick = shallow(<Tick amount={100} />);
    ticks = upTick.find('.up');
    expect(ticks.length).toEqual(1);
});