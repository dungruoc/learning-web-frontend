import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';

import { useNavigate } from 'react-router-dom';
import styles from './Map.module.css';
import { useCities } from '../contexts/CitiesContext';
import Button from './Button';
import { useGeolocation } from '../hooks/useGeolocation';
import { useEffect } from 'react';
import { useUriPosition } from '../hooks/useUriPosition';
import { useState } from 'react';


const londonPos = [51.505, -0.09];

function useMapPosition() {
    const [mapPosition, setMapPosition] = useState(londonPos);
    const [uriLat, uriLong] = useUriPosition();
    const {isLoading: isGeoLoading, position: geoPosition, getPosition: getGeoPosition} = useGeolocation();

    useEffect(() => {
        async function updateGeoPosition() {
            if (geoPosition) {
                setMapPosition([geoPosition.lat, geoPosition.lng]);
            }
        }
        updateGeoPosition();
    }, [geoPosition, setMapPosition]);

    useEffect(() => {    
        async function getParams() {
            if (uriLat && uriLong)
                setMapPosition([Number(uriLat), Number(uriLong)]);
        }
        getParams();
    }, [uriLat, uriLong]);

    return {mapPosition, getGeoPosition, isGeoLoading};
}
export default function Map() {
    const {cities} = useCities();
    const {mapPosition, getGeoPosition, isGeoLoading} = useMapPosition();

    return (
        <div className={styles.mapContainer}>
            <Button type="position" onClick={getGeoPosition}>
                {isGeoLoading ? "Loading..." : "Use your localtion"}
            </Button>
            <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {cities.map(city => {
                const {cityName, emoji, position: {lat, lng}} = city;
                return (
                    <Marker key={city.id} position={[lat, lng]}>
                        <Popup>
                            <span>{emoji}</span>
                            <span>{cityName}</span>
                        </Popup>
                    </Marker>
                )
            })}
            <ChangeCenter center={mapPosition}/>
            <DetectClick />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({center}) {
    const map = useMap();
    map.setView(center);

    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: (e) => {
            console.log(e.latlng);
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        }
    })

    return null;
}