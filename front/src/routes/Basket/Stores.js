import React, { useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ArrowLeft as ArrowLeftIcon } from 'react-feather';
import { FixedSizeList as List, areEqual } from 'react-window';
import memoize from 'memoize-one';

import { useLang } from 'hooks';
import { formatDate } from 'utils';

import Button from 'components/Button';

import Map from './Map';
import Point from './Point';

import styles from './styles.css';

const Row = memo(({ data: { items, onClick }, index, style }) => {
    // Data passed to List as "itemData" is available as props.data
    const locale = useLang();
    const item = items[index];
    const { service, address, id, days, storage_time: storageTime } = item;

    return (
        <Point
            id={id}
            style={style}
            address={address}
            className={styles.point}
            deliveryDays={
                <>
                    <FormattedMessage id="p_cart_order_pickup_delivery_days" />:{' '}
                    {formatDate({ locale, day: days, format: 'D MMMM YYYY' })}
                </>
            }
            meta={[
                service,
                <>
                    <FormattedMessage id="p_cart_order_pickup_storage_time" />: {storageTime}
                </>,
            ]}
            onClick={() => {
                onClick(item);
            }}
        />
    );
}, areEqual);

const createItemData = memoize((items, onClick) => ({
    items,
    onClick,
}));

const Stores = ({ value, items, onChange }) => {
    const locale = useLang();
    const [active, setActive] = useState(value);

    const itemsForMap = useMemo(
        () =>
            items.map(({ id, price, latitude, longitude }) => ({
                id,
                latitude,
                longitude,
                price,
            })),
        [items]
    );
    const handleClickPoint = point => {
        setActive(point);
    };
    const itemData = createItemData(items, handleClickPoint);

    const handleClickMarker = id => {
        setActive(items.find(item => item.id === id));
    };

    return (
        <div className={styles.mapWrapper}>
            <Map
                items={itemsForMap}
                value={active ? active.id : null}
                mapHeight="500px"
                onClickMarker={handleClickMarker}
            />
            <div className={styles.right}>
                {active ? (
                    <>
                        <button
                            type="button"
                            className={styles.backButton}
                            onClick={() => {
                                setActive(null);
                            }}
                        >
                            <ArrowLeftIcon className={styles.backButtonIcon} />
                            <FormattedMessage id="back" />
                        </button>
                        <div className={styles.activePoint}>
                            <Point
                                address={active.address}
                                deliveryDays={
                                    <>
                                        <FormattedMessage id="p_cart_order_pickup_delivery_days" />:{' '}
                                        {formatDate({ locale, day: active.days, format: 'D MMMM YYYY' })}
                                    </>
                                }
                                meta={[
                                    active.service,
                                    <>
                                        <FormattedMessage id="p_cart_order_pickup_storage_time" />:{' '}
                                        {active.storage_time}
                                    </>,
                                ]}
                                actions={
                                    <Button
                                        kind="primary"
                                        size="small"
                                        onClick={() => {
                                            onChange(active);
                                        }}
                                        bold
                                    >
                                        Выбрать пункт
                                    </Button>
                                }
                            />
                            <div className={styles.activePointInfo}>
                                <div>Телефон: {active.phones}</div>
                                <div>Время работы: {active.schedule}</div>
                                <div>Как добраться: {active.how_to_get_there}</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <List height={500} itemCount={items.length} itemData={itemData} itemSize={132}>
                        {Row}
                    </List>
                )}
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
