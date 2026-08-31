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

const getCountryWithCallback = function(country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
    request.send();

    request.addEventListener('load', function() {
        const [data] = JSON.parse(this.responseText);
        console.log(data);
        renderCountryHtml(data);
    });


}

// getCountryWithCallback('portugal');
// getCountryWithCallback('usa');

const getCountryData = function(countryName) {
    fetch(`https://countries-api-836d.onrender.com/countries/name/${countryName}`).
        then((res) => {
            console.log(res);
            return res.json();
        }).then((data) => {
            console.log(data);
            renderCountryHtml(data[0]);
        })
}

// getCountryData('usa');

const getCountryAndNeighbourData = function(countryName) {
    fetch(`https://countries-api-836d.onrender.com/countries/name/${countryName}`).
        then((res) => {
            console.log(res);
            return res.json();
        }).
        then((data) => {
            console.log(data);
            renderCountryHtml(data[0]);

            const neighbour = data[0].borders[0];
            if (!neighbour) return;

            return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`)
        }).then((res) => res.json()).
        then((data) => {
            console.log(data);
            renderCountryHtml(data, true);
        }).
        catch(err => renderError(`Something went wrong: ${err.message}`));

}

const renderError = function(message) {
    containerCountries.insertAdjacentText('beforeend', message);
    containerCountries.style.opacity = 1;
}

// getCountryAndNeighbourData('usa');
// getCountryAndNeighbourData('France');

btnCountry.addEventListener('click', function(e) {
    getCountryAndNeighbourData('Vietnam');
})


const timeout = function(sec) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error('Execution too long'));
        }, sec * 1000);
    });
}

const fetchJson = async function(url) {
    const res = await fetch(url);
    if (!res.ok)
        throw new Error(`Error with fetching ${url}`);
    return await res.json();
}

Promise.race([
    fetchJson('https://countries-api-836d.onrender.com/countries/alpha/FRA'),
    timeout(0.1)
]).
then(data => console.log(data)).
catch(err => console.error(`${err}`));

Promise.allSettled([
    timeout(0.1),
    timeout(0.2),
    timeout(0.3),
    Promise.resolve('Success')
]).
then(res => console.log(res)).
catch(err => console.error(`${err}`));
