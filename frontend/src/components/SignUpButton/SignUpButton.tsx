import React, { Component } from 'react';

import axios from '../../axios-tmf';
import FoolTracker from '../../models/FoolTracker';
import './SignUpButton.scss';

class SignUpButton extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            userEmail: ''
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event: any) => {
        this.setState({ userEmail: event.target.value });
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        this.setState({ loading: true });

        // create form data and send to backend
        let form = new FormData();
        form.append('email', this.state.userEmail);
        axios.post('/add_to_campaign', form)
            .then(response => {
                this.setState({ loading: false });

                // log trackEvent() on FoolTracker
                let ft = new FoolTracker('LandingPage', { userAgent: navigator.userAgent });
                ft.trackEvent('FormSubmission', { email: this.state.userEmail, date: new Date() });

                // go to campaign url
                window.location.href = response.data.campaign_url;
            })
            .catch( error => {
                this.setState({ loading: false, error: true });
            });
    }

    render() {
        return (
            <div className="SignUpButton">
                <form onSubmit={ this.handleSubmit }>
                    <input type="email" name="email" value={ this.state.userEmail } onChange={ this.handleChange } required placeholder="Email" aria-label="email" />
                    <input type="submit" value="Sign me up!" />
                </form>
            </div>
        );
    }
}

export default SignUpButton;