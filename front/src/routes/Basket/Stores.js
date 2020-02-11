import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import ListItem from 'components/ListItem';
import Map from './Map';

import styles from './styles.css';

const Stores = ({ value, items, onChange }) => {
    const itemsForMap = useMemo(
        () =>
            items.map(({ id, title, address, schedule, latitude, longitude }) => ({
                id,
                latitude,
                longitude,
                name: title,
                full_name: `Адрес: ${address}, Время работы: ${schedule}`,
            })),
        [items]
    );

    return (
        <div className={styles.mapWrapper}>
            <Map items={itemsForMap} value={value} mapHeight={500} />
            <div className={styles.pickupsList} style={{ height: '500px' }}>
                {items.map(item => {
                    const { title, id, price, phones, storage_time: storageTime } = item;

                    return (
                        <ListItem
                            key={id}
                            title={title}
                            description={
                                <>
                                    <p>{phones}</p>
                                    <p>
                                        <FormattedMessage id="p_cart_order_pickup_storage_time" />:{' '}
                                        {storageTime}
                                    </p>
                                </>
                            }
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

Stores.defaultProps = {
    items: [],
    onChange: () => {},
    value: null,
};

Stores.propTypes = {
    value: PropTypes.oneOfType(PropTypes.string, PropTypes.nubmer),
    items: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
};

export default Stores;
