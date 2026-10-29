// import { useEffect } from "react";
import { useReducer } from "react";
import { CitiesContext } from "./CitiesContext";
import { fetchCities } from "../../data/tools";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";

const initialState = {
  cities: [],
  currentCity: null,
  status: 'init',
  errorMessage: null
}


function stateReducer(state, action) {
  const reducerFuncs = {
    'cities/fetching': (st, ) => ({...st, cities: [], errorMessage: null, status: 'loading'}),
    'cities/fetched': (st, act) => ({...st, cities: act.payload, status: 'loaded'}),
    'error': (st, act) => ({...st, errorMessage: act.payload, status: 'server_error'}),
    'city/deleted': (st, act) => ({...st, cities: st.cities.filter(city => city.id !== act.payload)}),
    'city/fetching': (st, ) => ({...st, currentCity: null, errorMessage: null, status: 'loading'}),
    'city/fetched': (st, act) => ({...st, currentCity: act.payload, status: 'loaded'}),
    'city/added': (st, act) => ({...st, cities: [...st.cities, act.payload]})
  }

  const newState = reducerFuncs[action.type](state, action);
  console.log(action);
  console.log(newState);

  return newState;
}

export default function CitiesProvider({children}) {
    const {user} = useAuth();
    const [state, dispatch] = useReducer(stateReducer, initialState);
    const countries = state.cities.
      map(c => ({name: c.country, flag: c.emoji})).
      filter((value, index, self) =>
        index === self.findIndex((t) => t.name === value.name)
      );

    const currentCityId = state.currentCity?.id;


    useEffect(() => {
        const fetchData = async function(user) {
          if (user) {
            dispatch({type: 'cities/fetching'});
            try {
                const cities = await fetchCities(user.email);
                dispatch({type: 'cities/fetched', payload: cities});
            } catch (err) {
                dispatch({type: 'error', payload: err.message});
            }
          }
        }

        fetchData(user);
    }, [dispatch, user]);
        
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
