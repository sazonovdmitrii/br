const request = (url, options) =>
    fetch(url, options)
        .then(resp => resp.json())
        .catch(console.error);

const BEGU_HOST = 'https://dev.begu.ru/api/v1/delivery/';
const BEGU_HEADERS = {
    'Host-slug': 'bh',
    'KM-Authenticate': '8fb40e703eede771eef652e71b32f499',
};

export default {
    getDeliveryMethods: ({ regionFias, cityFias, locale }) =>
        request(
            `${BEGU_HOST}delivery-methods?region_fias=${regionFias}&city_fias=${cityFias}&locale=${locale}`,
            {
                headers: BEGU_HEADERS,
            }
        ),
    getPaymentsMethods: ({ locale }) =>
        request(`${BEGU_HOST}payment-methods?locale=${locale}`, {
            headers: BEGU_HEADERS,
        }),
    getPickups: ({ regionFias, cityFias, locale }) =>
        request(`${BEGU_HOST}pvz?region_fias=${regionFias}&city_fias=${cityFias}&locale=${locale}`, {
            headers: BEGU_HEADERS,
        }),
    getStores: ({ regionFias, cityFias, locale }) =>
        request(`${BEGU_HOST}stores?region_fias=${regionFias}&city_fias=${cityFias}&locale=${locale}`, {
            headers: BEGU_HEADERS,
        }),
};
