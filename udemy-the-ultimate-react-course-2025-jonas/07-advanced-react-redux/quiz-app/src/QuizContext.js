import { createContext, useContext, useEffect, useReducer } from "react";

export const MAX_TIME_S = 60 * 10;

const QuizContext = createContext();

const initialState = {
  status: 'init',
  questions: [],
  index: 0,
  remaining_s: MAX_TIME_S,
  highestScore: 0,
  errorMessage: null
};

function reduser(state, action) {
  console.log(state, action);
  const reducers = {
    'fetchingData': (st, _) => ({...st, index: 0, highestScore: 0, status: 'loading', questions: []}),
    'dataFetched': (st, act) => ({...st, index: 0, highestScore: 0, questions: act.payload, status: 'ready'}),
    'error': (st, act) => ({...st, status: 'error', errorMessage: act.payload}),
    'answer': (st, act) => (
      {
        ...st,
        questions: st.questions.map((q, idx) => idx === st.index ? {...q, answer: act.payload} : q)
      }
    ),
    'nextQuestion': (st, _) => (
      st.index < st.questions.length - 1 ?
      {...st, index: st.index + 1} :
      {
        ...st,
        status: 'finished',
        highestScore: Math.max(st.highestScore, calcScores(state.questions.filter(q => q?.answer === q.correctOption)))
      }
    ),
    'start': (st, _) => (
      {
        status: 'started',
        questions: st.questions.map(q => ({...q, answer: undefined})),
        index: 0,
        highestScore: st.highestScore,
        remaining_s: MAX_TIME_S
      }
    ),
    'timer_s': (st, _) => (
      {...st, remaining_s: st.remaining_s - 1, status: st.remaining_s - 1 <= 0 ? 'finished' : st.status}
    )
  }

  return reducers[action.type](state, action);
}


export function QuizProvider({children}) {
  const [state, dispatch] = useReducer(reduser, initialState)

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch({
          type: 'fetchingData',
        });
        const res = await fetch('http://localhost:3001/questions');
        const data = await res.json();
        console.log(data);
        dispatch({
          type: 'dataFetched',
          payload: data
        });
      } catch (err) {
        console.error(err.message);
        dispatch({
          type: 'error',
          payload: err.message
        });
      } finally {
      }
    }

    fetchData();
  }, [dispatch]);

  const numQuestions = state.questions.length;
  const numAnswers = state.questions.filter(q => q?.answer !== undefined).length;
  const currentQuestion = state.questions.at(state.index);
  const correctQuetions = state.questions.filter(q => q?.answer === q.correctOption);
  const scores = calcScores(correctQuetions);
  const maxScores = calcScores(state.questions);

  return (
    <QuizContext.Provider
      value={{
        ...state,
        numQuestions,
        numAnswers,
        currentQuestion,
        correctQuetions,
        scores,
        maxScores,
        dispatch
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

function calcScores(questions) {
  return questions.map(q => Number(q.points)).reduce((a, b) => a + b, 0);
}


export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context)
    throw new Error('QuizContext is used outside of provider');
  return context;
}