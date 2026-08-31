'use strict';

const containerCountries = document.querySelector('.countries');
const btnCountry = document.querySelector('.btn-country');

const renderCountryHtml = function(country, neighbour=false) {
    const flag = country.flags.png;
    const [language] = country.languages;
    const [region] = country.regionalBlocs;
    const [currency] = country.currencies;


    const countryHtml = `<article class="country ${neighbour ? 'neighbour' : ''}">
        <img class="country__img" src="${flag}" />
        <div class="country__data">
        <h3 class="country__name">${country.name}</h3>
        <h4 class="country__region">${region?.name}</h4>
        <p class="country__row"><span>👫</span>${(+country.population/1000_000).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${language.name}</p>
        <p class="country__row"><span>💰</span>${currency.name}</p>
        </div>
    </article>`;

    containerCountries.insertAdjacentHTML('beforeend', countryHtml);
    containerCountries.style.opacity = 1;
}

const getCountryAndNeighbourData = function(countryCode) {
    return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${countryCode}`).
        then((res) => {
            console.log(res);
            return res.json();
        }).
        then((data) => {
            console.log(data);
            renderCountryHtml(data);

            const neighbour = data.borders[0];
            if (!neighbour) return;

            return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`)
        }).
        then((res) => res.json()).
        then((data) => {
            console.log(data);
            renderCountryHtml(data, true);
        });
}

const renderError = function(message) {
    containerCountries.insertAdjacentText('beforeend', message);
    containerCountries.style.opacity = 1;
}

const whereAmI = function() {
    getCurrentPosition().
        then(position => {
            console.log(position);
            const {latitude, longitude} = position.coords;
            if (position) {
                return [latitude, longitude];
            } else {
                throw new Error('Cannot get current position');
            }
        }).
        then(coords => {
            const [lat, lng] = coords;
            return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
        }).
        then(res => res.json()).
        then(data => {
            console.log(data);
            return getCountryAndNeighbourData(data.countryCode);
        }).
        catch(err => renderError(`Something went wrong: ${err.message}`));
}

const getCurrentPosition = function() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

const asynchCoords2Country = async function(coords) {
    const [lat, lng] = coords;
    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
    const data = await res.json();
    return data.countryCode;
}

const asyncGetCountryData = async function(countryCode) {
    const res = await fetch(`https://countries-api-836d.onrender.com/countries/alpha/${countryCode}`);
    return await res.json();
}

const asyncWhereAmI = async function() {
    const currentPosition = await getCurrentPosition();
    console.log(currentPosition);
    const {latitude, longitude} = currentPosition.coords;
    const countryCode = await asynchCoords2Country([latitude, longitude]);
    console.log(countryCode);
    const data = await asyncGetCountryData(countryCode);
    renderCountryHtml(data);
    if (data.borders) {
        await Promise.allSettled(data.borders.map((code) => (async function(countryCode) {
            const data = await asyncGetCountryData(countryCode);
            renderCountryHtml(data, true);
        })(code)));
    }
    // const neighbour = data.borders[0];
    // if (neighbour) {
    //     const data = await asyncGetCountryData(neighbour);
    //     renderCountryHtml(data, true);
    // }
}


// btnCountry.addEventListener('click', whereAmI);
btnCountry.addEventListener('click', asyncWhereAmI);

// asyncWhereAmI('VN');
// console.log('async called');