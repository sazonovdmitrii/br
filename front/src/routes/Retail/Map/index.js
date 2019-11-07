import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

import Loader from 'components/Loader';
import Title from 'components/Title';

import styles from './styles.css';

const markers = {};

const Map = ({ items }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAy60jEl44vOurnzSHTaJtpd2KHjAA9O_0',
    });
    const [map, setMap] = useState(null);
    const [bounds, setBounds] = useState({});
    const [infoWindow, setInfoWindow] = useState(null);

    useEffect(() => {
        if (map && bounds) {
            map.fitBounds(bounds);
            map.panToBounds(bounds);
            // console.log(bounds);
        }
    }, [map, bounds]);

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>;
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerClassName={styles.map}
            options={{
                zoom: 10,
            }}
            onLoad={mapInstance => {
                setBounds(new window.google.maps.LatLngBounds());
                setMap(mapInstance);
            }}
        >
            {items.map(({ id, longitude, latitude, name, full_name: fullName }) => (
                <Marker
                    key={id}
                    onLoad={marker => {
                        bounds.extend(marker.position);
                        markers[id] = marker;
                    }}
                    onClick={() => {
                        setInfoWindow({
                            id,
                            position: {
                                lat: 1 * latitude,
                                lng: 1 * longitude,
                            },
                            title: name,
                            description: fullName,
                        });
                    }}
                    position={{
                        lat: 1 * latitude,
                        lng: 1 * longitude,
                    }}
                />
            ))}
            {infoWindow && (
                <InfoWindow
                    onLoad={() => {
                        map.setZoom(16);
                        map.setCenter(markers[infoWindow.id].getPosition());
                    }}
                    onCloseClick={() => {
                        setInfoWindow(null);
                    }}
                    position={infoWindow.position}
                >
                    <>
                        <Title className={styles.title}>{infoWindow.title}</Title>
                        <p>{infoWindow.description}</p>
                    </>
                </InfoWindow>
            )}
        </GoogleMap>
    ) : (
        <Loader />
    );
};

Map.defaultProps = {
    items: [],
};

Map.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
};

export default Map;
