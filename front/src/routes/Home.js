import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import Hero from 'components/Hero';
import Button from 'components/Button';

export default () => {
    return (
        <>
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
                            <FormattedMessage id="shop_men" />
                        </Button>
                        <Button kind="primary" bold outlined rounded>
                            <FormattedMessage id="shop_women" />
                        </Button>
                    </>
                }
            />
        </>
    );
};
