import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import HeroHome from 'components/HeroHome';
import Button from 'components/Button';

export default () => {
    return (
        <>
            <HeroHome
                title={<FormattedMessage id="hero_title" values={{ amount: 5 }} />}
                image="https://i.warbycdn.com/v/c/assets/homepage-new/image/D-Mod-1/1/747501c850.jpeg"
                actions={
                    <>
                        <Button to="/muzhskie-opravy/" kind="primary" size="small" bold outlined rounded>
                            <FormattedMessage id="shop_men" />
                        </Button>
                        <Button to="/zhenskie-opravy/" kind="primary" size="small" bold outlined rounded>
                            <FormattedMessage id="shop_women" />
                        </Button>
                    </>
                }
            />
        </>
    );
};
