import React, { Component } from 'react';

import axios from '../../axios-tmf';
import './Footer.scss';

class Footer extends Component<any, any> {
    state = {
        disclosure: null
    }

    componentDidMount() {
        axios.get('/disclosure')
            .then((response: any) => {
                this.setState({ disclosure: response.data.disclosure });
            });
    }

    htmlDecode = (input: any) => {
        let e = document.createElement('div');
        e.innerHTML = input;
        return e.innerHTML;
    }

    render() {
        return (
            <div className="Footer">
                { this.state.disclosure ? <div dangerouslySetInnerHTML={{ __html: this.htmlDecode(this.state.disclosure) }}></div> : null }
            </div>
        );
    }
}

export default Footer;