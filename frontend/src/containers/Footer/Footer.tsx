import React, { Component } from 'react';

import axios from '../../axios-tmf';
import './Footer.scss';
import Aux from '../../hoc/Aux/Aux';

class Footer extends Component<any, any> {
    state = {
        disclosure: null,
        today: null,
        error: false
    }

    componentDidMount() {
        axios.get('/disclosure')
            .then((response: any) => {
                    this.setState({ disclosure: response.data.disclosure, today: new Date().getFullYear() });
            })
            .catch((error: any) => this.setState({ error: true }));
    }

    htmlDecode = (input: any) => {
        if (input) {
            let e = document.createElement('div');
            e.innerHTML = input;
            return e.innerHTML;
        } else {
            return '';
        }
    }

    render() {
        let disclosureContent = null;
        if (this.state.disclosure) {
            disclosureContent = (
                <Aux>
                    <div className="Disclosure" dangerouslySetInnerHTML={{ __html: this.htmlDecode(this.state.disclosure) }}></div>
                    <p>&copy;1995-{this.state.today} The Motley Fool. All rights reserved. | <a href="https://www.fool.com/help/FoolMarks.htm" rel="noopener noreferrer" target="_blank">Legal Information</a></p>
                </Aux>
            );
        }
        if (this.state.error) {
            disclosureContent = <p>Could not fetch disclosure statement.</p> 
        }

        return (
            <footer className="Footer">
                <p><a href="https://www.fool.com/PopUps/PrivacyInfo.htm" target="_blank" rel="noopener noreferrer">Privacy/Legal Information</a>.</p>
                <p>
                    Past performance is not a predictor of future results.
                    Individual investment results may vary.
                    All investing involves risk of loss.
                </p>
                { disclosureContent }
            </footer>
        );
    }
}

export default Footer;