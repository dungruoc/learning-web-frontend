import { useParams } from "react-router-dom";
import { fetchCityDetails, formatDate } from "../../data/tools";
import styles from "./City.module.css";
import { useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
import ButtonBack from "./ButtonBack";

export default function City() {
    const {id} = useParams();
    const {status, currentCity, dispatch, currentCityId} = useCities();

    console.log(id, status, currentCity);

    useEffect(() => {
        async function fetCurrentCity(id) {
            console.log(id, currentCityId);
            if (Number(id) === Number(currentCityId))
                return;
            dispatch({type: 'fetching_city'});
            try {
                const city = await fetchCityDetails(id);
                dispatch({type: 'city_fetched', payload: city});
            } catch (err) {
                dispatch({type: 'error', payload: err.message});
            }
        }
        fetCurrentCity(id);
    }, [dispatch, id, currentCityId]);

    // const currentCity = {
    //     cityName: "Lisbon",
    //     emoji: "🇵🇹",
    //     date: "2027-10-31T15:59:59.138Z",
    //     notes: "My favorite city so far!",
    // };

    if (status === 'loading' || !currentCity)
        return <Spinner />;

    const { cityName, emoji, date, notes } = currentCity;
    return (
        <div className={styles.city}>
        <div className={styles.row}>
            <h6>City name</h6>
            <h3>
                <span>{emoji}</span> {cityName}
            </h3>
            </div>

            <div className={styles.row}>
                <h6>You went to {cityName} on</h6>
                <p>{formatDate(date || null)}</p>
            </div>

            {notes && (
                <div className={styles.row}>
                <h6>Your notes</h6>
                <p>{notes}</p>
                </div>
            )}

            <div className={styles.row}>
                <h6>Learn more</h6>
                <a
                href={`https://en.wikipedia.org/wiki/${cityName}`}
                target="_blank"
                rel="noreferrer"
                >
                Check out {cityName} on Wikipedia &rarr;
                </a>
            </div>

            <div>
                <ButtonBack />
            </div>
        </div>
    )
}