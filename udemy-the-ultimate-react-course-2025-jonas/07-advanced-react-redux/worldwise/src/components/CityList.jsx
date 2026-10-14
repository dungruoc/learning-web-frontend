import { useCities } from '../contexts/CitiesContext';
import CityItem from './CityItem';
import styles from './CityList.module.css';
import Message from './Message';
import Spinner from './Spinner';

export default function CityList() {

    const {status, cities, dispatch} = useCities();

    if (status === 'loading')
        return <Spinner />

    if (!cities.length)
        return <Message message={
            'Add your first visited city by clicking it on the map'
        } />

    return (
        <ul className={styles.cityList}>
            {cities.map((city => (
                <CityItem city={city} key={city.id} dispatch={dispatch}/>
            )))}
        </ul>
    )
}