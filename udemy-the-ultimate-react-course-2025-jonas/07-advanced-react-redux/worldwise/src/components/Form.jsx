
import { useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useUriPosition } from "../hooks/useUriPosition";
import { useEffect } from "react";
import { convertToEmoji, fetchCityCode, postNewCity } from "../../data/tools";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

const initState = {
    isLoading: false,
    cityName: "",
    country: "",
    emoji: "",
    date: new Date(),
    notes: "",
    errorMessage: ""
}

export default function Form() {

    const [lat, lng] = useUriPosition();
    const [city, setCityForm] = useState(initState);
    const {dispatch} = useCities();
    const navigate = useNavigate();
    const {isLoading, cityName, emoji, country, date, notes, errorMessage} = city;

    console.log(lat, lng);

    useEffect(() => {
        async function decodeCity() {
            try {
                setCityForm({
                    ...initState,
                    isLoading: true
                });
                if (lat && lng) {
                    const data = await fetchCityCode(lat, lng);
                    console.log(data);
                    if (data?.city) {
                        setCityForm(city => ({
                            ...city,
                            cityName: data.city,
                            country: data.countryName,
                            emoji: convertToEmoji(data.countryCode)
                        }));
                    } else {
                        throw new Error('No city found. ⛔️');
                    }
                } else {
                    throw new Error('No geo position provided. Please click the location on the map!');
                }
            } catch (err) {
                setCityForm(st => ({...st, errorMessage: err.message }));
            } finally {
                setCityForm(st => ({...st, isLoading: false }));
            }
        }

        decodeCity();
    }, [lat, lng]);

    async function handleSubmit(e) {
        e.preventDefault();
        const newId = Math.trunc(Math.abs(10000 * lat * lng));
        const data = {
            cityName: cityName,
            emoji: emoji,
            country: country,
            date: date,
            notes: notes,
            position: {
                lat: lat,
                lng: lng
            },
            id: newId
        };
        console.log('creating', data);
        setCityForm(st => ({
            ...st,
            isLoading: true
        }));

        try {
            await postNewCity(data);
            dispatch({type: 'city_added', payload: data});
            navigate(`../cities/${newId}?lat=${lat}&lng=${lng}`);
        } catch (err) {
            setCityForm(st => ({...st, errorMessage: err.message }));
        } finally {
            setCityForm(st => ({
                ...st,
                isLoading: false
            }));
        }

    }

    if (isLoading)
        return <Spinner />

    if (errorMessage?.length > 0) {
        return <Message message={errorMessage} />
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
            <label htmlFor="cityName">City name</label>
            <input
            id="cityName"
            onChange={(e) => setCityForm(st => ({...st, cityName: e.target.value}))}
            value={cityName}
            />
            <span className={styles.flag}>{emoji}</span>
        </div>

        <div className={styles.row}>
            <label htmlFor="date">When did you go to {cityName}?</label>
            <input
            id="date"
            onChange={(e) => setCityForm(st => ({...st, date: e.target.value}))}
            value={date}
            />
        </div>

        <div className={styles.row}>
            <label htmlFor="notes">Notes about your trip to {cityName}</label>
            <textarea
            id="notes"
            onChange={(e) => setCityForm(st => ({...st, notes: e.target.value}))}
            value={notes}
            />
        </div>

        <div className={styles.buttons}>
            <Button type="primary">Add</Button>
            <ButtonBack />
        </div>
        </form>
    );
}
