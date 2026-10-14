import { Link } from 'react-router-dom';
import { formatDate } from '../../data/tools';
import styles from './CityItem.module.css';


export default function CityItem({city, dispatch}) {
    const {cityName, emoji, date, id} = city;

    return (
        <li>
            <Link className={styles.cityItem} to={`${id}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button onClick={(e) => {e.preventDefault(); dispatch({type: 'delete', payload: id})}} className={styles.deleteBtn}>⨉</button>
            </Link>
        </li>
    );
}