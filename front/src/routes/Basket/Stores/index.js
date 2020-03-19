import React, { useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ArrowLeft as ArrowLeftIcon } from 'react-feather';
import { FixedSizeList as List, areEqual } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import memoize from 'memoize-one';
import classnames from 'classnames/bind';

import { useLang } from 'hooks';
import { formatDate, exitFullscreen } from 'utils';

import Button from 'components/Button';

import Map from '../Map';
import Point from '../Point';

import styles from './styles.css';

const cx = classnames.bind(styles);

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
            classNames={{ root: styles.point, address: styles.pointAddress }}
            deliveryDays={
                <>
                    <FormattedMessage id="p_cart_pickup_delivery_days" />:{' '}
                    {formatDate({ locale, day: days, format: 'D MMMM YYYY' })}
                </>
            }
            meta={[
                service,
                <>
                    <FormattedMessage id="p_cart_pickup_storage_time" />: {storageTime}
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

const getItemKey = (index, { items }, { id } = items[index]) => id;

const Stores = ({ value, items, onChange }) => {
    console.log(value);
    const locale = useLang();
    const [active, setActive] = useState(value);
    const [showList, setShowList] = useState(!!value);

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
    const handleClickMarker = id => {
        setActive(items.find(item => item.id === id));
        setShowList(true);
        exitFullscreen();
    };

    const itemData = createItemData(items, handleClickPoint);
    const listClassName = cx(styles.list, { show: showList });
    const mapClassName = cx(styles.map, { show: !showList });

    return (
        <>
            <div className={styles.header}>
                <Button kind="simple" onClick={() => setShowList(!showList)} bold>
                    <FormattedMessage id={showList ? 'p_cart_map_show_map' : 'p_cart_map_show_list'} />
                </Button>
            </div>
            <div className={styles.mapWrapper}>
                <div className={mapClassName}>
                    <Map
                        items={itemsForMap}
                        value={active ? active.id : null}
                        mapHeight="100%"
                        onClickMarker={handleClickMarker}
                    />
                </div>
                <div className={listClassName}>
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
                                            <FormattedMessage id="p_cart_pickup_delivery_days" />:{' '}
                                            {formatDate({ locale, day: active.days, format: 'D MMMM YYYY' })}
                                        </>
                                    }
                                    meta={[
                                        active.service,
                                        <>
                                            <FormattedMessage id="p_cart_pickup_storage_time" />:{' '}
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
                                            <FormattedMessage id="p_cart_map_point_button" />
                                        </Button>
                                    }
                                />
                                <div className={styles.activePointInfo}>
                                    {active.phones && (
                                        <div>
                                            <b>
                                                <FormattedMessage id="p_cart_map_point_phone" />:
                                            </b>{' '}
                                            {active.phones}
                                        </div>
                                    )}
                                    {active.schedule && (
                                        <div>
                                            <b>
                                                <FormattedMessage id="p_cart_map_point_schedule" />:
                                            </b>{' '}
                                            {active.schedule}
                                        </div>
                                    )}
                                    {active.how_to_get_there && (
                                        <div>
                                            <b>
                                                <FormattedMessage id="p_cart_map_point_how_to_get_there" />:
                                            </b>{' '}
                                            {active.how_to_get_there}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <AutoSizer style={{ height: '100%', width: '100%' }}>
                            {({ height, width }) => (
                                <List
                                    height={height}
                                    itemCount={items.length}
                                    itemData={itemData}
                                    itemKey={getItemKey}
                                    itemSize={132}
                                >
                                    {Row}
                                </List>
                            )}
                        </AutoSizer>
                    )}
                </div>
            </div>
        </>
    );
};

Stores.defaultProps = {
    items: [],
    onChange: () => {},
    value: null,
};

Stores.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.nubmer]),
    items: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
};

export default Stores;
