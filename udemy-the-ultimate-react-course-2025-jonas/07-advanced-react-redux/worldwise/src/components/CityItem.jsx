import { Link } from 'react-router-dom';
import { deleteCity, formatDate } from '../../data/tools';
import styles from './CityItem.module.css';
import { useCities } from '../contexts/CitiesContext';
import { useState } from 'react';
import Spinner from './Spinner';


export default function CityItem({city, dispatch}) {
    const [isLoading, setIsLoading] = useState(false);
    const {currentCityId} = useCities();
    const {cityName, emoji, date, id, position: {lat, lng}} = city;
    const isCurrent = (Number(currentCityId) === Number(id));

    async function handleDeleteCity(e) {
        e.preventDefault();
        setIsLoading(true);
        await deleteCity(city.id);
        setIsLoading(false);
        dispatch({type: 'delete_city', payload: id})
    }

    if (isLoading)
        return <Spinner />;

    return (
        <li>
            <Link className={`${styles.cityItem} ${isCurrent ? styles['cityItem--active'] : null}`}
                to={`${id}?lat=${lat}&lng=${lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button onClick={handleDeleteCity} className={styles.deleteBtn}>⨉</button>
            </Link>
        </li>
    );
}