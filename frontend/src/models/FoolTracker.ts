class FoolTracker {
    constructor(public pageType: any, public pageProperties: any) {}

    trackEvent(eventName: any, eventProperties: any) {
        let trackingProperties = {};
        Object.assign(trackingProperties, this.pageProperties, eventProperties);
        console.log(this.pageType, eventName, trackingProperties);
    }
}

export default FoolTracker;