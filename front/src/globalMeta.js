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
    home() {
        return {
            description: 'Продаем элитную парфюмерию и косметику для женщин и мужчин с доставкой',
            keywords: `парфюмерия, духи, интернет магазин парфюмерии, ${data.siteName}, лапарфюмерия`,
        };
    },
    content() {
        return {
            title: ``,
            description: ``,
            keywords: ``,
        };
    },
    brands() {
        return {
            title: '',
            description: '',
            keywords: ``,
        };
    },
    comments() {
        return {
            title: ``,
            description: '',
            keywords: ``,
        };
    },
    sitemap() {
        return {
            title: ``,
            description: ``,
            keywords: ``,
        };
    },
    'sales-leader'() {
        return {
            title: ``,
            description: ``,
            keywords: ``,
        };
    },
    new() {
        return {
            title: ``,
            description: ``,
            keywords: ``,
        };
    },
    articles() {
        return {
            title: ``,
            description: ``,
            keywords: ``,
        };
    },
    article({ name }) {
        return {
            title: `${name}`,
            description: `${name}`,
            keywords: `${name}`,
        };
    },
    catalog({ name, page, minPrice }) {
        return {
            title: `${name} ${page > 1 ? ` Page ${page}` : ''}`,
            description: `${name}`,
            keywords: `${name}`,
        };
    },
    product({ name, items = [] }) {
        return {
            title: name,
            keywords: `${items.map(({ node }) => node.name).join(', ')}`,
            description: ``,
        };
    },
    sale({ name }) {
        return {
            title: `${name}`,
            description: ``,
        };
    },
};
