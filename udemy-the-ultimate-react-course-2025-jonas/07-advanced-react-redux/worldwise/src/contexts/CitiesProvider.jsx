import { useEffect } from "react";
import { useReducer } from "react";
import { CitiesContext } from "./CitiesContext";
import { fetchCities } from "../../data/tools";

const initialState = {
  cities: [],
  currentCity: null,
  status: 'init',
  errorMessage: null
}


function stateReducer(state, action) {
  const reducerFuncs = {
    'fetching_cities': (st, ) => ({...st, cities: [], errorMessage: null, status: 'loading'}),
    'cities_fetched': (st, act) => ({...st, cities: act.payload, status: 'loaded'}),
    'error': (st, act) => ({...st, errorMessage: act.payload}),
    'delete_city': (st, act) => ({...st, cities: st.cities.filter(city => city.id !== act.payload)}),
    'fetching_city': (st, ) => ({...st, currentCity: null, errorMessage: null, state: 'loading'}),
    'city_fetched': (st, act) => ({...st, currentCity: act.payload, status: 'loaded'}),
    'city_added': (st, act) => ({...st, cities: [...st.cities, act.payload]})
  }

  const newState = reducerFuncs[action.type](state, action);
  console.log(action, `${state} => ${newState}`);

  return newState;
}

export default function CitiesProvider({children}) {

    const [state, dispatch] = useReducer(stateReducer, initialState);
    const countries = state.cities.
      map(c => ({name: c.country, flag: c.emoji})).
      filter((value, index, self) =>
        index === self.findIndex((t) => t.name === value.name)
      );

    const currentCityId = state.currentCity?.id;

    useEffect(() => {
        const fetchData = async function() {
          dispatch({type: 'fetching_cities'});
          try {
              const cities = await fetchCities();
              dispatch({type: 'cities_fetched', payload: cities});
          } catch (err) {
              dispatch({type: 'error', payload: err.message});
          }
        }

        fetchData();
    }, [dispatch]);
        
    return (
        <CitiesContext.Provider
            value={{
                dispatch,
                countries,
                currentCityId,
                ...state
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}
