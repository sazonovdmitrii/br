import React, { useState, memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ArrowLeft as ArrowLeftIcon } from 'react-feather';
import { FixedSizeList as List } from 'react-window';
import isEqual from 'react-fast-compare';
import AutoSizer from 'react-virtualized-auto-sizer';
import memoize from 'memoize-one';
import classnames from 'classnames/bind';

import { useLang } from 'hooks';
import { formatDate, exitFullscreen } from 'utils';

import Button from 'components/Button';

import Map from './Map';
import Point from './Point';

import styles from './styles.css';

const cx = classnames.bind(styles);

// eslint-disable-next-line react/prop-types
const Row = memo(({ data: { items, onClick }, index, style }) => {
    // Data passed to List as "itemData" is available as props.data
    const locale = useLang();
    const item = items[index];
    // eslint-disable-next-line react/prop-types
    const { service, address, price, days, storage_time: storageTime } = item;

    return (
        <Point
            style={style}
            address={address}
            classNames={{ root: styles.point, address: styles.pointAddress }}
            price={<FormattedMessage id={price ? 'currency' : 'free'} values={{ price }} />}
            deliveryDays={
                <>
                    <FormattedMessage id="p_cart_pickup_delivery_days" />:{' '}
                    {formatDate({ locale, day: days, format: 'D MMMM YYYY' })}
                </>
            }
            meta={[
                service,
                storageTime && (
                    <>
                        <FormattedMessage id="p_cart_pickup_storage_time" />: {storageTime}
                    </>
                ),
            ].filter(Boolean)}
            onClick={() => {
                onClick(item);
            }}
        />
    );
}, isEqual);

const createItemData = memoize((items, onClick) => ({
    items,
    onClick,
}));

const getItemKey = (index, { items }, { id } = items[index]) => id;

const filterItems = ({ key, value, items }) =>
    items.map(({ id, longitude, latitude, ...any }) => ({
        id,
        longitude,
        latitude,
        visible: value ? any[key] === value : true,
    }));

const getFiltersLabels = ({ items, key }) => {
    const allNames = items.map(item => item[key]);

    return [...new Set(allNames)];
};

const PointsMap = ({ value, items, filterKey, onChange }) => {
    const locale = useLang();
    const [filter, setFilter] = useState(null);
    const [active, setActive] = useState(value);
    const [showList, setShowList] = useState(!!value);

    const handleClickPoint = point => {
        setActive(point);
    };
    const handleClickMarker = useCallback(
        id => {
            setActive(items.find(item => item.id === id));
            setShowList(true);
            exitFullscreen();
        },
        [items]
    );

    const filteredMapItems = filterKey ? filterItems({ items, value: filter, key: filterKey }) : items;
    const filteredPoints = filterKey && filter ? items.filter(item => item[filterKey] === filter) : items;
    const filters = filterKey ? getFiltersLabels({ items, key: filterKey }) : [];
    const itemData = createItemData(filteredPoints, handleClickPoint);
    const autoSizerStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const listClassName = cx(styles.list, { show: showList });
    const mapClassName = cx(styles.map, { show: !showList });
    const mapWrapperClassName = cx(styles.mapWrapper, { withFilters: !!filterKey });

    return (
        <>
            <div className={styles.header}>
                <Button kind="simple" onClick={() => setShowList(!showList)} bold>
                    <FormattedMessage id={showList ? 'p_cart_map_show_map' : 'p_cart_map_show_list'} />
                </Button>
            </div>
            {filterKey && (
                <div className={styles.filters}>
                    {filters.map(name => {
                        const buttonClassName = cx(styles.filterButton, {
                            active: filter === name,
                        });

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
            )}
            <div className={mapWrapperClassName}>
                <div className={mapClassName}>
                    <Map
                        items={filteredMapItems}
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
                                    price={
                                        <FormattedMessage
                                            id={active.price ? 'currency' : 'free'}
                                            values={{ price: active.price }}
                                        />
                                    }
                                    deliveryDays={
                                        <>
                                            <FormattedMessage id="p_cart_pickup_delivery_days" />:{' '}
                                            {formatDate({
                                                locale,
                                                day: active.days,
                                                format: 'D MMMM YYYY',
                                            })}
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
                        <AutoSizer style={autoSizerStyle}>
                            {({ height, width }) => (
                                <List
                                    height={height}
                                    itemCount={filteredPoints.length}
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

PointsMap.defaultProps = {
    items: [],
    onChange: () => {},
    value: null,
    filterKey: null,
};

PointsMap.propTypes = {
    filterKey: PropTypes.string,
    value: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
    items: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
};

PointsMap.whyDidYouRender = true;

export default PointsMap;
