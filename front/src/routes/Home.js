import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import HeroHome from 'components/HeroHome';
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
            <HeroHome
                title={<FormattedMessage id="hero_title" values={{ amount: 5 }} />}
                image="https://i.warbycdn.com/v/c/assets/homepage-new/image/D-Mod-1/1/747501c850.jpeg"
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
