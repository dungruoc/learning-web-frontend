export default function Progress({index, numQuestions, numAnswers, scores, maxScores}) {
    return (
        <header className="progress">
            <progress max={numQuestions} value={numAnswers}/>
            <p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
            <p><strong>{scores}</strong> / {maxScores}</p>
        </header>
    )
}