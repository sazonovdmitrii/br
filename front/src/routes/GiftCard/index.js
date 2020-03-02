import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { useFormatMessage } from 'hooks';

import Title from 'components/Title';
import Button from 'components/Button';
import { Dialog, DialogContent } from 'components/Dialog';

import heroImageDesktop from './images/desktop.png';
import heroImageDesktopRetina from './images/desktop@2x.png';
import heroImageMobile from './images/mobile.png';

import styles from './styles.css';

const GiftCard = props => {
    const [metaTitle] = useFormatMessage([{ id: 'p_gift_card_meta_title' }]);
    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Helmet title={metaTitle}>
                {/* TODO REMOVE */}
                <meta name="robots" content="noindex" />
            </Helmet>
            <div className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.heroImage}>
                        <picture>
                            <source
                                media="(min-width: 1200px)"
                                srcSet={`${heroImageDesktop}, ${heroImageDesktopRetina} 2x`}
                            />
                            <img src={heroImageMobile} alt="The perfect present" />
                        </picture>
                    </div>
                    <div className={styles.heroText}>
                        <Title element="h1" className={styles.title}>
                            <FormattedMessage id="p_gift_card_title" />
                        </Title>
                        <div className={styles.heroDescription}>
                            <FormattedMessage id="p_gift_card_description" />
                        </div>
                        <div className={styles.actions}>
                            <Button kind="primary" size="large" bold>
                                <FormattedMessage id="p_gift_card_button_shop_now" />
                            </Button>
                            <button className={styles.button} onClick={() => setOpenDialog(true)}>
                                <FormattedMessage id="p_gift_card_button_gift_faq" />
                            </button>
                            {openDialog && (
                                <Dialog
                                    open={openDialog}
                                    onClose={handleCloseDialog}
                                    title={<FormattedMessage id="p_gift_card_faq_title" />}
                                    size="md"
                                >
                                    <DialogContent>
                                        <div className={styles.markdown}>
                                            <FormattedMessage
                                                id="p_gift_card_faq"
                                                values={{
                                                    text: msg => <p>{msg}</p>,
                                                    title: msg => <h3>{msg}</h3>,
                                                }}
                                            />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
GiftCard.defaultProps = {};

GiftCard.propTypes = {};

export default GiftCard;
