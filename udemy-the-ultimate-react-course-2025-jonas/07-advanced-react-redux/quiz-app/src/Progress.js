import { useQuiz } from "./QuizContext"

export default function Progress() {
    const {index, numQuestions, numAnswers, scores, maxScores} = useQuiz();

    return (
        <header className="progress">
            <progress max={numQuestions} value={numAnswers}/>
            <p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
            <p><strong>{scores}</strong> / {maxScores}</p>
        </header>
    )
}