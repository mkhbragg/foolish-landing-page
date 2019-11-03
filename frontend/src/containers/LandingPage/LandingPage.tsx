import React, { Component } from 'react';

import axios from '../../axios-tmf';
import RecommendationCard from '../../components/RecommendationCard/RecommendationCard';
import Recommendation from '../../models/Recommendation';
import './LandingPage.scss';

class LandingPage extends Component<any, any> {

    state = {
        recommendations: [],
        topPerformers: [],
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('/recs')
            .then(response => {
                console.log(response);
                let recs = response.data.recs.map((rec: any, index: number) => {
                    return new Recommendation(index, rec.company, rec.benchmark_return * 100, rec.return * 100, rec.return_vs_benchmark * 100, rec.symbol);
                });
                this.setState({ recommendations: recs, topPerformers: this.getTopPerformers(recs) })
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    getTopPerformers = (recommendations: Recommendation[]) => {
        return recommendations.sort((a: Recommendation, b: Recommendation) => b.returnVsBenchmark - a.returnVsBenchmark )
            .splice(0, 5);
    }

    render() {
        console.log(this.state.topPerformers);
        let topRecommendations;
        if (this.state.topPerformers) {
            topRecommendations = this.state.topPerformers.map((rec: Recommendation, i: number) => <RecommendationCard key={rec.id} recommendation={rec} id={i} />);
        }
        
        return (
            <div className="LandingPage">
                <div className="RecommendationCards">
                    { topRecommendations }
                </div>
            </div>
        );
    }
}

export default LandingPage;