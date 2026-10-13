import { useReducer } from "react";

// function countReducer(prevCount, countAction) {
//     console.log(prevCount, countAction);
//     const reducers = {
//         'incr': (count, val) => count + val,
//         'decr':  (count, val) => count - val,
//         'set': (_, val) => val
//     }
    
//     return reducers[countAction.action](prevCount, countAction.value);
// }

// function stepReducer(prevStep, stepAction) {
//     const reducers = {
//         'set': (_, val) => val
//     }
    
//     return reducers[stepAction.action](prevStep, stepAction.value);
// }

function stateReducer(state, action) {
    const reducers = {
        'incr_count': (st) => ({...st, count: st.count + st.step}),
        'decr_count':  (st) => ({...st, count: st.count - st.step}),
        'incr_step': (st) => ({...st, step: st.step + 1}),
        'decr_step': (st) => ({...st, step: st.step - 1}),
        'set_count': (st) => ({...st, count: action.value}),
        'set_step': (st) => ({...st, step: action.value}),
        'reset': (st) => action.value,
    }

    return reducers[action.act](state);
}

function DateCounter() {
    //   const [count, setCount] = useState(0);
    // const [count, countActionDispatch] = useReducer(countReducer, 0);
    // const [step, stepActionDispatch] = useReducer(stepReducer, 1);

    const initialState = {
        count: 0,
        step: 1
    };

    const [state, actionDispatch] = useReducer(stateReducer, initialState);
    
    // This mutates the date object.
    const date = new Date();
    date.setDate(date.getDate() + state.count);
    
    const dec = function () {
        // setCount((count) => count - 1);
        actionDispatch({
            act: 'decr_count'
        });
        // setCount((count) => count - step);
    };
    
    const inc = function () {
        // setCount((count) => count + 1);
        actionDispatch({
            act: 'incr_count'
        });
        // setCount((count) => count + step);
    };
    
    const defineCount = function (e) {
        actionDispatch({
            act: 'set_count',
            value: Number(e.target.value)
        });
        // setCount(Number(e.target.value));
    };
    
    const defineStep = function (e) {
        // setStep(Number(e.target.value));
        actionDispatch({
            act: 'set_step',
            value: Number(e.target.value)
        });
    };
    
    const reset = function () {
        // setCount(0);
        // setStep(1);
        actionDispatch({
            act: 'reset',
            value: initialState
        });
        // stepActionDispatch({
        //     action: 'set',
        //     value: 1
        // })
    };
    
    return (
        <div className="counter">
        <div>
        <input
        type="range"
        min="0"
        max="10"
        value={state.step}
        onChange={defineStep}
        />
        <span>{state.step}</span>
        </div>
        
        <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
        </div>
        
        <p>{`${state.count} days from Today: ${date.toDateString()}`}</p>
        
        <div>
        <button onClick={reset}>Reset</button>
        </div>
        </div>
    );
}
export default DateCounter;