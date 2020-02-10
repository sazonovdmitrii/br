import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, useLoadScript, Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api';

import Loader from 'components/Loader';
import Title from 'components/Title';

import styles from './styles.css';

const markers = {};

const Map = ({ items, zoom, value, mapHeight }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAy60jEl44vOurnzSHTaJtpd2KHjAA9O_0',
    });
    const [map, setMap] = useState(null);
    const [bounds, setBounds] = useState({});
    const [infoWindow, setInfoWindow] = useState(null);

    const handleClick = useCallback(
        ({ id, latitude, longitude, name, fullName }) => {
            console.log(fullName);
            setInfoWindow({
                id,
                position: {
                    lat: 1 * latitude,
                    lng: 1 * longitude,
                },
                title: name,
                description: fullName,
            });
            map.setCenter(markers[id].getPosition());
            map.setZoom(8);
        },
        [map]
    );

    const resetMap = () => {
        map.fitBounds(bounds);
        map.panToBounds(bounds);
    };

    useEffect(() => {
        if (items.length > 1 && map && bounds) {
            resetMap();
        }
    }, [items, map, bounds, resetMap]);

    useEffect(() => {
        if (map && value && items.length) {
            console.log('map items', items);
            const { id, latitude, longitude, name, full_name: fullName } =
                items.find(item => value === item.id) || {};

            if (!id) return;

            handleClick({ id, latitude, longitude, name, fullName });
        }
    }, [map, value, items, handleClick]);

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>;
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{ height: `${mapHeight}px` }}
            options={{
                zoom,
            }}
            onLoad={mapInstance => {
                setBounds(new window.google.maps.LatLngBounds());
                setMap(mapInstance);
            }}
        >
            <MarkerClusterer
                options={{
                    ignoreHiddenMarkers: false,
                    imagePath:
                        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                }}
            >
                {clusterer =>
                    items.map(({ id, longitude, latitude, name, full_name: fullName }) => (
                        <Marker
                            key={id}
                            onLoad={marker => {
                                bounds.extend(marker.position);
                                markers[id] = marker;
                            }}
                            onClick={() => handleClick({ id, latitude, longitude, name, fullName })}
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
    active: null,
    zoom: 10,
    mapHeight: 500,
};

Map.propTypes = {
    zoom: PropTypes.number,
    active: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.object),
    mapHeight: PropTypes.number,
};

export default Map;
