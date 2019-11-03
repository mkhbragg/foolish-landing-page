class Recommendation {
    constructor(public id: number, public company: string, public benchmarkReturn: number, public stockAdvisorReturn: number, public returnVsBenchmark: number) {
        this.benchmarkReturn = parseFloat(this.benchmarkReturn.toFixed(0));
        this.stockAdvisorReturn = parseFloat(this.stockAdvisorReturn.toFixed(0));
        this.returnVsBenchmark = parseFloat(this.returnVsBenchmark.toFixed(0));
    }

    private numberWithCommas (x: string): number {
        return parseFloat(x.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
}

export default Recommendation;