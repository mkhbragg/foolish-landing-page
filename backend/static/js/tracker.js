class FoolTracker {
    constructor(pageType, pageProperties) {
        this.pageType = pageType;
        this.pageProperties = pageProperties;
    }
    trackEvent(eventName, eventProperties) {
        let trackingProperties = {};
        Object.assign(trackingProperties, this.pageProperties, eventProperties);
        console.log(this.pageType, eventName, trackingProperties);
    }
}