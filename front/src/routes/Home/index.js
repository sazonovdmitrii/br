import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { useLangLink } from 'hooks';

import HeroHome from 'components/HeroHome';
import Button from 'components/Button';
import CollectionSection from 'components/CollectionSection';

import styles from './styles.css';
import bgImage from './images/bg.jpg';

export default () => {
    const manUrl = useLangLink('/muzhskie-opravy/');
    const womanUrl = useLangLink('/zhenskie-opravy/');

    return (
        <>
            <HeroHome
                title={<FormattedMessage id="hero_title" values={{ amount: 5 }} />}
                image={bgImage}
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
            <div className={styles.main}>
                <div className={styles.text}>
                    <FormattedMessage id="home_text" />
                </div>
                <CollectionSection />
            </div>
        </>
    );
};
