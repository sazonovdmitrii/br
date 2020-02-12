import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, useLoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';

import { useLang } from 'hooks';

import Loader from 'components/Loader';

const markers = {};

const Map = ({ items, zoom, value, mapHeight, onClickMarker }) => {
    console.log('map value:', value);
    const lang = useLang();
    const { isLoaded, loadError } = useLoadScript({
        language: lang,
        googleMapsApiKey: 'AIzaSyAy60jEl44vOurnzSHTaJtpd2KHjAA9O_0',
    });
    const [map, setMap] = useState(null);
    const [bounds, setBounds] = useState({});

    const handleClick = useCallback(
        id => {
            map.setCenter(markers[id].getPosition());
            map.setZoom(16);
            console.log('handleClick');

            if (onClickMarker) onClickMarker(id);
        },
        [map, onClickMarker]
    );

    useEffect(() => {
        if (map && bounds) {
            map.fitBounds(bounds);
            map.panToBounds(bounds);
            console.log('RESET MAP');
        }
    }, [map, bounds]);

    useEffect(() => {
        if (map && value && items.length) {
            console.log('map items', items);
            const { id } = items.find(item => value === item.id) || {};

            if (!id) return;

            handleClick(id);
        }
    }, [map, value, items, handleClick]);

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>;
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{ height: mapHeight }}
            options={{
                zoom,
            }}
            onLoad={mapInstance => {
                setBounds(new window.google.maps.LatLngBounds());
                setMap(mapInstance);
            }}
        >
            <MarkerClusterer
                ignoreHidden
                options={{
                    ignoreHiddenMarkers: false,
                    imagePath:
                        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                }}
            >
                {clusterer =>
                    items.map(({ id, longitude, latitude, visible }) => (
                        <Marker
                            key={id}
                            onLoad={marker => {
                                bounds.extend(marker.position);
                                markers[id] = marker;
                            }}
                            visible={visible}
                            onClick={() => handleClick(id)}
                            position={{
                                lat: 1 * latitude,
                                lng: 1 * longitude,
                            }}
                            clusterer={clusterer}
                        />
                    ))
                }
            </MarkerClusterer>
        </GoogleMap>
    ) : (
        <Loader />
    );
};

Map.defaultProps = {
    items: [],
    value: null,
    zoom: 10,
    mapHeight: 500,
    onClickMarker: null,
};

Map.propTypes = {
    onClickMarker: PropTypes.func,
    zoom: PropTypes.number,
    value: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
    items: PropTypes.arrayOf(PropTypes.object),
    mapHeight: PropTypes.string,
};

export default Map;
