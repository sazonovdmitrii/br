const data = {
    url: `https://brillenhof.com`,
    domain: 'brillenhof.com',
    siteName: 'Brillenhof',
    email: 'info@brillenhof.com',
    phone: {
        moscow: '+7 (495) 539 53 15',
        russia: '8 (800) 100 53 15',
    },
    work_time: 'Работаем c 8:00 до 17:00.',
    description: '',
};

export default {
    url: data.url,
    phone: data.phone,
    fullSiteName: `${data.domain}`,
    defaultTitle: `Glasses & Prescription Eyeglasses | ${data.siteName}`,
    titleTemplate: `%s | ${data.siteName}`,
    title: '',
    content({ name, keywords, description }) {
        return {
            title: name,
            description,
            keywords,
        };
    },
    sitemap() {
        return {
            title: ``,
            description: ``,
            keywords: ``,
        };
    },
    catalog({ name }) {
        return {
            title: name,
        };
    },
    product({ name, items = [] }) {
        return {
            title: name,
            keywords: `${items.map(({ node }) => node.name).join(', ')}`,
            description: ``,
        };
    },
};
