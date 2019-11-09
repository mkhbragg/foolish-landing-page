import React, { Component } from 'react';

import axios from '../../axios-tmf';
import RecommendationCard from '../../components/RecommendationCard/RecommendationCard';
import Recommendation from '../../models/Recommendation';
import './LandingPage.scss';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

class LandingPage extends Component<any, any> {
    
    state = {
        canShowMore: true,
        topPerformingRecs: [],
        remainingRecs: [],
        randomRecs: [],
        showRemaining: false,
        userEmail: '',
        loading: true,
        error: false
    }

    componentDidMount () {
        axios.get('/recs')
            .then(response => {
                let recs = response.data.recs.map((rec: any, index: number) => {
                    return new Recommendation(index, rec.company, rec.benchmark_return * 100, rec.return * 100, rec.return_vs_benchmark * 100, rec.symbol);
                });
                let top5 = this.getTopXPerformers(recs, 5);
                let remaining = recs.filter((rec: Recommendation, i: number) => top5.indexOf(rec) < 0);
                this.setState({ loading: false, topPerformingRecs: top5, remainingRecs: remaining });
            })
            .catch(error => {
                this.setState({ loading: false, error: true });
            });
    }

    // Get top x performers from list of recommendations
    getTopXPerformers = (recommendations: Recommendation[], x: number) => {
        let topPerformingRecs = recommendations.sort((a: Recommendation, b: Recommendation) => b.returnVsBenchmark - a.returnVsBenchmark )
            .splice(0, x);

        // return top 5
        return topPerformingRecs;
    }

    // Update random recommendations by x of the remaining recommendations
    getXRandomRecs(x: number) {
        this.setState((prevState: any) => {
            let random = x <= prevState.remainingRecs.length ? prevState.remainingRecs.splice(0, x) : prevState.remainingRecs.splice(0, prevState.remainingRecs.length);
            let randomRecs = [ ...prevState.randomRecs, ...random ];
            return { showRemaining: true, randomRecs: randomRecs, remainingRecs: prevState.remainingRecs.filter((rec: Recommendation, i: number) => randomRecs.indexOf(rec) < 1), canShowMore: prevState.remainingRecs.length > 0 };
        });
    }

    render() {
        let topRecommendations, randomRecs;

        topRecommendations = this.state.topPerformingRecs
            .map((rec: Recommendation, i: number) => <RecommendationCard key={rec.id} recommendation={rec} id={i} rank={i + 1} />);
        
        randomRecs = this.state.randomRecs
            .map((rec: Recommendation, i: number) => <RecommendationCard key={rec.id} recommendation={rec} id={i} />);

        if (this.state.loading) {
            topRecommendations = <Spinner />
        }
        if (this.state.error) {
            topRecommendations = <p className="Centered Error">Unfortunately, the list of companies could not be loaded.</p>;
        }
        
        return (
            <Aux>
                <div className="Header">
                    <div className="Sprite"></div>
                    <SignUpForm />
                </div>
                <div className="LandingPage">
                    <div className="PurpleChunk">
                        <h1>Stock Advisor</h1>
                        <div>As a long-time tech stock analyst at The Motley Fool, every day I wake up and get the chance to witness two of the most legendary investors of our time aim to help everyday people like you identify and profit from some of the world’s most promising investment opportunities.
                            It’s hard to believe, but 2018 marked the 25-year anniversary of the founding of The Motley Fool by those two legendary investors, David and Tom Gardner.
                            It’s truly amazing that Tom and David were able to go from publishing an investment newsletter for 300 or so subscribers out of the shed behind David’s house…
                            To serving millions of hardworking investors like you around the globe from offices in far-flung countries like Australia, Germany, the United Kingdom, Hong Kong, and Japan.
                            David and Tom have put together a heck of a run. And since I have the luxury of working with them, I know what they’re most proud of is their ability to consistently lead investors to some of the most life-changing investment returns the market has ever seen. I’m talking, of course, about companies like: </div>
                    </div>
                    <div className="RecommendationCards">
                        { topRecommendations }
                        { this.state.showRemaining ? randomRecs : null }
                        { !this.state.loading && !this.state.error ?  <div className="ShowMore"><button className={ !this.state.canShowMore ? 'disabled' : '' } onClick={() => this.getXRandomRecs(5)}>Show More</button></div> : null}
                    </div>
                    <div className="PurpleChunk">
                        Those are actual investment recommendations David and Tom have shared with The Motley Fool community over the years – and the list goes on!
                        But I’m not here to throw David and Tom a victory parade or make you feel depressed if you missed out on any of those huge gains…
                        Instead, I'm writing you today to talk about something I believe will change the way you invest forever.
                        More specifically, a rare and historically very profitable stock buy signal is flashing right now.
                        You see, David and Tom Gardner independently research and pick their own stocks – what David picks has nothing to do with what Tom pick and vice versa.
                        However, every so often the two of them will land on the exact same stock.
                        Many of us around the office have come to call this formal agreement between these two legendary investors the “All In” buy sign.
                        It’s rare that David and Tom formally agree on the exact same stock – it’s only happened 24 times over the entire history of Motley Fool Stock Advisor.
                        Of course, neither David or Tom would ever describe this stock as a “sure thing,” but the details behind this tiny little internet company are impressive:
                    </div>
                    <div className="List">
                        <div>It’s 1/100th the size of Google.</div>
                        <div>Each one of David’s and Tom’s recommendations of its stock is crushing the market.</div>
                        <div>Its young CEO has already banked $916 million on this stock since its IPO.</div>
                    </div>
                    <div className="PurpleChunk">
                        This company stands to profit as more and more people ditch cable for streaming TV. And in fact, David and Tom believe this company’s crucial technology could represent the final nail in the coffin for traditional cable.
                        Now this isn’t some competitor to Netflix, Hulu, or Amazon Prime Video as you might expect. Instead, this company sits in the middle of the advertising market, which is more than 10X bigger than the online streaming industry.
                        In an interview with Tom Gardner and his team, this company’s CEO called the current moment “the most exciting in the history of advertising.”
                        Of course, any CEO could say that simply to build up hype and push the company’s stock price higher ... but this CEO is putting his money where his mouth is.
                        He’s betting his fortune – $916,395,917 to be exact – on what he’s calling cable TV’s “ticking time bomb.”
                        And here’s the real kicker…
                        Despite this company’s jaw-dropping success over the past few years, most investors have still never even heard of this company’s name!
                        That’s right, while everyone on CNBC and in The Wall Street Journal is busy talking about blue-chip stocks like Apple and Facebook, this significantly smaller (yet faster-growing!) company is flying almost completely under the radar.
                        And, while most investors have been busy pouring more money into only these well-known tech stocks, David and Tom have been doing what the world's greatest investors do — looking for the NEXT stock that could deliver returns of +1,000%, +2,000%, or even +5,000%.
                        That’s why they’ve been pounding the table on this “All In” stock I’ve begun to tell you about today – urging members of The Motley Fool investment community to buy shares before they potentially skyrocket.
                        Look, I understand this all may sound too good to be true, but the returns for “All In” stocks simply have been too good to ignore – and there’s no guarantee that the investing world ever sees this buy signal flash again.
                        Which is exactly why I want to show you the hard numbers behind this incredible stock and invite you to hear more about this strategy directly from David and Tom and their team of analysts – that way, you can decide for yourself if you want to buy shares of this fast-growing company for your portfolio.
                        There’s just one catch:
                        I’m sharing the details of the stock ONLY with members of The Motley Fool's flagship investing service, Motley Fool Stock Advisor .
                        Now, if you're not familiar with Motley Fool Stock Advisor service, it’s the award-winning online investing service David and Tom created to provide easy-to-follow, monthly stock recommendations to individual investors.
                        That's right! Each and every month, over 400,000 investors tune in to discover which stocks David and Tom Gardner believe investors should be buying shares of today.
                        Which brings me back to the small, under-the-radar company receiving the “All In” buy signal in today’s market…
                        Because David and Tom want as many investors as possible to potentially profit from this fast-growing stock, they’ve published a brand-new, comprehensive “buy” report inside Stock Advisor that shows you exactly why this stock is an “all in” buy.
                        Even better, because I’m completely convinced you’ll be impressed by the exclusive research they’ve put together on this stock, I’ll make sure your one-year Stock Advisor membership is backed by a 30-day 100% membership-fee-back guarantee that allows you to get your money back if you aren’t impressed or ultimately decide Stock Advisor isn't right for you!
                        That's right, you can sign up for a year of Stock Advisor today, get the full details on this "All In" stock, and then get your full membership fee back within 30 days if you aren't completely satisfied.
                        This is your chance to get in early on what could prove to be a very special investment recommendation.
                        Think about how many investing trends you've missed out on even though you knew they were going to be big.
                        Don't let that happen again. This is your chance to get in early.
                        I urge you to take action today and decide for yourself if you want to take advantage of this potentially once-in-a-generation buying opportunity. Simply enter your email address below to access our secure sign-up page.
                    
                        <SignUpForm />
                    </div>
                </div>
            </Aux>
        );
    }
}

export default LandingPage;