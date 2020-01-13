const _metrics = {
    gtm({ event, data }) {
        window.dataLayer.push({
            event,
            ecommerce: data,
        });
    },
};

const metrics = (name, { event, data = {} }) => {
    if (!_metrics[name]) return;

    try {
        _metrics[name]({ event, data });
        console.log('📊', name, `event: ${event} - data:`, data);
    } catch (error) {
        console.warn(error);
    }
};

export default metrics;
