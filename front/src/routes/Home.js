import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { GET_BANNERS } from 'query';

import Banners from 'components/Banners';
import Benefits from 'components/Benefits';
// import BestSales from 'components/BestSales';
import Sales from 'components/Sales';
import Hero from 'components/Hero';
import Button from 'components/Button';

export default () => {
    const {
        loading,
        error,
        data: { banner },
    } = useQuery(GET_BANNERS);

    return (
        <div className="homepage">
            <Helmet>
                <meta
                    name="description"
                    content="Продаем элитную парфюмерию и косметику для женщин и мужчин с доставкой"
                />
                <meta
                    name="keywords"
                    content="парфюмерия, духи, интернет магазин парфюмерии, laparfumerie, лапарфюмерия"
                />
            </Helmet>
            <Hero
                subtitle="Try 5 frames at home for free"
                actions={
                    <>
                        <Button kind="primary" bold outlined rounded>
                            Shop Men
                        </Button>
                        <Button kind="primary" bold outlined rounded>
                            Shop Women
                        </Button>
                    </>
                }
            />
        </div>
    );
};
