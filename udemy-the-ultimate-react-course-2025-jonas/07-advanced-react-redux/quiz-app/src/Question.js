import { useQuiz } from "./QuizContext"

export default function Question() {
    const {currentQuestion, dispatch} = useQuiz();

    return (
        <div>
            <h4>{currentQuestion.question}</h4>
            <div className="options">
                {currentQuestion.options.map((opt, idx) => (
                    <button
                        disabled={currentQuestion.answer !== undefined}
                    
                        className={`btn btn-option
                        ${currentQuestion.answer === idx ? 'answer' : null}
                        ${currentQuestion.answer !== undefined && currentQuestion.correctOption === idx ? 'correct' :
                            (currentQuestion.answer !== undefined ? 'wrong' : null)
                        }
                        `}
                        key={opt} onClick={() => dispatch({type: 'answer', payload: idx})}
                        >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    )
}