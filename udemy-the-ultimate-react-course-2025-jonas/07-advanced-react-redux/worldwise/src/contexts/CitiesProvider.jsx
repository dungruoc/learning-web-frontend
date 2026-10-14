import { useEffect } from "react";
import { useReducer } from "react";
import { CitiesContext } from "./CitiesContext";

const initialState = {
  cities: [],
  status: 'init',
  errorMessage: null
}

async function fetchCities() {
  try {
    const res = await fetch('http://localhost:5174/cities');
    if (res.ok)
      return await res.json();
  } catch (err) {
    console.error(err.message);
    throw err;
  }

  return [];
}


function stateReducer(state, action) {
  const reducerFuncs = {
    'fetching': (st, ) => ({...st, cities: [], errorMessage: null, status: 'loading'}),
    'fetched': (st, act) => ({...st, cities: act.payload, status: 'loaded'}),
    'error': (st, act) => ({...st, errorMessage: act.payload}),
    'delete': (st, act) => ({...st, cities: st.cities.filter(city => city.id !== act.payload)})
  }

  const newState = reducerFuncs[action.type](state, action);
  console.log(action, `${state} => ${newState}`);

  return newState;
}

export default function CitiesProvider({children}) {

    const [state, dispatch] = useReducer(stateReducer, initialState);
    const countries = [...new Set(state.cities.map(c => ({name: c.country, flag: c.emoji})))];
    const {status, cities, errorMessage} = state;

    useEffect(() => {
        const fetchData = async function() {
        dispatch({type: 'fetching'});
        try {
            const cities = await fetchCities();
            dispatch({type: 'fetched', payload: cities});
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
                status,
                cities,
                countries,
                errorMessage,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}
