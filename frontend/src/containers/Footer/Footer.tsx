import React, { Component } from 'react';

import axios from '../../axios-tmf';

class Footer extends Component<any, any> {
    componentDidMount() {
        axios('/disclosure')
            .then((response: any) => {
                console.log(response);
                this.setState({ disclosure: response.data });
            });
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default Footer;