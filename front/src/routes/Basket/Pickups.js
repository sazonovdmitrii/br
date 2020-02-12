import React, { useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ArrowLeft as ArrowLeftIcon } from 'react-feather';
import classnames from 'classnames/bind';
import { FixedSizeList as List, areEqual } from 'react-window';
import memoize from 'memoize-one';

import { formatDate } from 'utils';

import Button from 'components/Button';

import Map from './Map';
import Point from './Point';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Row = memo(({ data: { items, onClick }, index, style }) => {
    // Data passed to List as "itemData" is available as props.data
    const item = items[index];
    const { service, address, id, price, days } = item;

    return (
        <Point
            id={id}
            style={style}
            address={address}
            className={styles.point}
            price={<FormattedMessage id="currency" values={{ price }} />}
            deliveryDays={
                <>
                    <FormattedMessage id="p_cart_order_pickup_delivery_days" />:{' '}
                    {formatDate({ day: days, format: 'D MMMM YYYY' })}
                </>
            }
            meta={[service]}
            onClick={() => {
                onClick(item);
            }}
            bordered
        />
    );
}, areEqual);

const createItemData = memoize((items, onClick) => ({
    items,
    onClick,
}));

const Pickups = ({ value, items, onChange }) => {
    const [filter, setFilter] = useState(null);
    const [active, setActive] = useState(value);

    const pickupsObj = useMemo(
        () =>
            items.reduce(
                (acc, item) => ({
                    ...acc,
                    [item.service]: [...(acc[item.service] ? acc[item.service] : []), item],
                }),
                {}
            ),
        [items]
    );
    const filteredPickups = filter ? pickupsObj[filter] : items;
    const filters = useMemo(() => {
        const allNames = items.map(({ service }) => service);

        return [...new Set(allNames)];
    }, [items]);
    const itemsForMap = useMemo(
        () =>
            items.map(({ id, service, price, address, schedule, latitude, longitude }) => ({
                id,
                latitude,
                longitude,
                price,
                visible: filter ? filter === service : true,
                name: address,
                full_name: `Время работы: ${schedule}`,
            })),
        [items, filter]
    );
    const handleClickPoint = point => {
        setActive(point);
    };
    const itemData = createItemData(filteredPickups, handleClickPoint);

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
                                price={<FormattedMessage id="currency" values={{ price: active.price }} />}
                                deliveryDays={
                                    <>
                                        <FormattedMessage id="p_cart_order_pickup_delivery_days" />:{' '}
                                        {formatDate({ day: active.days, format: 'D MMMM YYYY' })}
                                    </>
                                }
                                meta={[active.service]}
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
                                <div>
                                    <b>Телефон:</b> {active.phones}
                                </div>
                                <div>
                                    <b>Время работы:</b> {active.schedule}
                                </div>
                                <div>
                                    <b>Как добраться:</b> {active.how_to_get_there}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div style={{ height: '100%' }}>
                        <div className={styles.pickupsFilters}>
                            {filters.map(name => {
                                const buttonClassName = cx(styles.filterButton, { active: filter === name });

                                return (
                                    <Button
                                        key={name}
                                        className={buttonClassName}
                                        kind="simple"
                                        size="small"
                                        onClick={() => {
                                            setFilter(name === filter ? null : name);
                                        }}
                                    >
                                        {name}
                                    </Button>
                                );
                            })}
                        </div>
                        <div className={styles.pickupsList}>
                            <List
                                height={400}
                                itemCount={filteredPickups.length}
                                itemData={itemData}
                                itemSize={132}
                            >
                                {Row}
                            </List>
                        </div>
                    </div>
                )}
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
