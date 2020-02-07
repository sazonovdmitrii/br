const request = (url, options) =>
    fetch(url, options)
        .then(resp => resp.json())
        .catch(console.error);

export default {
    dadata: value =>
        request('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
            method: 'POST',
            body: JSON.stringify({
                query: value.toLowerCase(),
                from_bound: { value: 'city' },
                to_bound: { value: 'settlement' },
            }),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Token dc03e6abf559f7c3e02cf00225d50f16c3185867',
            },
        }),
};
