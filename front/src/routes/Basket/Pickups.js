import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { formatDate } from 'utils';

import ListItem from 'components/ListItem';
import Map from './Map';

import styles from './styles.css';

const Pickups = ({ onChange, value, items }) => {
    const itemsForMap = useMemo(
        () =>
            items.map(({ id, address, schedule, latitude, longitude }) => ({
                id,
                latitude,
                longitude,
                name: address,
                full_name: `Время работы: ${schedule}`,
            })),
        [items]
    );

    return (
        <div className={styles.mapWrapper}>
            <Map items={itemsForMap} value={value} mapHeight={500} />
            <div className={styles.pickupsList} style={{ height: '500px' }}>
                {items.map(item => {
                    const { service, address, id, price, days } = item;

                    return (
                        <ListItem
                            key={id}
                            title={address}
                            description={
                                <>
                                    <b>
                                        <FormattedMessage
                                            id={parseInt(price, 10) === 0 ? 'free' : 'currency'}
                                            values={{ price: parseInt(price, 10) }}
                                        />
                                    </b>
                                    <span>
                                        <FormattedMessage id="p_cart_order_pickup_delivery_days" />:{' '}
                                        {formatDate({ day: days, format: 'D MMMM YYYY' })}
                                    </span>
                                </>
                            }
                            meta={service}
                            active={value === id}
                            classNames={{ root: styles.pickupListItem }}
                            onClick={() => {
                                onChange(item);
                            }}
                            pointer
                        />
                    );
                })}
            </div>
        </div>
    );
};

Pickups.defaultProps = {
    items: [],
    onChange: () => {},
    value: null,
};

Pickups.propTypes = {
    value: PropTypes.oneOfType(PropTypes.string, PropTypes.nubmer),
    items: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
};

export default Pickups;
