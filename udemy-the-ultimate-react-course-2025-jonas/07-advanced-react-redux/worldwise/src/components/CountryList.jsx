import { useCities } from '../contexts/CitiesContext';
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Spinner from './Spinner';

export default function CountryList() {
    const {status, countries} = useCities();

    if (status === 'loading')
        return <Spinner />
    
    return (
        <ul className={styles.countryList}>
            {countries.map(c => <CountryItem country={c} key={c.name}/>)}
        </ul>
    )
}