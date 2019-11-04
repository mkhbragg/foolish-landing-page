import React, { Component } from 'react';

import axios from '../../axios-tmf';
import './Footer.scss';

class Footer extends Component<any, any> {
    state = {
        disclosure: null,
        today: new Date().getFullYear()
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
            <footer className="Footer">
                <p><a href="https://www.fool.com/PopUps/PrivacyInfo.htm" target="_blank" rel="noopener noreferrer">Privacy/Legal Information</a>.</p>
                <p>
                    Past performance is not a predictor of future results.
                    Individual investment results may vary.
                    All investing involves risk of loss.
                </p>
                { this.state.disclosure ? <div dangerouslySetInnerHTML={{ __html: this.htmlDecode(this.state.disclosure) }}></div> : null }
                <p>&copy;1995-{this.state.today} The Motley Fool. All rights reserved. | <a href="https://www.fool.com/help/FoolMarks.htm" rel="noopener noreferrer" target="_blank">Legal Information</a></p>
            </footer>
        );
    }
}

export default Footer;