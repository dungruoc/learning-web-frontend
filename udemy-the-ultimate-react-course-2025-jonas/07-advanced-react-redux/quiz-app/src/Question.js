export default function Question({quiz, dispatch}) {
    console.log(quiz);

    return (
        <div>
            <h4>{quiz.question}</h4>
            <div className="options">
                {quiz.options.map((opt, idx) => (
                    <button
                        disabled={quiz.answer !== undefined}
                    
                        className={`btn btn-option
                        ${quiz.answer === idx ? 'answer' : null}
                        ${quiz.answer !== undefined && quiz.correctOption === idx ? 'correct' :
                            (quiz.answer !== undefined ? 'wrong' : null)
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