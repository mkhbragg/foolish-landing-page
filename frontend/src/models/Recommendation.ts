class Recommendation {
    constructor(public id: number, public company: string, public benchmarkReturn: number, public stockAdvisorReturn: number, public returnVsBenchmark: number) {}
}

export default Recommendation;