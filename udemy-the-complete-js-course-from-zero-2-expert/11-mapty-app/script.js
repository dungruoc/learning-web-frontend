'use strict';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


class App {
    #map;
    #mapZoomLevel = 12;
    #localStorageKey = 'workouts';
    #mapEvent;
    #currentPosition;
    #workoutList = []

    constructor() {
        this.#loadWorkouts();
        this.#getCurrentPosition();

        form.addEventListener('submit', this.#handleFormSubmit.bind(this));
        inputType.addEventListener('change', this.#toggleElevationField.bind(this));
        containerWorkouts.addEventListener('click', this.#workoutSelected.bind(this));

        // setTimeout(this.#loadWorkouts.bind(this), 3000);
    }

    #loadWorkouts() {
        const workouts = JSON.parse(localStorage.getItem(this.#localStorageKey));
        // console.log(workouts);
        if (workouts)
            this.#workoutList = workouts;
        this.#workoutList.forEach((wk) => {
            wk.date = new Date(wk.date);
            this.#renderWorkoutHtml(wk);
        });
    }

    #workoutSelected(e) {
        const selectedWorkout = e.target.closest('.workout');
        console.log(selectedWorkout);
        if (selectedWorkout) {
            const workout = this.#workoutList.find((wk) => (wk.id === selectedWorkout.dataset.id));
            console.log(workout);
            this.#map.setView(workout.coords, this.#mapZoomLevel, { animate: true, pan: {duration: 1}});
        }
    }

    #getCurrentPosition() {
        navigator.geolocation.getCurrentPosition(
            this.#loadMap.bind(this),
            function(positionError) {
                alert('Could not get current geolocation');
            }
        );
    }

    #loadMap(position) {
        console.log(this, position);
        this.#currentPosition = position;
        const {latitude, longitude} = this.#currentPosition.coords;
        console.log(latitude, longitude);
        const coords = [latitude, longitude];
        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.#map);


        this.#workoutList.forEach((wk) => {
            this.#renderWorkoutMarker(wk);
        });
        
        this.#map.on('click', this.#showCreationForm.bind(this));
    }

    #showCreationForm(e) {
        this.#mapEvent = e;
        form.classList.remove('hidden');
        inputDistance.focus();
        console.log(this, e);
    }

    #genWorkout(coords) {
        const workoutType = inputType.value;
        let workout;
        console.log(workoutType);

        const distance = Number(inputDistance.value);
        const duration = Number(inputDuration.value);
        if (workoutType === 'running') {
            const cadence = Number(inputCadence.value);
            workout = new Running(distance, duration, coords, cadence);
        } else {
            const elevation = Number(inputElevation.value);
            workout = new Cycling(distance, duration, coords, elevation);
        }
        return workout;
    }

    #renderWorkoutMarker(workout) {
        L.marker(workout.coords).
            addTo(this.#map).
            bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: `${workout.name.toLowerCase()}-popup`
                })
            ).
            setPopupContent(`${workout.name} on ${workout.date.getDate()}/${workout.date.getMonth() + 1}`).
            openPopup();

    }


    #handleFormSubmit(e) {
        e.preventDefault();

        const {lat, lng} = this.#mapEvent.latlng;
        const workout = this.#genWorkout([lat, lng]);
        this.#workoutList.push(workout);
        this.#storeWorkouts();
        this.#hideForm();
        this.#renderWorkoutMarker(workout);
        this.#renderWorkoutHtml(workout);
    }

    #hideForm() {
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
        form.classList.add('hidden');
    }

    #toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    #renderWorkoutHtml(workout) {
        console.log(workout);

        const workoutHtml = `<li class="workout workout--${workout.name}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.name.toUpperCase()} on ${workout.date}</h2>
          <div class="workout__details">
            <span class="workout__icon">${(workout.name === 'running') ? '🏃‍♂️' : '🚴‍♀️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">min</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${(workout.name === 'running') ? workout.pace : (workout.distance/workout.duration)}</span>
            <span class="workout__unit">${(workout.name === 'running') ? 'min/km' : 'km/h'}</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">${(workout.name === 'running') ? '🦶🏼' : '⛰'}</span>
            <span class="workout__value">${(workout.name === 'running') ? workout.cadence : workout.elevation}</span>
            <span class="workout__unit">${(workout.name === 'running') ? 'spm' : 'm'}</span>
          </div>
        </li>`;

        // form.insertAdjacentHTML('afterend', this.#renderWorkoutHtml(workout));
        containerWorkouts.insertAdjacentHTML('beforeend', workoutHtml);
    }

    #storeWorkouts() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.#workoutList));
    }

    reset() {
        localStorage.removeItem(this.#localStorageKey);
        location.reload();
    }
}

const app = new App();

class Workout {
    id = crypto.randomUUID();
    date = new Date();

    constructor(distance, duration, coords) {
        this.distance = distance;
        this.duration =duration;
        this.coords = coords;
    }
}

class Running extends Workout {
    name = 'running';

    constructor(distance, duration, coords, cadence) {
        super(distance, duration, coords);
        this.cadence = cadence;
        this.pace = duration/distance;
    }
}

class Cycling extends Workout {
    name = 'cycling';

    constructor(distance, duration, coords, elevationGain) {
        super(distance, duration, coords);
        this.elevationGain = elevationGain;
        this.speed = distance/duration;
    }
}
