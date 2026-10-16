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
import { useQuiz } from "./QuizContext";

export default function App() {
  const {status, numQuestions, numAnswers, currentQuestion} = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' &&
          <StartContainer>
            <UiButton action="start">
                Let's start!
            </UiButton>
          </StartContainer>
        }
        {status === 'started' && numQuestions &&
          <>
            <Progress />
            <Question />
            <FooterContainer>
              <Timer />
              {currentQuestion?.answer !== undefined &&
                <UiButton action="nextQuestion">
                  {numAnswers === numQuestions ? 'Finished' : 'Next'}
                </UiButton>
              }
            </FooterContainer>
          </>
        }
        {status === 'finished' &&
          <FinishScreen />
        }
      </Main>
    </div>
  );
}
