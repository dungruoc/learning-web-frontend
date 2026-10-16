import { Link } from 'react-router-dom';
import { deleteCity, formatDate } from '../../data/tools';
import styles from './CityItem.module.css';
import { useCities } from '../contexts/CitiesContext';
import { useState } from 'react';
import Spinner from './Spinner';
import Message from './Message';


export default function CityItem({city}) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const {currentCityId, dispatch} = useCities();
    const {cityName, emoji, date, id, position: {lat, lng}} = city;
    const isCurrent = (Number(currentCityId) === Number(id));

    async function handleDeleteCity(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            await deleteCity(city.id);
            dispatch({type: 'city/deleted', payload: id})
        } catch (err) {
            console.error(err.message);
            setErrorMessage("Something wrong. Cannot delete on server.");
        } finally {
            setIsLoading(false);

        }
    }

    if (isLoading)
        return <Spinner />;

    if (errorMessage.length)
        return <Message message={errorMessage} />;

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