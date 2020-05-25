import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, useLoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import isEqual from 'react-fast-compare';
import { useLang } from 'hooks';

import Loader from 'components/Loader';

const markers = {};

const MemoMarker = memo(({ id, longitude, latitude, visible, clusterer, onLoad, onClick }) => {
    const handleClick = useCallback(() => onClick(id), [id, onClick]);
    const handleLoad = useCallback(marker => onLoad({ id, marker }), [id, onLoad]);

    return (
        <Marker
            key={id}
            visible={visible}
            position={{
                lat: 1 * latitude,
                lng: 1 * longitude,
            }}
            clusterer={clusterer}
            onLoad={handleLoad}
            onClick={handleClick}
        />
    );
}, isEqual);

const Map = memo(({ items, zoom, value, className, mapHeight, onClickMarker }) => {
    // value,
    const lang = useLang();
    const { isLoaded, loadError } = useLoadScript({
        language: lang,
        googleMapsApiKey: 'AIzaSyAy60jEl44vOurnzSHTaJtpd2KHjAA9O_0',
    });
    const [map, setMap] = useState(null);
    const [bounds, setBounds] = useState({});

    const centeredMap = useCallback(
        id => {
            map.setCenter(markers[id].getPosition());
            map.setZoom(16);
            console.log('CENTERED MAP');
        },
        [map]
    );

    const handleLoadMarker = useCallback(
        ({ marker, id }) => {
            bounds.extend(marker.position);
            markers[id] = marker;
        },
        [bounds]
    );

    const handleLoadMap = useCallback(mapInstance => {
        setBounds(new window.google.maps.LatLngBounds());
        setMap(mapInstance);
    }, []);

    useEffect(() => {
        if (map && bounds) {
            setTimeout(() => {
                map.fitBounds(bounds);
                map.panToBounds(bounds);

                if (items.length === 1) {
                    map.setZoom(16);
                }
            }, 0);
            console.log('RESET MAP', map, bounds);
        }
    }, [map, bounds, items.length]);

    useEffect(() => {
        if (map && value) {
            setTimeout(() => centeredMap(value), 0);
        }
    }, [centeredMap, map, value]);

    const mapContainerStyle = useMemo(() => ({ height: mapHeight }), [mapHeight]);
    const options = useMemo(
        () => ({
            zoom,
            streetViewControl: false,
            mapTypeControl: false,
        }),
        [zoom]
    );
    const markerClustererOptions = useMemo(
        () => ({
            imagePath:
                'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        }),
        []
    );

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>;
    }

    return isLoaded ? (
        <GoogleMap
            className={className}
            mapContainerStyle={mapContainerStyle}
            options={options}
            onLoad={handleLoadMap}
        >
            <MarkerClusterer ignoreHidden options={markerClustererOptions} enableRetinaIcons>
                {clusterer =>
                    items.map(({ id, longitude, latitude, visible }) => (
                        <MemoMarker
                            key={id}
                            onClick={onClickMarker}
                            id={id}
                            longitude={longitude}
                            latitude={latitude}
                            visible={visible}
                            onLoad={handleLoadMarker}
                            clusterer={clusterer}
                        />
                    ))
                }
            </MarkerClusterer>
        </GoogleMap>
    ) : (
        <Loader />
    );
}, isEqual);

Map.defaultProps = {
    items: [],
    value: null,
    zoom: 10,
    mapHeight: 500,
    onClickMarker: () => {},
    className: null,
};

Map.propTypes = {
    className: PropTypes.string,
    onClickMarker: PropTypes.func,
    zoom: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    items: PropTypes.arrayOf(PropTypes.object),
    mapHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Map.whyDidYouRender = true;

export default Map;
