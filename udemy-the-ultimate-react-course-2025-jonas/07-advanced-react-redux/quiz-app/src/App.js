import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartContainer from "./StartContainer";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import UiButton from "./UiButton";
import FooterContainer from "./FooterContainer";
import Timer from "./Timer";
import { useAppState, calcScores, useQuestions } from "./appState";


export default function App() {
  const [state, dispatch] = useAppState();
  useQuestions(dispatch);

  const numQuestions = state.questions.length;
  const numAnswers = state.questions.filter(q => q?.answer !== undefined).length;
  const currentQuestion = state.questions.at(state.index);
  const correctQuetions = state.questions.filter(q => q?.answer === q.correctOption);
  const scores = calcScores(correctQuetions);
  const maxScores = calcScores(state.questions);


  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === 'loading' && <Loader />}
        {state.status === 'error' && <Error />}
        {state.status === 'ready' &&
          <StartContainer numQuestions={numQuestions}>
            <UiButton dispatch={dispatch} action={'start'}>
                Let's start!
            </UiButton>
          </StartContainer>
        }
        {state.status === 'started' && state.questions.length &&
          <>
            <Progress index={state.index} numQuestions={numQuestions} numAnswers={numAnswers}
              scores={scores} maxScores={maxScores}
            />
            <Question quiz={currentQuestion} dispatch={dispatch}/>
            <FooterContainer>
              <Timer remaining_s={state.remaining_s} dispatch={dispatch} />
              {currentQuestion?.answer !== undefined &&
                <UiButton dispatch={dispatch} action={'nextQuestion'}>
                  {numAnswers === numQuestions ? 'Finished' : 'Next'}
                </UiButton>
              }
            </FooterContainer>
          </>
        }
        {state.status === 'finished' &&
          <FinishScreen
            scores={scores}
            maxScores={maxScores}
            highestScore={state.highestScore}
            dispatch={dispatch}
          />
        }
      </Main>
    </div>
  );
}
