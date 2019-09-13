import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { useLangLink } from 'hooks';

import HeroHome from 'components/HeroHome';
import Button from 'components/Button';

export default () => {
    const manUrl = useLangLink('/muzhskie-opravy/');
    const womanUrl = useLangLink('/zhenskie-opravy/');

    return (
        <>
            <HeroHome
                title={<FormattedMessage id="hero_title" values={{ amount: 5 }} />}
                image="https://i.warbycdn.com/v/c/assets/homepage-new/image/D-Mod-1/1/747501c850.jpeg"
                actions={
                    <>
                        <Button to={manUrl} kind="primary" size="small" bold outlined rounded>
                            <FormattedMessage id="shop_men" />
                        </Button>
                        <Button to={womanUrl} kind="primary" size="small" bold outlined rounded>
                            <FormattedMessage id="shop_women" />
                        </Button>
                    </>
                }
            />
        </>
    );
};
